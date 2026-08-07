import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst();
    return NextResponse.json(hero || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero data' }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const existingHero = await prisma.hero.findFirst();
    
    let hero;
    if (existingHero) {
      hero = await prisma.hero.update({
        where: { id: existingHero.id },
        data: {
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          cvUrl: data.cvUrl,
          imageUrl: data.imageUrl,
        }
      });
    } else {
      hero = await prisma.hero.create({
        data: {
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          cvUrl: data.cvUrl,
          imageUrl: data.imageUrl,
        }
      });
    }
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero data' }, { status: 500 });
  }
}
