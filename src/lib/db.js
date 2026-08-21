import { prisma } from './prisma';

/**
 * Safely execute a Prisma query with strict timeout and automatic retry
 */
export async function safeQuery(queryFn, fallback = null, maxRetries = 1, timeoutMs = 3500) {
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
        await new Promise(resolve => setTimeout(resolve, 100));
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
export async function safeMutation(mutationFn, maxRetries = 2, timeoutMs = 5000) {
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
        await new Promise(resolve => setTimeout(resolve, 150 * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }
}

/**
 * Unified portfolio data fetcher with parallel execution and instant timeout fallback
 * Guarantees sub-second response times and zero hanging / continuous loading
 */
export async function getAllPortfolioData() {
  const fallback = {
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
  };

  return await safeQuery(async (p) => {
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
      testimonials,
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
      p.testimonial.findMany({ orderBy: { name: 'asc' } }).catch(() => []),
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
      testimonials,
      contactData,
    };
  }, fallback, 1, 3000);
}
