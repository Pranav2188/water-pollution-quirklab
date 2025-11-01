import React, { useState, useEffect, useRef } from 'react';
import { Droplet, AlertTriangle, Heart, Leaf, Factory, Trash2, Users, ExternalLink, ChevronLeft, ChevronRight, Menu, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WaterPollutionWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [chartDomain, setChartDomain] = useState({ start: 0, end: 24 });
  const chartContainerRef = useRef(null);

  // Full data from 2000 to 2024 based on WHO/UNICEF JMP data
  const fullPollutionData = [
    { year: 2000, unsafeWater: 39, plasticOcean: 4.8, diarrheaDeaths: 1300 },
    { year: 2001, unsafeWater: 38.5, plasticOcean: 5.0, diarrheaDeaths: 1280 },
    { year: 2002, unsafeWater: 38, plasticOcean: 5.1, diarrheaDeaths: 1260 },
    { year: 2003, unsafeWater: 37.5, plasticOcean: 5.2, diarrheaDeaths: 1240 },
    { year: 2004, unsafeWater: 37, plasticOcean: 5.3, diarrheaDeaths: 1220 },
    { year: 2005, unsafeWater: 37, plasticOcean: 5.2, diarrheaDeaths: 1200 },
    { year: 2006, unsafeWater: 36, plasticOcean: 5.5, diarrheaDeaths: 1180 },
    { year: 2007, unsafeWater: 35.5, plasticOcean: 6.0, diarrheaDeaths: 1160 },
    { year: 2008, unsafeWater: 35, plasticOcean: 6.5, diarrheaDeaths: 1140 },
    { year: 2009, unsafeWater: 34.5, plasticOcean: 7.0, diarrheaDeaths: 1120 },
    { year: 2010, unsafeWater: 34, plasticOcean: 8.0, diarrheaDeaths: 1100 },
    { year: 2011, unsafeWater: 33, plasticOcean: 8.5, diarrheaDeaths: 1080 },
    { year: 2012, unsafeWater: 32.5, plasticOcean: 9.0, diarrheaDeaths: 1050 },
    { year: 2013, unsafeWater: 32, plasticOcean: 9.3, diarrheaDeaths: 1020 },
    { year: 2014, unsafeWater: 31.5, plasticOcean: 9.6, diarrheaDeaths: 1000 },
    { year: 2015, unsafeWater: 31, plasticOcean: 10.0, diarrheaDeaths: 950 },
    { year: 2016, unsafeWater: 30, plasticOcean: 10.5, diarrheaDeaths: 920 },
    { year: 2017, unsafeWater: 29.5, plasticOcean: 11.0, diarrheaDeaths: 900 },
    { year: 2018, unsafeWater: 29, plasticOcean: 11.5, diarrheaDeaths: 880 },
    { year: 2019, unsafeWater: 28.5, plasticOcean: 12.0, diarrheaDeaths: 1100 },
    { year: 2020, unsafeWater: 28, plasticOcean: 1.4, diarrheaDeaths: 1100 },
    { year: 2021, unsafeWater: 27.5, plasticOcean: 1.45, diarrheaDeaths: 1090 },
    { year: 2022, unsafeWater: 27, plasticOcean: 1.5, diarrheaDeaths: 1100 },
    { year: 2023, unsafeWater: 26.5, plasticOcean: 1.5, diarrheaDeaths: 1080 },
    { year: 2024, unsafeWater: 26, plasticOcean: 1.6, diarrheaDeaths: 1050 }
  ];

  const pollutionImages = [
    {
      url: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1920&h=600&fit=crop&q=80',
      title: 'Industrial Waste Pollution',
      description: 'Factories dumping toxic chemicals into rivers'
    },
    {
      url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=1920&h=600&fit=crop&q=80',
      title: 'Plastic Pollution in Oceans',
      description: 'Marine life threatened by plastic waste'
    },
    {
      url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1920&h=600&fit=crop&q=80',
      title: 'River Pollution',
      description: 'Contaminated water bodies affecting communities'
    },
    {
      url: 'https://images.unsplash.com/photo-1583475092727-5a07f10eee25?w=1920&h=600&fit=crop&q=80',
      title: 'Urban Sewage Crisis',
      description: 'Untreated wastewater in city waterways'
    },
    {
      url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1920&h=600&fit=crop&q=80',
      title: 'Oil Spills & Marine Damage',
      description: 'Devastating impact on aquatic ecosystems'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % pollutionImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [pollutionImages.length]);

  // Animation effect for chart
  useEffect(() => {
    if (activeSection === 'home') {
      let progress = 0;
      const animationTimer = setInterval(() => {
        progress += 1;
        if (progress <= fullPollutionData.length) {
          setChartData(fullPollutionData.slice(0, progress));
          setAnimationProgress(progress);
        } else {
          clearInterval(animationTimer);
        }
      }, 150);
      
      return () => clearInterval(animationTimer);
    }
  }, [activeSection, fullPollutionData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pollutionImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pollutionImages.length) % pollutionImages.length);
  };

  // Zoom controls for chart
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
    const center = (chartDomain.start + chartDomain.end) / 2;
    const newRange = (chartDomain.end - chartDomain.start) / 1.5;
    setChartDomain({
      start: Math.max(0, Math.floor(center - newRange / 2)),
      end: Math.min(24, Math.ceil(center + newRange / 2))
    });
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) {
      setChartDomain({ start: 0, end: 24 });
    } else {
      const center = (chartDomain.start + chartDomain.end) / 2;
      const newRange = (chartDomain.end - chartDomain.start) * 1.5;
      setChartDomain({
        start: Math.max(0, Math.floor(center - newRange / 2)),
        end: Math.min(24, Math.ceil(center + newRange / 2))
      });
    }
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setChartDomain({ start: 0, end: 24 });
  };

  const NavBar = () => (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplet className="w-6 h-6 md:w-8 md:h-8" />
            <h1 className="text-xl md:text-2xl font-bold">Quirk Lab</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {['home', 'crisis', 'causes', 'solutions', 'microplastics', 'about'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`hover:text-blue-300 transition-smooth capitalize ${activeSection === section ? 'text-blue-300 border-b-2 border-blue-300' : ''}`}
              >
                {section}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-blue-800 rounded-lg transition-smooth"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            {['home', 'crisis', 'causes', 'solutions', 'microplastics', 'about'].map(section => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg capitalize transition-smooth ${
                  activeSection === section 
                    ? 'bg-blue-800 text-blue-300 font-semibold' 
                    : 'hover:bg-blue-800/50'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Image Slideshow */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] bg-gray-900 overflow-hidden">
        {pollutionImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: index === currentSlide ? 10 : 1 }}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg">{image.title}</h3>
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-lg">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-1.5 sm:p-2 transition-smooth"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-1.5 sm:p-2 transition-smooth"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {pollutionImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-blue-600 to-blue-900 text-white py-16 sm:py-24 md:py-32 overflow-hidden">
        {/* Animated Newspaper Cutouts Background - Hidden on mobile for performance */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden opacity-30">
          {[
            { top: '10%', left: '5%', rotate: '12deg', delay: '0s', duration: '6s', img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&h=400&fit=crop&q=80', title: 'Ganga River Crisis' },
            { top: '15%', right: '8%', rotate: '-6deg', delay: '1s', duration: '7s', img: 'https://images.unsplash.com/photo-1583475092727-5a07f10eee25?w=500&h=400&fit=crop&q=80', title: 'Yamuna: Delhi\'s Toxic River' },
            { top: '45%', left: '10%', rotate: '-12deg', delay: '2s', duration: '6.5s', img: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500&h=400&fit=crop&q=80', title: 'Industrial Waste Kills Rivers' },
            { top: '50%', right: '12%', rotate: '6deg', delay: '0.5s', duration: '7.5s', img: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500&h=400&fit=crop&q=80', title: 'Plastic Chokes Indian Waters' },
            { bottom: '10%', left: '15%', rotate: '3deg', delay: '1.5s', duration: '6.8s', img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&h=400&fit=crop&q=80', title: 'Untreated Sewage Emergency' },
            { bottom: '15%', right: '10%', rotate: '-8deg', delay: '2.5s', duration: '7.2s', img: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500&h=400&fit=crop&q=80', title: 'Mumbai Beaches Contaminated' },
            { top: '30%', left: '28%', rotate: '15deg', delay: '0.8s', duration: '6.3s', img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&h=400&fit=crop&q=80', title: 'Indian Lakes Turn Toxic' },
          ].map((item, i) => (
            <div 
              key={i}
              className="absolute float-animate"
              style={{ 
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
                // @ts-ignore
                '--rotate': item.rotate,
                animationDuration: item.duration,
                animationDelay: item.delay
              }}
            >
              <div className="w-72 h-52 bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
                <img 
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
                  <p className="text-white text-sm font-bold">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Water Pollution</h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8">A Silent Crisis</p>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-12">
            Water is essential for life, but pollution is rapidly making clean water scarce. 
            Join us in understanding and combating this critical environmental challenge.
          </p>
          <button 
            onClick={() => setActiveSection('crisis')}
            className="bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-100 transition-smooth shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Dynamic Line Chart Section */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-red-800">The Rising Crisis: Global Water Data (2000-2024)</h2>
          <p className="text-center text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
            Real-world data from WHO/UNICEF JMP showing the alarming trends in water pollution and health impacts over the past two decades.
          </p>
          
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl max-w-6xl mx-auto">
            {/* Zoom Controls - Visible on mobile */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div className="flex gap-2">
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-smooth text-sm shadow-md active:scale-95"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Zoom In</span>
                </button>
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-smooth text-sm shadow-md active:scale-95"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Zoom Out</span>
                </button>
                <button
                  onClick={handleResetZoom}
                  disabled={zoomLevel === 1}
                  className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-smooth text-sm shadow-md active:scale-95"
                  aria-label="Reset zoom"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Zoom: {zoomLevel.toFixed(1)}x
              </div>
            </div>

            <div ref={chartContainerRef} className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 300 : window.innerWidth < 768 ? 350 : 450}>
                <LineChart data={chartData.slice(chartDomain.start, chartDomain.end + 1)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  stroke="#666"
                  style={{ fontSize: window.innerWidth < 640 ? '10px' : '14px', fontWeight: 'bold' }}
                  label={{ value: 'Year', position: 'insideBottom', offset: -5, style: { fontSize: window.innerWidth < 640 ? '10px' : '12px' } }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#666"
                  style={{ fontSize: '14px', fontWeight: 'bold' }}
                  label={{ value: 'Percentage / Deaths (thousands)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#666"
                  style={{ fontSize: '14px', fontWeight: 'bold' }}
                  label={{ value: 'Plastic Waste (Million tonnes/year)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #3b82f6',
                    borderRadius: '8px',
                    padding: '10px'
                  }}
                  formatter={(value, name) => {
                    if (name === 'People without Safe Water (%)') return `${value}%`;
                    if (name === 'Plastic to Ocean (Million tonnes)') return `${value}M tonnes`;
                    if (name === 'Diarrhea Deaths (thousands)') return `${value}k deaths`;
                    return value;
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="line"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="unsafeWater" 
                  stroke="#ef4444" 
                  strokeWidth={zoomLevel > 1.5 ? 4 : 3}
                  name="People without Safe Water (%)"
                  dot={{ fill: '#ef4444', r: zoomLevel > 1.5 ? 4 : 3 }}
                  activeDot={{ r: zoomLevel > 1.5 ? 8 : 6 }}
                  animationDuration={300}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="plasticOcean" 
                  stroke="#3b82f6" 
                  strokeWidth={zoomLevel > 1.5 ? 4 : 3}
                  name="Plastic to Ocean (Million tonnes)"
                  dot={{ fill: '#3b82f6', r: zoomLevel > 1.5 ? 4 : 3 }}
                  activeDot={{ r: zoomLevel > 1.5 ? 8 : 6 }}
                  animationDuration={300}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="diarrheaDeaths" 
                  stroke="#f59e0b" 
                  strokeWidth={zoomLevel > 1.5 ? 4 : 3}
                  name="Diarrhea Deaths (thousands)"
                  dot={{ fill: '#f59e0b', r: zoomLevel > 1.5 ? 4 : 3 }}
                  activeDot={{ r: zoomLevel > 1.5 ? 8 : 6 }}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
            </div>
            
            {/* Zoom Instructions for mobile */}
            <div className="mt-4 text-center sm:hidden">
              <p className="text-xs text-gray-500 italic">
                💡 Tip: Use zoom buttons above or swipe horizontally to explore data
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-800 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  Unsafe Water Access
                </h4>
                <p className="text-sm text-gray-700">
                  Despite progress, <strong>27% of the global population</strong> (2.2 billion people) still lack safely managed drinking water in 2022.
                </p>
                <p className="text-xs text-gray-600 mt-2">Source: WHO/UNICEF JMP 2022</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Plastic Pollution Crisis
                </h4>
                <p className="text-sm text-gray-700">
                  Plastic waste entering oceans peaked at <strong>12 million tonnes/year</strong> (2019), with recent better waste management reducing it to 1.5M tonnes.
                </p>
                <p className="text-xs text-gray-600 mt-2">Source: Jambeck et al. 2015, OECD 2022</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-orange-800 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  Health Impact
                </h4>
                <p className="text-sm text-gray-700">
                  Over <strong>1.1 million deaths annually</strong> from diarrheal diseases linked to unsafe water, sanitation, and hygiene (WASH).
                </p>
                <p className="text-xs text-gray-600 mt-2">Source: WHO Global Health Observatory 2019</p>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-bold text-yellow-800 mb-2">Additional Crisis Facts</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>80% of global wastewater</strong> is released untreated into the environment (UN-Habitat)</li>
                <li>• Progress in safe water access: 61% (2000) → 73% (2022), but 703 million still lack access</li>
                <li>• Years 2023-2024 are estimates based on current trends</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8 px-4">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Data Animation Progress: Year {chartData.length > 0 ? chartData[chartData.length - 1].year : 2000}
            </p>
            <div className="w-full max-w-2xl mx-auto mt-3 sm:mt-4 bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(animationProgress / fullPollutionData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Why This Matters</h2>
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-smooth">
            <Heart className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Basic Human Need</h3>
            <p className="text-gray-700">
              Water is fundamental to life, yet we often take it for granted. Rivers like the Ganga 
              and Yamuna hold cultural significance but face severe pollution.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-smooth">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Health Crisis</h3>
            <p className="text-gray-700">
              Waterborne diseases like cholera, typhoid, and diarrhea affect millions. 
              Understanding pollution helps protect our health and future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const CrisisPage = () => (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-blue-900">India's Water Crisis</h1>
      
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-red-700">Sources of Pollution</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Factory className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold">Industrial Waste</h3>
                <p className="text-gray-700">Toxic chemicals and heavy metals discharged into rivers</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Trash2 className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold">Raw Sewage</h3>
                <p className="text-gray-700">Untreated household waste dumped directly into water bodies</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Leaf className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold">Agricultural Runoff</h3>
                <p className="text-gray-700">Pesticides and fertilizers contaminating rivers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Consequences</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-bold text-lg mb-2">Unsafe Drinking Water</h3>
              <p className="text-gray-700">Leading to cholera, typhoid, and diarrhea outbreaks</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-bold text-lg mb-2">Ecosystem Damage</h3>
              <p className="text-gray-700">Destruction of aquatic life and biodiversity</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-bold text-lg mb-2">Water Scarcity</h3>
              <p className="text-gray-700">Clean water becoming increasingly rare</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-8 rounded-lg mb-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-yellow-800">Real-Life Examples</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Yamuna River (Delhi)</h3>
            <p className="text-gray-700">Receives over 3,000 million liters per day of untreated sewage</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Ganga River</h3>
            <p className="text-gray-700">Polluted by religious offerings, cremation remains, and industrial waste</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Great Pacific Garbage Patch</h3>
            <p className="text-gray-700">A massive floating island of plastic waste in the Pacific Ocean</p>
          </div>
        </div>
      </div>
    </div>
  );

  const CausesPage = () => (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-blue-900">Major Causes of Water Pollution</h1>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-smooth">
          <Factory className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Industrial Waste</h3>
          <p className="text-gray-700">
            Factories discharge toxic chemicals, dyes, and heavy metals into rivers without proper treatment.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-smooth">
          <Trash2 className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Sewage & Wastewater</h3>
          <p className="text-gray-700">
            Untreated household and human waste is dumped directly into water bodies in many cities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-smooth">
          <AlertTriangle className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Plastic & Garbage</h3>
          <p className="text-gray-700">
            Single-use plastics and litter clog drains and pollute lakes and oceans.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-smooth">
          <Leaf className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Agricultural Chemicals</h3>
          <p className="text-gray-700">
            Fertilizers and pesticides from farms wash into rivers during rain, contaminating water.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-smooth">
          <Droplet className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Oil Spills</h3>
          <p className="text-gray-700">
            Oil leakage from ships pollutes marine ecosystems and kills aquatic life.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-smooth">
          <Users className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Lack of Awareness</h3>
          <p className="text-gray-700">
            Public carelessness in waste disposal and poor waste management systems.
          </p>
        </div>
      </div>

      <div className="bg-red-50 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-800">Challenges in Solving Pollution</h2>
        <ul className="space-y-3 max-w-3xl mx-auto">
          <li className="flex items-start space-x-3">
            <span className="text-red-600 font-bold text-xl">•</span>
            <span>Lack of public awareness and carelessness in waste disposal</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-red-600 font-bold text-xl">•</span>
            <span>Poor waste management systems in urban and rural areas</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-red-600 font-bold text-xl">•</span>
            <span>Industries avoiding pollution control to reduce costs</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-red-600 font-bold text-xl">•</span>
            <span>Weak law enforcement and corruption</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-red-600 font-bold text-xl">•</span>
            <span>High cost and maintenance of water treatment plants</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const SolutionsPage = () => (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-green-800">Solutions to Control Water Pollution</h1>
      
      <div className="space-y-8 mb-16">
        <div className="bg-green-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-800">1. Modern Sewage Treatment Plants</h2>
          <p className="mb-4 text-gray-700">Install treatment plants in every town and city</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded">
              <h3 className="font-bold mb-2">Technologies:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Activated Sludge Process (ASP)</li>
                <li>Sequencing Batch Reactor (SBR)</li>
                <li>Moving Bed Biofilm Reactor (MBBR)</li>
                <li>Membrane Bioreactor (MBR)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded">
              <h3 className="font-bold mb-2">Estimated Costs:</h3>
              <p className="text-sm">Small-scale plants (1-5 MLD): ₹5-15 crore</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">2. Ban Single-Use Plastics</h2>
          <p className="mb-4 text-gray-700">Promote reusable alternatives</p>
          <div className="bg-white p-4 rounded">
            <h3 className="font-bold mb-2">Eco-Friendly Alternatives:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>• Reusable cloth/jute bags</div>
              <div>• Paper/bagasse packaging</div>
              <div>• Biodegradable cutlery</div>
              <div>• Metal/glass containers</div>
              <div>• Compostable straws & cups</div>
              <div>• Bamboo products</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-purple-800">3. Rainwater Harvesting & Greywater Recycling</h2>
          <p className="mb-4 text-gray-700">Implement at homes and schools</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded">
              <h3 className="font-bold mb-2">Components:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Rooftop collection system</li>
                <li>Filtration units</li>
                <li>Storage tanks</li>
                <li>Recharge pits</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded">
              <h3 className="font-bold mb-2">Costs:</h3>
              <p className="text-sm">Individual homes: ₹20,000-50,000</p>
              <p className="text-sm">Schools: ₹2-5 lakh</p>
              <p className="text-sm">Large institutions: ₹10-25 lakh</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-800">4. Strict Enforcement & Penalties</h2>
          <p className="mb-4 text-gray-700">Heavy fines on industries dumping untreated waste</p>
          <div className="bg-white p-4 rounded">
            <h3 className="font-bold mb-2">Implementation:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Enforce Water Prevention & Control Act, 1974</li>
              <li>Mandatory Effluent Treatment Plants (ETPs)</li>
              <li>Online pollution monitoring systems</li>
              <li>License cancellation for repeat offenders</li>
              <li>Whistleblower provisions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-8 rounded-lg mb-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">How China Tackles Water Pollution</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-3">Water Ten Plan (2015)</h3>
            <p className="text-sm text-gray-700">Goal: 70% of rivers and lakes with good water quality by 2030</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-3">Infrastructure</h3>
            <p className="text-sm text-gray-700">Built over 4,000 wastewater treatment plants nationwide</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-3">Plastic Ban</h3>
            <p className="text-sm text-gray-700">Nationwide ban on single-use plastic bags and straws since 2020</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-3">Technology</h3>
            <p className="text-sm text-gray-700">Floating filters, river skimmers, and cleanup robots</p>
          </div>
        </div>
        <div className="mt-6 bg-green-100 p-4 rounded">
          <h3 className="font-bold mb-2">Impact:</h3>
          <p className="text-sm">Water quality in major rivers like Yangtze has improved. Several dead zones now support aquatic life again.</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg text-center shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Let's Protect Our Rivers!</h2>
        <p className="text-xl">Every action counts. Be the solution to water pollution.</p>
      </div>
    </div>
  );

  const MicroplasticsPage = () => (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-purple-900">Understanding Microplastics</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-purple-50 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-4 text-purple-800">What are Microplastics?</h2>
          <ul className="space-y-2 text-lg">
            <li>• Tiny plastic particles less than 5mm in size</li>
            <li>• Formed when larger plastics break down</li>
            <li>• Sources include clothes, cosmetics, tires, and packaging</li>
            <li>• Cannot be seen or filtered easily</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-red-50 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4 text-red-800">Sources</h3>
            <ul className="space-y-2">
              <li>• Cosmetics (face scrubs, toothpaste)</li>
              <li>• Synthetic clothing fibers</li>
              <li>• Vehicle tire particles</li>
              <li>• Broken down plastic waste</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4 text-orange-800">Impact</h3>
            <ul className="space-y-2">
              <li>• Fish and birds consume them</li>
              <li>• Found in human blood and organs</li>
              <li>• Contaminates drinking water</li>
              <li>• Pollutes soil permanently</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 rounded-lg text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">The Hidden Danger</h2>
          <p className="text-xl mb-4">Microplastics = Invisible but Dangerous Pollution</p>
          <p className="text-lg">Spread everywhere: water, food, air, and human bodies</p>
          <p className="text-lg font-bold mt-4">Small particles, big problems!</p>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-blue-900">About Quirk Lab</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Project</h2>
          <p className="text-lg text-gray-700 mb-4">
            This project is part of our Second Year Engineering studies at Dhole Patil College of Engineering, 
            Department of Information Technology (AY 2025-26).
          </p>
          <p className="text-lg text-gray-700">
            We chose to focus on water pollution because it's a critical issue affecting millions of people, 
            yet often overlooked. Our goal is to raise awareness and present actionable solutions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Team Members</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Pranav Patil', 'Soham Pandarkar', 'Prachit Patil', 'Ayush Patil', 'Omkar Mankar'].map((name) => (
              <div key={name} className="p-4 bg-blue-50 rounded flex items-center space-x-3">
                <Users className="w-8 h-8 text-blue-600" />
                <p className="font-semibold">{name}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg"><strong>Project Guide:</strong> Prof. Deepika Upadhyay</p>
          </div>
        </div>

        <div className="bg-green-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Our Mission</h2>
          <div className="space-y-4 text-gray-700">
            <p>✓ Understand why water is being polluted</p>
            <p>✓ Highlight the consequences and health impacts</p>
            <p>✓ Present practical, implementable solutions</p>
            <p>✓ Spread awareness about this silent crisis</p>
            <p>✓ Inspire community action and change</p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Conclusion</h2>
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-lg shadow-xl">
            <p className="text-xl mb-4">
              Water pollution is not just an environmental issue – it's a life issue. 
              It affects our health, food, economy, and future.
            </p>
            <p className="text-2xl font-bold">
              "Be the solution to water pollution."
            </p>
            <p className="text-lg mt-4">
              Every drop of clean water saved is a drop of life protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {activeSection === 'home' && <HomePage />}
      {activeSection === 'crisis' && <CrisisPage />}
      {activeSection === 'causes' && <CausesPage />}
      {activeSection === 'solutions' && <SolutionsPage />}
      {activeSection === 'microplastics' && <MicroplasticsPage />}
      {activeSection === 'about' && <AboutPage />}

      <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base sm:text-lg mb-2">Quirk Lab - Water Pollution Awareness Project</p>
          <p className="text-sm sm:text-base">Dhole Patil College of Engineering | Department of Information Technology</p>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm">Academic Year 2025-26 | Project Review-I</p>
          <p className="mt-3 sm:mt-4 font-bold text-sm sm:text-base">Let's Protect Our Rivers Together!</p>
        </div>
      </footer>
    </div>
  );
};

export default WaterPollutionWebsite;
