\uFEFFimport MainLayout from '../components/layout/MainLayout'
import HeroSection from '../components/home/HeroSection'
import ServicesSection from '../components/home/ServicesSection'
import AboutSection from '../components/home/AboutSection'
import HowItWorks from '../components/home/HowItWorks'
import WhyChooseUs from '../components/home/WhyChooseUs'
import BeforeAfterSection from '../components/home/BeforeAfterSection'
import PricingSection from '../components/home/PricingSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import CTASection from '../components/home/CTASection'
import ServiceAreasSection from '../components/home/ServiceAreasSection'
import BlogSection from '../components/home/BlogSection'

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <HowItWorks />
      <BeforeAfterSection />
      <AboutSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <ServiceAreasSection />
      <BlogSection />
    </MainLayout>
  )
}

