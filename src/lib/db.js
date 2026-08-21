import { prisma } from './prisma';

/**
 * Safely execute a Prisma query with automatic retry on connection congestion
 */
export async function safeQuery(queryFn, fallback = null, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await queryFn(prisma);
    } catch (error) {
      const isConnectionError =
        error?.message?.includes('Too many database connections') ||
        error?.message?.includes('FATAL') ||
        error?.message?.includes('connection slots') ||
        error?.message?.includes('Connection') ||
        error?.message?.includes('Can\'t reach database server') ||
        error?.code === 'P2037' ||
        error?.code === 'P2024' ||
        error?.code === 'P1001';

      if (isConnectionError && attempt < maxRetries) {
        // Wait 150ms-450ms before retry to allow a connection slot to free up
        await new Promise(resolve => setTimeout(resolve, 150 * (attempt + 1)));
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
export async function safeMutation(mutationFn, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await mutationFn(prisma);
    } catch (error) {
      const isConnectionError =
        error?.message?.includes('Too many database connections') ||
        error?.message?.includes('FATAL') ||
        error?.message?.includes('connection slots') ||
        error?.message?.includes('Connection') ||
        error?.message?.includes('Can\'t reach database server') ||
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
 * Unified portfolio data fetcher that runs sequentially on a single DB connection
 * Eliminates connection pool congestion and guarantees consistent data loading
 */
export async function getAllPortfolioData() {
  return await safeQuery(async (p) => {
    const heroData = await p.hero.findFirst().catch(() => null);
    const cvs = await p.cV.findMany({ where: { isHidden: false }, orderBy: { createdAt: 'desc' } }).catch(() => []);
    const aboutData = await p.about.findFirst().catch(() => null);
    const educationList = await p.education.findMany({ orderBy: { year: 'desc' } }).catch(() => []);
    const journeys = await p.journey.findMany({ orderBy: { order: 'asc' } }).catch(() => []);
    const skills = await p.skill.findMany({ orderBy: { name: 'asc' } }).catch(() => []);
    const languages = await p.languageProficiency.findMany({ orderBy: { language: 'asc' } }).catch(() => []);
    const projects = await p.project.findMany().catch(() => []);
    const hobbies = await p.hobby.findMany({ orderBy: { title: 'asc' } }).catch(() => []);
    const services = await p.service.findMany({ orderBy: { title: 'asc' } }).catch(() => []);
    const testimonials = await p.testimonial.findMany({ orderBy: { name: 'asc' } }).catch(() => []);
    const contactData = await p.contact.findFirst().catch(() => null);

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
      testimonials,
      contactData,
    };
  }, {
    heroData: null,
    cvs: [],
    aboutData: null,
    educationList: [],
    journeys: [],
    skills: [],
    languages: [],
    projects: [],
    hobbies: [],
    services: [],
    testimonials: [],
    contactData: null,
  });
}
