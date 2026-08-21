import { prisma } from './prisma';

/**
 * Safely execute a Prisma query with automatic retry
 */
export async function safeQuery(queryFn, fallback = null, maxRetries = 1, timeoutMs = 10000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const queryPromise = queryFn(prisma);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), timeoutMs)
      );
      return await Promise.race([queryPromise, timeoutPromise]);
    } catch (error) {
      const isConnectionError =
        error?.message?.includes('Too many database connections') ||
        error?.message?.includes('FATAL') ||
        error?.message?.includes('connection slots') ||
        error?.message?.includes('Connection') ||
        error?.message?.includes('Can\'t reach database server') ||
        error?.message?.includes('timeout') ||
        error?.code === 'P2037' ||
        error?.code === 'P2024' ||
        error?.code === 'P1001';

      if (isConnectionError && attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 150));
        continue;
      }
      return fallback;
    }
  }
  return fallback;
}

/**
 * Safely execute a Prisma mutation with automatic retry on connection congestion
 */
export async function safeMutation(mutationFn, maxRetries = 2, timeoutMs = 10000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const mutationPromise = mutationFn(prisma);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Mutation timeout')), timeoutMs)
      );
      return await Promise.race([mutationPromise, timeoutPromise]);
    } catch (error) {
      const isConnectionError =
        error?.message?.includes('Too many database connections') ||
        error?.message?.includes('FATAL') ||
        error?.message?.includes('connection slots') ||
        error?.message?.includes('Connection') ||
        error?.message?.includes('Can\'t reach database server') ||
        error?.message?.includes('timeout') ||
        error?.code === 'P2037' ||
        error?.code === 'P2024' ||
        error?.code === 'P1001';

      if (isConnectionError && attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 200 * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }
}

/**
 * Rich default portfolio data for SM FERDOUS AHMMED
 * Ensures the site is always fully populated, dynamic, and responsive
 */
export const defaultPortfolioData = {
  heroData: {
    title: 'SM FERDOUS AHMMED',
    subtitle: 'Full Stack Developer & IoT Engineer',
    description: 'Specializing in building high-performance web applications, scalable cloud backends, and modern embedded IoT systems.',
    cvUrl: null,
    imageUrl: null,
    logoName: 'SM FERDOUS AHMMED',
    logoImage: null,
  },
  cvs: [],
  aboutData: {
    description: 'I am an adaptive full-stack developer and IoT enthusiast committed to crafting robust, visually engaging interfaces and performant server architectures with modern technologies.',
    yearsCoding: '2+',
    projectsBuilt: '15+',
    frameworks: '8+',
    imageUrl: null,
  },
  educationList: [
    {
      id: 'edu-1',
      degree: 'BSc in Computer Science & Engineering',
      institution: 'Bangladesh University of Business & Technology (BUBT)',
      year: '2022 - 2026',
      gpa: 'CGPA: 3.80 / 4.00',
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Dhaka Imperial College',
      year: '2019 - 2021',
      gpa: 'GPA: 5.00 / 5.00',
    },
  ],
  journeys: [
    {
      id: 'j-1',
      title: 'Full Stack Web Developer',
      subtitle: 'Freelance & Open Source Projects',
      date: '2023 - Present',
      location: 'Dhaka, Bangladesh',
      points: [
        'Architected high-throughput web applications with Next.js, React, Node.js, and PostgreSQL.',
        'Engineered responsive, accessible user interfaces with solid modern design systems.',
        'Integrated secure authentication, payment workflows, and automated CI/CD deployment pipelines.',
      ],
      order: 1,
    },
    {
      id: 'j-2',
      title: 'IoT Systems Engineer & Researcher',
      subtitle: 'Robotics & Embedded Systems Prototyping',
      date: '2022 - 2024',
      location: 'Dhaka, Bangladesh',
      points: [
        'Designed microcontroller-based smart telemetry systems using ESP32, Arduino, and embedded C.',
        'Implemented real-time sensor data streaming dashboards over WebSockets and MQTT protocols.',
      ],
      order: 2,
    },
  ],
  skills: [
    { id: 's-1', name: 'React.js', category: 'Frontend' },
    { id: 's-2', name: 'Next.js 15/16', category: 'Frontend' },
    { id: 's-3', name: 'JavaScript (ES6+)', category: 'Frontend' },
    { id: 's-4', name: 'TypeScript', category: 'Frontend' },
    { id: 's-5', name: 'Tailwind CSS', category: 'Frontend' },
    { id: 's-6', name: 'HTML5 & CSS3', category: 'Frontend' },
    { id: 's-7', name: 'Node.js', category: 'Backend' },
    { id: 's-8', name: 'Express.js', category: 'Backend' },
    { id: 's-9', name: 'PostgreSQL', category: 'Backend' },
    { id: 's-10', name: 'Prisma ORM', category: 'Backend' },
    { id: 's-11', name: 'MongoDB', category: 'Backend' },
    { id: 's-12', name: 'REST APIs', category: 'Backend' },
    { id: 's-13', name: 'ESP32 & Arduino', category: 'IoT & Embedded' },
    { id: 's-14', name: 'Embedded C/C++', category: 'IoT & Embedded' },
    { id: 's-15', name: 'MQTT & Telemetry', category: 'IoT & Embedded' },
    { id: 's-16', name: 'MicroPython', category: 'IoT & Embedded' },
    { id: 's-17', name: 'Git & GitHub', category: 'Tools & DevOps' },
    { id: 's-18', name: 'Docker', category: 'Tools & DevOps' },
    { id: 's-19', name: 'Linux / Bash', category: 'Tools & DevOps' },
    { id: 's-20', name: 'Vercel & Cloud', category: 'Tools & DevOps' },
  ],
  languages: [
    { id: 'l-1', language: 'Bangla', reading: 'Native', writing: 'Native', speaking: 'Native' },
    { id: 'l-2', language: 'English', reading: 'Fluent', writing: 'Fluent', speaking: 'Professional' },
  ],
  projects: [
    {
      id: 'p-1',
      title: 'Enterprise POS & Inventory Suite',
      category: 'Full Stack Web',
      description: 'A cloud-based stock management, billing, and financial analytics dashboard with multi-branch synchronization.',
      liveUrl: 'https://github.com/asifsarkar411',
      detailsUrl: 'Built with Next.js, PostgreSQL, Prisma, and Tailwind CSS. Features real-time stock alerts, dynamic barcode generation, role-based access control, and automated daily revenue analytics.',
      imageUrl: null,
    },
    {
      id: 'p-2',
      title: 'Smart Agro & Environmental Telemetry',
      category: 'IoT & Embedded',
      description: 'Autonomous multi-sensor agricultural station monitoring soil moisture, NPK fertility, and ambient climate.',
      liveUrl: 'https://github.com/asifsarkar411',
      detailsUrl: 'Powered by ESP32 microcontrollers communicating via MQTT to a Next.js real-time telemetry dashboard with automated push notifications.',
      imageUrl: null,
    },
    {
      id: 'p-3',
      title: 'Dynamic Portfolio & CMS Platform',
      category: 'Web Application',
      description: 'Ultra-fast personal portfolio with real-time administrative content management, ISR edge caching, and theme customization.',
      liveUrl: 'https://github.com/asifsarkar411',
      detailsUrl: 'Designed with Next.js App Router, Framer Motion animations, Google Sans typography, and Prisma ORM.',
      imageUrl: null,
    },
  ],
  hobbies: [
    {
      id: 'h-1',
      title: 'IoT & Hardware Tinkering',
      description: 'Designing custom circuits, experimenting with microcontrollers, and exploring robotics automation.',
      imageUrl: null,
    },
    {
      id: 'h-2',
      title: 'Open Source Development',
      description: 'Contributing to developer tools, creating reusable libraries, and collaborating with developer communities.',
      imageUrl: null,
    },
  ],
  services: [
    {
      id: 'sv-1',
      title: 'Full Stack Web Development',
      description: 'End-to-end web applications built with Next.js, React, Node.js, and PostgreSQL for maximum speed and scalability.',
    },
    {
      id: 'sv-2',
      title: 'IoT & Embedded Systems Prototyping',
      description: 'Hardware circuit design, sensor telemetry, microcontroller programming, and cloud dashboard integration.',
    },
    {
      id: 'sv-3',
      title: 'API Engineering & Cloud Architecture',
      description: 'Designing secure, high-throughput REST APIs, database schema optimization, authentication, and cloud deployment.',
    },
  ],
  contactData: {
    title: "Let's Build Something Exceptional",
    description: 'Whether you have a question, an open position, an IoT concept, or a full-stack project in mind, my inbox is always open.',
    motto: 'asifsarkar411@gmail.com',
    phoneNumber: '+8801628628300',
    address: 'Dhaka, Bangladesh',
    location: 'Dhaka, Bangladesh',
  },
};

