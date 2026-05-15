import HeroSection from './HeroSection';
import {
  TrustStrip,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
} from './HomeSections';

export default function Home() {
  return (
    <div className="page-enter">
      <HeroSection />
      <TrustStrip />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
