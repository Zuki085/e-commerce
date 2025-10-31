import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import RecentProducts from '../components/RecentProducts';
import TestimonialSection from '../components/TestimonialSection';
import ShopByCategory from '../components/ShopByCategory';
import Footer from '../components/Footer';
import ModernHeroSection from '@/components/ModernHeroSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ModernHeroSection />
      <RecentProducts />
      {/* <TestimonialSection />
      <ShopByCategory /> */}
      <Footer />
    </div>
  );
}
