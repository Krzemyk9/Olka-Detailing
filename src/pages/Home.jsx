import HeroSection from '../components/home/HeroSection.jsx';
import BrandsMarquee from '../components/home/BrandsMarquee.jsx';
import OwnerSection from '../components/home/OwnerSection.jsx';
import ServiceCards from '../components/home/ServiceCards.jsx';
import ReviewsSection from '../components/home/ReviewsSection.jsx';
import BeforeAfterSlider from '../components/home/BeforeAfterSlider.jsx';
import FaqAccordion from '../components/home/FaqAccordion.jsx';
import PageNav from "../components/ui/PageNav.jsx";

export default function Home() {
  return (
    <>
      <PageNav />
      <div className="bg-[#0a0a0a]">
        <HeroSection />
        <BrandsMarquee />
        <OwnerSection />
        <ServiceCards />
        <ReviewsSection />
        <BeforeAfterSlider />
        <FaqAccordion />
      </div>
    </>
  )
}
