import { Inter, Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Providers from '@/store/Providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

const playfair = Playfair_Display({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-playfair',
	display: 'swap',
});

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-poppins',
	display: 'swap',
});
export const metadata = {
	title: 'Kupasi - Premium Tea Cups Collection',
	description:
		'Discover our exquisite collection of premium tea cups. From classic porcelain to elegant bone china, find the perfect tea cup for your daily tea ritual.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className='overflow-x-hidden'>
			<body
				className={`${inter.variable} ${playfair.variable} ${poppins.variable} antialiased overflow-x-hidden`}
			>
				<Providers>
					<CartProvider>
						{children}
						<Toaster
							position='top-right'
							toastOptions={{
								duration: 4000,
								style: {
									background: '#363636',
									color: '#fff',
								},
								success: {
									duration: 3000,
									iconTheme: {
										primary: '#4ade80',
										secondary: '#fff',
									},
								},
								error: {
									duration: 4000,
									iconTheme: {
										primary: '#ef4444',
										secondary: '#fff',
									},
								},
							}}
						/>
					</CartProvider>
				</Providers>
			</body>
		</html>
	);
}
