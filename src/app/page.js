import Header from '../components/Header';
import RecentProducts from '../components/RecentProducts';
import Footer from '../components/Footer';
import ModernHeroSection from '@/components/ModernHeroSection';

export default function Home() {
	return (
		<div className='min-h-screen bg-white'>
			<Header />
			<ModernHeroSection />
			<RecentProducts />
			<Footer />
		</div>
	);
}
