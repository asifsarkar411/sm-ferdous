import { getAllPortfolioData } from '@/lib/db';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Journey from '@/components/Journey/Journey';
import Skills from '@/components/Skills/Skills';
import Languages from '@/components/Skills/Languages';
import Projects from '@/components/Projects/Projects';
import Hobby from '@/components/Hobby/Hobby';
import Contact from '@/components/Contact/Contact';
import FadeIn from '@/components/FadeIn';
import FloatingSocials from '@/components/FloatingSocials/FloatingSocials';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const {
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
  } = await getAllPortfolioData();

  return (
    <main style={{ paddingTop: '80px' }}>
      <Navbar heroData={heroData} />
      <FadeIn delay={0.05}><Hero heroData={heroData} cvs={cvs} /></FadeIn>
      <FadeIn delay={0.1}><About aboutData={aboutData} educationList={educationList} /></FadeIn>
      {services && services.length > 0 && (
        <FadeIn delay={0.1}><Services services={services} /></FadeIn>
      )}
      <FadeIn delay={0.1}><Journey journeys={journeys} /></FadeIn>
      <FadeIn delay={0.1}><Skills skills={skills} /></FadeIn>
      <FadeIn delay={0.1}><Languages languages={languages} /></FadeIn>
      <FadeIn delay={0.1}><Projects projects={projects} /></FadeIn>
      <FadeIn delay={0.1}><Hobby hobbies={hobbies} /></FadeIn>
      <FadeIn delay={0.1}><Contact contactData={contactData} /></FadeIn>
      <FloatingSocials />
    </main>
  );
}
