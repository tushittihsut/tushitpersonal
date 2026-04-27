import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HeroTwo from '@/components/HeroTwo';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import CustomCursor from '@/components/CustomCursor';
import GlobalScene from '@/components/GlobalScene';
import DimensionLanding from '@/components/DimensionLanding';
import ReviewsSection from '@/components/ReviewsSection';

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <GlobalScene />
      <Navbar />
      <Hero />
      <HeroTwo />
      <DimensionLanding />
      <ProjectsShowcase />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  );
}
