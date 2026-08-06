import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Testimonials from '@/components/Testimonials/Testimonials';
import Contact from '@/components/Contact/Contact';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <main>
      <Navbar />
      <FadeIn delay={0.1}><Hero /></FadeIn>
      <FadeIn delay={0.2}><About /></FadeIn>
      <FadeIn delay={0.2}><Services /></FadeIn>
      <FadeIn delay={0.2}><Testimonials /></FadeIn>
      <FadeIn delay={0.2}><Contact /></FadeIn>
    </main>
  );
}