/**
 * Unified portfolio data fetcher with instant fallback and database priority
 */
export async function getAllPortfolioData() {
  const data = await safeQuery(async (p) => {
    const [
      heroData,
      cvs,
      aboutData,
      educationList,
      journeys,
      skills,
      languages,
      projects,
      hobbies,
      services,
      contactData,
    ] = await Promise.all([
      p.hero.findFirst().catch(() => null),
      p.cV.findMany({ where: { isHidden: false }, orderBy: { createdAt: 'desc' } }).catch(() => []),
      p.about.findFirst().catch(() => null),
      p.education.findMany({ orderBy: { year: 'desc' } }).catch(() => []),
      p.journey.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
      p.skill.findMany({ orderBy: { name: 'asc' } }).catch(() => []),
      p.languageProficiency.findMany({ orderBy: { language: 'asc' } }).catch(() => []),
      p.project.findMany().catch(() => []),
      p.hobby.findMany({ orderBy: { title: 'asc' } }).catch(() => []),
      p.service.findMany({ orderBy: { title: 'asc' } }).catch(() => []),
      p.contact.findFirst().catch(() => null),
    ]);

    return {
      heroData,
      cvs,
      aboutData,
      educationList,
      journeys,
      skills,
      languages,
      projects,
      hobbies,
      services,
      contactData,
    };
  }, null, 1, 10000);

  if (!data) {
    return defaultPortfolioData;
  }

  // Merge database data with defaults if any section is completely empty
  return {
    heroData: data.heroData || defaultPortfolioData.heroData,
    cvs: (data.cvs && data.cvs.length > 0) ? data.cvs : defaultPortfolioData.cvs,
    aboutData: data.aboutData || defaultPortfolioData.aboutData,
    educationList: (data.educationList && data.educationList.length > 0) ? data.educationList : defaultPortfolioData.educationList,
    journeys: (data.journeys && data.journeys.length > 0) ? data.journeys : defaultPortfolioData.journeys,
    skills: (data.skills && data.skills.length > 0) ? data.skills : defaultPortfolioData.skills,
    languages: (data.languages && data.languages.length > 0) ? data.languages : defaultPortfolioData.languages,
    projects: (data.projects && data.projects.length > 0) ? data.projects : defaultPortfolioData.projects,
    hobbies: (data.hobbies && data.hobbies.length > 0) ? data.hobbies : defaultPortfolioData.hobbies,
    services: (data.services && data.services.length > 0) ? data.services : defaultPortfolioData.services,
    contactData: data.contactData || defaultPortfolioData.contactData,
  };
}
