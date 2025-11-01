import React, { useState, useEffect } from 'react';
import { Droplet, AlertTriangle, Heart, Leaf, Factory, Trash2, Users, TrendingUp, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WaterPollutionWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [animationProgress, setAnimationProgress] = useState(0);

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

  // Floating animation styles
  const floatingAnimation = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(var(--rotate)); }
      50% { transform: translateY(-20px) rotate(var(--rotate)); }
    }
    .float-animate {
      animation: float ease-in-out infinite;
    }
  `;

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
      }, 150); // Animate over 3 seconds (20 data points * 150ms)
      
      return () => clearInterval(animationTimer);
    }
  }, [activeSection]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pollutionImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pollutionImages.length) % pollutionImages.length);
  };

  const NavBar = () => (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplet className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Quirk Lab</h1>
          </div>
          <div className="flex space-x-6">
            {['home', 'crisis', 'causes', 'solutions', 'microplastics', 'about'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`hover:text-blue-300 transition capitalize ${activeSection === section ? 'text-blue-300 border-b-2' : ''}`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Image Slideshow */}
      <div className="relative w-full h-96 md:h-128 bg-gray-900 overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-white text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{image.title}</h3>
                <p className="text-white text-lg md:text-xl drop-shadow-lg">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {pollutionImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-blue-600 to-blue-900 text-white py-32 overflow-hidden">
        {/* Animated Newspaper Cutouts Background with Real Images */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Newspaper Cutout 1 - Ganga Pollution */}
          <div 
            className="absolute opacity-25 float-animate"
            style={{ 
              top: '10%', 
              left: '5%',
              '--rotate': '12deg',
              animationDuration: '6s',
              animationDelay: '0s'
            }}
          >
            <div className="w-72 h-52 bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&h=400&fit=crop&q=80" 
                alt="Ganga pollution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
                <p className="text-white text-sm font-bold">Ganga River Crisis</p>
              </div>
            </div>
          </div>

          {/* Newspaper Cutout 2 - Yamuna Pollution */}
          <div 
            className="absolute opacity-25 float-animate"
            style={{ 
              top: '15%', 
              right: '8%',
              '--rotate': '-6deg',
              animationDuration: '7s',
              animationDelay: '1s'
            }}
          >
            <div className="w-80 h-56 bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1583475092727-5a07f10eee25?w=500&h=400&fit=crop&q=80" 
                alt="Yamuna pollution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
                <p className="text-white text-sm font-bold">Yamuna: Delhi's Toxic River</p>
              </div>
            </div>
          </div>

          {/* Newspaper Cutout 3 - Industrial Waste */}
          <div 
            className="absolute opacity-25 float-animate"
            style={{ 
              top: '45%', 
              left: '10%',
              '--rotate': '-12deg',
              animationDuration: '6.5s',
              animationDelay: '2s'
            }}
          >
            <div className="w-68 h-48 bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500&h=400&fit=crop&q=80" 
                alt="Industrial pollution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
                <p className="text-white text-sm font-bold">Industrial Waste Kills Rivers</p>
              </div>
            </div>
          </div>

          {/* Newspaper Cutout 4 - Plastic Pollution */}
          <div 
            className="absolute opacity-25 float-animate"
            style={{ 
              top: '50%', 
              right: '12%',
              '--rotate': '6deg',
              animationDuration: '7.5s',
              animationDelay: '0.5s'
            }}
          >
            <div className="w-76 h-54 bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500&h=400&fit=crop&q=80" 
                alt="Plastic pollution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
                <p className="text-white text-sm font-bold">Plastic Chokes Indian Waters</p>
              </div>
            </div>
          </div>

          {/* Newspaper Cutout 5 - Sewage Crisis */}
          <div 
            className="absolute opacity-25 float-animate"
            style={{ 
              bottom: '10%', 
              left: '15%',
              '--rotate': '3deg',
              animationDuration: '6.8s',
              animationDelay: '1.5s'
            }}
          >
            <div className="w-70 h-50 bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&h=400&fit=crop&q=80" 
                alt="Sewage pollution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
                <p className="text-white text-sm font-bold">Untreated Sewage Emergency</p>
              </div>
            </div>
          </div>

          {/* Newspaper Cutout 6 - Mumbai Beach Pollution */}
          <div 
            className="absolute opacity-25 float-animate"
            style={{ 
              bottom: '15%', 
              right: '10%',
              '--rotate': '-8deg',
              animationDuration: '7.2s',
              animationDelay: '2.5s'
            }}
          >
            <div className="w-72 h-52 bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500&h=400&fit=crop&q=80" 
                alt="Beach pollution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
                <p className="text-white text-sm font-bold">Mumbai Beaches Contaminated</p>
              </div>
            </div>
          </div>

          {/* Newspaper Cutout 7 - Lake Pollution */}
          <div 
            className="absolute opacity-25 float-animate"
            style={{ 
              top: '30%', 
              left: '28%',
              '--rotate': '15deg',
              animationDuration: '6.3s',
              animationDelay: '0.8s'
            }}
          >
            <div className="w-66 h-46 bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&h=400&fit=crop&q=80" 
                alt="Lake pollution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
                <p className="text-white text-sm font-bold">Indian Lakes Turn Toxic</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6">Water Pollution</h1>
          <p className="text-3xl mb-8">A Silent Crisis</p>
          <p className="text-xl max-w-3xl mx-auto mb-12">
            Water is essential for life, but pollution is rapidly making clean water scarce. 
            Join us in understanding and combating this critical environmental challenge.
          </p>
          <button 
            onClick={() => setActiveSection('crisis')}
            className="bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-100 transition"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Dynamic Line Chart Section */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-red-800">The Rising Crisis: Global Water Data (2000-2024)</h2>
          <p className="text-center text-gray-700 mb-8 text-lg max-w-3xl mx-auto">
            Real-world data from WHO/UNICEF JMP showing the alarming trends in water pollution and health impacts over the past two decades.
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-6xl mx-auto">
            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  stroke="#666"
                  style={{ fontSize: '14px', fontWeight: 'bold' }}
                  label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
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
                  strokeWidth={3}
                  name="People without Safe Water (%)"
                  dot={{ fill: '#ef4444', r: 3 }}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="plasticOcean" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Plastic to Ocean (Million tonnes)"
                  dot={{ fill: '#3b82f6', r: 3 }}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="diarrheaDeaths" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  name="Diarrhea Deaths (thousands)"
                  dot={{ fill: '#f59e0b', r: 3 }}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-8 grid md:grid-cols-3 gap-4">
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

          <div className="text-center mt-8">
            <p className="text-xl font-semibold text-gray-800">
              Data Animation Progress: Year {chartData.length > 0 ? chartData[chartData.length - 1].year : 2000}
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(animationProgress / fullPollutionData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why This Matters</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Heart className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Basic Human Need</h3>
            <p className="text-gray-700">
              Water is fundamental to life, yet we often take it for granted. Rivers like the Ganga 
              and Yamuna hold cultural significance but face severe pollution.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
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
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-12 text-blue-900">India's Water Crisis</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-red-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-red-700">Sources of Pollution</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Factory className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold">Industrial Waste</h3>
                <p className="text-gray-700">Toxic chemicals and heavy metals discharged into rivers</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Trash2 className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold">Raw Sewage</h3>
                <p className="text-gray-700">Untreated household waste dumped directly into water bodies</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Leaf className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold">Agricultural Runoff</h3>
                <p className="text-gray-700">Pesticides and fertilizers contaminating rivers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
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

      <div className="bg-yellow-50 p-8 rounded-lg mb-8">
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
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-12 text-blue-900">Major Causes of Water Pollution</h1>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <Factory className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Industrial Waste</h3>
          <p className="text-gray-700">
            Factories discharge toxic chemicals, dyes, and heavy metals into rivers without proper treatment.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <Trash2 className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Sewage & Wastewater</h3>
          <p className="text-gray-700">
            Untreated household and human waste is dumped directly into water bodies in many cities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <AlertTriangle className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Plastic & Garbage</h3>
          <p className="text-gray-700">
            Single-use plastics and litter clog drains and pollute lakes and oceans.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <Leaf className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Agricultural Chemicals</h3>
          <p className="text-gray-700">
            Fertilizers and pesticides from farms wash into rivers during rain, contaminating water.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <Droplet className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Oil Spills</h3>
          <p className="text-gray-700">
            Oil leakage from ships pollutes marine ecosystems and kills aquatic life.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <Users className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-4 text-center">Lack of Awareness</h3>
          <p className="text-gray-700">
            Public carelessness in waste disposal and poor waste management systems.
          </p>
        </div>
      </div>

      <div className="bg-red-50 p-8 rounded-lg">
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
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-12 text-green-800">Solutions to Control Water Pollution</h1>
      
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

      <div className="bg-yellow-50 p-8 rounded-lg mb-8">
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

      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Let's Protect Our Rivers!</h2>
        <p className="text-xl">Every action counts. Be the solution to water pollution.</p>
      </div>
    </div>
  );

  const MicroplasticsPage = () => (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-12 text-purple-900">Understanding Microplastics</h1>
      
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
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-12 text-blue-900">About Quirk Lab</h1>
      
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
            <div className="p-4 bg-blue-50 rounded">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <p className="font-semibold">Pranav Patil</p>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <p className="font-semibold">Soham Pandarkar</p>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <p className="font-semibold">Prachit Patil</p>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <p className="font-semibold">Ayush Patil</p>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <p className="font-semibold">Omkar Mankar</p>
            </div>
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

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Conclusion</h2>
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-lg">
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
      <style>{floatingAnimation}</style>
      <NavBar />
      
      {activeSection === 'home' && <HomePage />}
      {activeSection === 'crisis' && <CrisisPage />}
      {activeSection === 'causes' && <CausesPage />}
      {activeSection === 'solutions' && <SolutionsPage />}
      {activeSection === 'microplastics' && <MicroplasticsPage />}
      {activeSection === 'about' && <AboutPage />}

      <footer className="bg-blue-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">Quirk Lab - Water Pollution Awareness Project</p>
          <p>Dhole Patil College of Engineering | Department of Information Technology</p>
          <p className="mt-4 text-sm">Academic Year 2025-26 | Project Review-I</p>
          <p className="mt-4 font-bold">Let's Protect Our Rivers Together!</p>
        </div>
      </footer>
    </div>
  );
};

export default WaterPollutionWebsite;