import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Journey from '@/components/Journey/Journey';
import Skills from '@/components/Skills/Skills';
import Projects from '@/components/Projects/Projects';
import Contact from '@/components/Contact/Contact';
import FadeIn from '@/components/FadeIn';
import FloatingSocials from '@/components/FloatingSocials/FloatingSocials';

export default function Home() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <Navbar />
      <FadeIn delay={0.1}><Hero /></FadeIn>
      <FadeIn delay={0.2}><About /></FadeIn>
      <FadeIn delay={0.2}><Journey /></FadeIn>
      <FadeIn delay={0.2}><Skills /></FadeIn>
      <FadeIn delay={0.2}><Projects /></FadeIn>
      <FadeIn delay={0.2}><Contact /></FadeIn>
      <FloatingSocials />
    </main>
  );
}
