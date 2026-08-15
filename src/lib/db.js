import { prisma } from './prisma';

/**
 * Safely execute a Prisma query with automatic retry on connection congestion
 */
export async function safeQuery(queryFn, fallback = null, maxRetries = 2) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await queryFn(prisma);
    } catch (error) {
      const isConnectionError =
        error?.message?.includes('Too many database connections') ||
        error?.message?.includes('FATAL') ||
        error?.message?.includes('connection slots') ||
        error?.code === 'P2037' ||
        error?.code === 'P2024';

      if (isConnectionError && attempt < maxRetries) {
        // Wait 150ms-300ms before retry to allow a connection slot to free up
        await new Promise(resolve => setTimeout(resolve, 150 * (attempt + 1)));
        continue;
      }
      return fallback;
    }
  }
  return fallback;
}
