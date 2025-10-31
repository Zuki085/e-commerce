import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Product Image */}
          <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-full h-80 bg-amber-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-40 bg-amber-200 rounded-lg mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Cream Ribbed Top</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="lg:w-1/3 text-center mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              The hidden gems in fashion trends
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Step into the realm of unparalleled style with our unbeatable t-shirt trendsetter of today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gray-100 border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                Shop Women
              </button>
              <button className="px-8 py-3 bg-gray-100 border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                Shop Men
              </button>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="lg:w-1/3 lg:pl-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-full h-80 bg-amber-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-40 bg-amber-300 rounded-lg mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Tan T-shirt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

