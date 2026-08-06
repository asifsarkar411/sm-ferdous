const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@example.com'
  const password = 'password' // In a real app, use a stronger password

  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })
    console.log('Admin user created: admin@example.com / password')
  } else {
    console.log('Admin user already exists')
  }

  // Create some default content if empty
  const heroCount = await prisma.hero.count()
  if (heroCount === 0) {
    await prisma.hero.create({
      data: {
        title: 'Unlock the Career You Deserve',
        subtitle: 'Struggling to land your dream job or switch careers? I help professionals like you craft winning resumes, ace interviews, and build career confidence.',
        imageUrl: null
      }
    })
    console.log('Default Hero content created')
  }

  const aboutCount = await prisma.about.count()
  if (aboutCount === 0) {
    await prisma.about.create({
      data: {
        description: 'With over 12 years of experience helping professionals land jobs at companies like Mobbiles, Samsung, I specialize in career clarity, job search strategy, resume optimization, and interview mastery.',
        imageUrl: null
      }
    })
    console.log('Default About content created')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
