import React from 'react';
import Image from 'next/image';
import Logo from '../../public/images/bg-removed.png';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-20'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full blur-xl opacity-20 animate-pulse delay-1000'></div>
        <div className='absolute bottom-10 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full blur-xl opacity-20 animate-pulse delay-2000'></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Pages */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-yellow-400">Pages</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">About</a></li>
              <li><a href="/shop" className="text-gray-300 hover:text-yellow-400 transition-colors">Shop All</a></li>
            </ul>
          </div>

          {/* Utility Pages */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-yellow-400">Utility Pages</h3>
            <ul className="space-y-2">             
              <li><a href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-yellow-400 transition-colors">FAQs</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-yellow-400 transition-colors ">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-yellow-400">Contact</h3>
            <p className="text-gray-300 mb-4">example@gmail.com</p>
            <div className="flex space-x-3">
              {/* Facebook */}
              <a href="#" className="group relative p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
                <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              {/* Instagram */}
              <a href="#" className="group relative p-2 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-lg hover:from-pink-400 hover:via-red-400 hover:to-yellow-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25">
                <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

            

            

              {/* TikTok */}
              <a href="#" className="group relative p-2 bg-gradient-to-br from-gray-900 to-black rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25">
                <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <Image src={Logo} alt='logo' width={32} height={32} />
              </div>
              <span className="text-xl font-bold">Crochet</span>
            </div>
           
          </div>
        </div>

        {/* Bottom Footer */}
        {/* <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            Designed by Webestica, Powered by Webflow
          </p>
          <button className="mt-4 md:mt-0 flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
            <div className="w-4 h-4 bg-white rounded"></div>
            <span className="text-sm">More Templates</span>
          </button>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
