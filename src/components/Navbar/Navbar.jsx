import { prisma } from '@/lib/prisma';
import NavContent from './NavContent';

export default async function Navbar() {
  const heroData = await prisma.hero.findFirst();

  return (
    <NavContent 
      logoName={heroData?.logoName} 
      logoImage={heroData?.logoImage} 
    />
  );
}
