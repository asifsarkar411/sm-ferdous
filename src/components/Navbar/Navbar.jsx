import { prisma } from '@/lib/prisma';
import NavContent from './NavContent';

export default async function Navbar({ heroData: propHeroData }) {
  const heroData = propHeroData !== undefined ? propHeroData : await prisma.hero.findFirst();

  return (
    <NavContent 
      logoName={heroData?.logoName} 
      logoImage={heroData?.logoImage} 
    />
  );
}
