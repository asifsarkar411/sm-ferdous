import { safeQuery } from '@/lib/db';
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

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Batch 1: Primary upper section
  const [heroData, cvs, aboutData, educationList] = await Promise.all([
    safeQuery(p => p.hero.findFirst(), null),
    safeQuery(p => p.cV.findMany(), []),
    safeQuery(p => p.about.findFirst(), null),
    safeQuery(p => p.education.findMany({ orderBy: { year: 'desc' } }), []),
  ]);

  // Batch 2: Experience & Skills
  const [journeys, skills, languages] = await Promise.all([
    safeQuery(p => p.journey.findMany({ orderBy: { order: 'asc' } }), []),
    safeQuery(p => p.skill.findMany(), []),
    safeQuery(p => p.languageProficiency.findMany(), []),
  ]);

  // Batch 3: Projects, Services, Hobbies & Contact
  const [projects, services, testimonials, hobbies, contactData] = await Promise.all([
    safeQuery(p => p.project.findMany(), []),
    safeQuery(p => p.service.findMany(), []),
    safeQuery(p => p.testimonial.findMany(), []),
    safeQuery(p => p.hobby.findMany(), []),
    safeQuery(p => p.contact.findFirst(), null),
  ]);

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
