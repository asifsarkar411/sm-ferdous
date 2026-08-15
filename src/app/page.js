import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Journey from '@/components/Journey/Journey';
import Skills from '@/components/Skills/Skills';
import Languages from '@/components/Skills/Languages';
import Projects from '@/components/Projects/Projects';
import Services from '@/components/Services/Services';
import Testimonials from '@/components/Testimonials/Testimonials';
import Hobby from '@/components/Hobby/Hobby';
import Contact from '@/components/Contact/Contact';
import FadeIn from '@/components/FadeIn';
import FloatingSocials from '@/components/FloatingSocials/FloatingSocials';

// Incremental Static Regeneration (ISR) to cache page & serve instant responses
export const revalidate = 60;

export default async function Home() {
  let heroData = null;
  let cvs = [];
  let aboutData = null;
  let educationList = [];
  let journeys = [];
  let skills = [];
  let languages = [];
  let projects = [];
  let services = [];
  let testimonials = [];
  let hobbies = [];
  let contactData = null;

  try {
    [
      heroData,
      cvs,
      aboutData,
      educationList,
      journeys,
      skills,
      languages,
      projects,
      services,
      testimonials,
      hobbies,
      contactData,
    ] = await Promise.all([
      prisma.hero.findFirst().catch(() => null),
      prisma.cV.findMany().catch(() => []),
      prisma.about.findFirst().catch(() => null),
      prisma.education.findMany({ orderBy: { year: 'desc' } }).catch(() => []),
      prisma.journey.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
      prisma.skill.findMany().catch(() => []),
      prisma.languageProficiency.findMany().catch(() => []),
      prisma.project.findMany().catch(() => []),
      prisma.service.findMany().catch(() => []),
      prisma.testimonial.findMany().catch(() => []),
      prisma.hobby.findMany().catch(() => []),
      prisma.contact.findFirst().catch(() => null),
    ]);
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }

  return (
    <main style={{ paddingTop: '80px' }}>
      <Navbar heroData={heroData} />
      <FadeIn delay={0.05}><Hero heroData={heroData} cvs={cvs} /></FadeIn>
      <FadeIn delay={0.1}><About aboutData={aboutData} educationList={educationList} /></FadeIn>
      <FadeIn delay={0.1}><Journey journeys={journeys} /></FadeIn>
      <FadeIn delay={0.1}><Skills skills={skills} /></FadeIn>
      <FadeIn delay={0.1}><Languages languages={languages} /></FadeIn>
      <FadeIn delay={0.1}><Projects projects={projects} /></FadeIn>
      {services && services.length > 0 && (
        <FadeIn delay={0.1}><Services services={services} /></FadeIn>
      )}
      {testimonials && testimonials.length > 0 && (
        <FadeIn delay={0.1}><Testimonials testimonials={testimonials} /></FadeIn>
      )}
      <FadeIn delay={0.1}><Hobby hobbies={hobbies} /></FadeIn>
      <FadeIn delay={0.1}><Contact contactData={contactData} /></FadeIn>
      <FloatingSocials />
    </main>
  );
}
