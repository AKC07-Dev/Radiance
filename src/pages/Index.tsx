import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, Star, TrendingUp, ShoppingBag, Users, Award, Heart, Sun, Moon } from 'lucide-react';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('quarterly');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [skincareFloatProps, setSkincareFloatProps] = useState({ left: { top: 0, left: 0, width: 256, height: 192 }, right: { top: 0, left: 0, width: 224, height: 176 } });
  const [growthGraphType, setGrowthGraphType] = useState('annual'); // 'annual' or 'quarterly'
  
  const sectionRefs = {
    home: useRef(null),
    testimonials: useRef(null),
    products: useRef(null),
    analytics: useRef(null)
  };

  // Loading animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Auto-sliding testimonials
  useEffect(() => {
    if (!isTestimonialHovered) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isTestimonialHovered]);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [loading]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  useEffect(() => {
    // On mount, check for system preference or previously set mode
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('darkMode');
    const shouldBeDark = saved === 'true' || (saved === null && prefersDark);
    setDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
  }, [darkMode]);

  // Randomize positions and sizes for Skincare floating divs on hover
  useEffect(() => {
    if (hoveredCategory === 'Skincare') {
      setSkincareFloatProps({
        left: {
          top: Math.random() * 60 - 30, // px offset from center vertically
          left: Math.random() * 60 - 30, // px offset from center horizontally
          width: 220 + Math.random() * 60, // 220-280px
          height: 140 + Math.random() * 80 // 140-220px
        },
        right: {
          top: Math.random() * 60 - 30,
          left: Math.random() * 60 - 30,
          width: 180 + Math.random() * 80, // 180-260px
          height: 180 + Math.random() * 80 // 180-260px
        }
      });
    }
  }, [hoveredCategory]);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#products' },
    { name: 'About Us', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Our Impact', href: '#analytics' },
    { name: 'Contact', href: '#contact' }
  ];

  const productCategories = [
    {
      name: 'Skincare',
      image: 'https://placehold.co/300x200/F8D8DD/8B4B8C?text=Skincare',
      description: 'Nourishing formulas for radiant skin',
      hoverColor: 'from-pink-200 to-rose-300'
    },
    {
      name: 'Makeup',
      image: 'https://placehold.co/300x200/C2A482/5A4A38?text=Makeup',
      description: 'Professional-grade cosmetics',
      hoverColor: 'from-amber-200 to-orange-300'
    },
    {
      name: 'Haircare',
      image: 'https://placehold.co/300x200/F5E8EB/8B5A6B?text=Haircare',
      description: 'Luxurious hair treatments',
      hoverColor: 'from-rose-200 to-pink-300'
    },
    {
      name: 'Fragrance',
      image: 'https://placehold.co/300x200/FADADD/9B4A6B?text=Fragrance',
      description: 'Signature scents that captivate',
      hoverColor: 'from-pink-100 to-rose-200'
    }
  ];

  const testimonials = [
    { company: 'Beauty Co.', logo: 'https://placehold.co/120x60/C2A482/FFFFFF?text=Beauty+Co', rating: 5 },
    { company: 'Glow Labs', logo: 'https://placehold.co/120x60/F8D8DD/8B4B8C?text=Glow+Labs', rating: 5 },
    { company: 'Radiance Inc.', logo: 'https://placehold.co/120x60/F5E8EB/8B5A6B?text=Radiance', rating: 5 },
    { company: 'Pure Skin', logo: 'https://placehold.co/120x60/FADADD/9B4A6B?text=Pure+Skin', rating: 5 },
    { company: 'Luxe Beauty', logo: 'https://placehold.co/120x60/FFC0CB/8B4B8C?text=Luxe+Beauty', rating: 5 },
    { company: 'Opal Glow', logo: 'https://placehold.co/120x60/E0BBE4/957DAD?text=Opal+Glow', rating: 5 },
    { company: 'Blush & Bloom', logo: 'https://placehold.co/120x60/F67280/C06C84?text=Blush+%26+Bloom', rating: 5 },
    { company: 'Velvet Touch', logo: 'https://placehold.co/120x60/FFB7B2/6A0572?text=Velvet+Touch', rating: 5 },
  ];

  const products = [
    {
      id: 1,
      name: 'Radiant Glow Serum',
      price: '$89',
      image: 'https://placehold.co/280x320/2D2D2D/F8D8DD?text=Serum',
      description: 'Transform your skin with our signature glow serum',
      category: 'Skincare'
    },
    {
      id: 2,
      name: 'Velvet Matte Lipstick',
      price: '$45',
      image: 'https://placehold.co/280x320/2D2D2D/C2A482?text=Lipstick',
      description: 'Long-lasting color with a luxurious feel',
      category: 'Makeup'
    },
    {
      id: 3,
      name: 'Nourishing Hair Mask',
      price: '$65',
      image: 'https://placehold.co/280x320/2D2D2D/F5E8EB?text=Hair+Mask',
      description: 'Deep conditioning treatment for silky hair',
      category: 'Haircare'
    },
    {
      id: 4,
      name: 'Signature Perfume',
      price: '$120',
      image: 'https://placehold.co/280x320/2D2D2D/FADADD?text=Perfume',
      description: 'An enchanting fragrance that leaves a lasting impression',
      category: 'Fragrance'
    },
    {
      id: 5,
      name: 'Brightening Eye Cream',
      price: '$75',
      image: 'https://placehold.co/280x320/2D2D2D/F8D8DD?text=Eye+Cream',
      description: 'Reduce dark circles and brighten your gaze',
      category: 'Skincare'
    },
    {
      id: 6,
      name: 'Highlighter Palette',
      price: '$55',
      image: 'https://placehold.co/280x320/2D2D2D/C2A482?text=Highlighter',
      description: 'Multi-dimensional glow for every skin tone',
      category: 'Makeup'
    }
  ];

  const analyticsData = {
    quarterly: [
      { period: 'Q1 2024', value: 15000, target: 12000 },
      { period: 'Q2 2024', value: 22000, target: 18000 },
      { period: 'Q3 2024', value: 18500, target: 20000 },
      { period: 'Q4 2024', value: 28000, target: 25000 }
    ],
    annually: [
      { period: '2021', value: 45000, target: 40000 },
      { period: '2022', value: 62000, target: 55000 },
      { period: '2023', value: 78000, target: 70000 },
      { period: '2024', value: 83500, target: 80000 }
    ]
  };

  // Alternate data for toggling
  const alternateAnnualData = [
    { period: '2021', value: 30000, target: 40000 },
    { period: '2022', value: 70000, target: 55000 },
    { period: '2023', value: 50000, target: 70000 },
    { period: '2024', value: 90000, target: 80000 }
  ];

  const [showAlternate, setShowAlternate] = useState(false);

  // Pie chart data for Skincare
  const skincarePieData = [
    { label: 'Moisturizers', value: 40, color: '#be185d' }, // dark pink
    { label: 'Lipcare', value: 25, color: '#db2777' }, // dark pink
    { label: 'Conditioners', value: 20, color: '#a21caf' }, // dark pink
    { label: 'Serums', value: 10, color: '#9d174d' }, // dark pink
    { label: 'Others', value: 5, color: '#831843' }, // dark pink
  ];

  const makeupProductList = [
    'Eyeshadows',
    'Concealers',
    'Blush',
    'Highlighter',
    'Mascara',
    'Lipsticks',
  ];

  const PieChart = ({ data, size = 80, strokeWidth = 18 }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let cumulative = 0;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
        {data.map((slice, i) => {
          const startAngle = (cumulative / total) * 2 * Math.PI;
          const endAngle = ((cumulative + slice.value) / total) * 2 * Math.PI;
          const x1 = size / 2 + (size / 2 - strokeWidth / 2) * Math.cos(startAngle - Math.PI / 2);
          const y1 = size / 2 + (size / 2 - strokeWidth / 2) * Math.sin(startAngle - Math.PI / 2);
          const x2 = size / 2 + (size / 2 - strokeWidth / 2) * Math.cos(endAngle - Math.PI / 2);
          const y2 = size / 2 + (size / 2 - strokeWidth / 2) * Math.sin(endAngle - Math.PI / 2);
          const largeArc = slice.value / total > 0.5 ? 1 : 0;
          const pathData = [
            `M ${x1} ${y1}`,
            `A ${size / 2 - strokeWidth / 2} ${size / 2 - strokeWidth / 2} 0 ${largeArc} 1 ${x2} ${y2}`
          ].join(' ');
          cumulative += slice.value;
          return (
            <path
              key={i}
              d={pathData}
              fill="none"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    );
  };

  const HoverPreview = ({ category, isVisible, side, className, style }) => (
    <div
      className={`absolute z-50 top-1/2 ${
        side === 'left'
          ? 'right-full mr-4 -translate-y-1/2'
          : 'left-full ml-4 -translate-y-1/2'
      } transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none'
      } ${className}`}
      style={style}
    >
      <div className={`bg-gradient-to-br ${category.hoverColor} rounded-xl p-4 shadow-xl backdrop-blur-sm border border-white/20`} style={{ width: '100%', height: '100%' }}>
        {/* Skincare floating divs */}
        {category.name === 'Skincare' && (
          <div className="flex flex-col justify-center items-center h-full w-full gap-4">
            {/* Loved by Customers bar (left) */}
            {side === 'left' && (
              <>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1 w-full">
                    <span className="text-xs font-medium text-pink-700">Loved by Customers</span>
                    <span className="text-xs font-semibold text-pink-700">92%</span>
                  </div>
                  <div className="w-full bg-pink-100 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-pink-400 to-rose-400 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1 w-full">
                    <span className="text-xs font-medium text-rose-700">Our ratings in skincare</span>
                    <span className="text-xs font-semibold text-rose-700">4.8/5</span>
                  </div>
                  <div className="w-full bg-rose-100 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-rose-400 to-pink-400 h-2.5 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </>
            )}
            {/* Pie chart for right side only */}
            {side === 'right' && (
              <div className="flex flex-col items-center w-full mt-2">
                <span className="text-xs font-medium text-pink-700 mb-2">Our Products Usage</span>
                <PieChart data={skincarePieData} size={80} strokeWidth={18} />
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {skincarePieData.map((slice, i) => (
                    <div key={i} className="flex items-center space-x-1">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ background: slice.color }}></span>
                      <span className="text-xs text-gray-700">{slice.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {/* Makeup right floating div: product list */}
        {category.name === 'Makeup' && side === 'right' && (
          <div className="flex flex-col items-center h-full w-full gap-2">
            <span className="text-xs font-medium text-amber-700 mb-2">Popular Makeup Products</span>
            <ul className="w-full text-left space-y-1">
              {makeupProductList.map((item, i) => (
                <li key={i} className="text-xs bg-amber-100 rounded px-2 py-1 text-amber-800 shadow-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Haircare right floating div: total products delivered (centered, not random) */}
        {category.name === 'Haircare' && side === 'right' && (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <span className="text-lg font-bold text-rose-700 mb-1">Total products delivered:</span>
            <span className="text-2xl font-extrabold text-rose-900">1135</span>
          </div>
        )}
      </div>
    </div>
  );

  const RippleButton = ({ children, className, onClick }) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter(r => r.id !== id));
      }, 400);
      if (onClick) onClick(e);
    };

    return (
      <button className={`relative overflow-hidden ${className}`} onClick={handleClick}>
        {children}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full animate-btn-ripple"
            style={{
              left: ripple.x - 18,
              top: ripple.y - 18,
              width: 36,
              height: 36,
              background: 'rgba(255,255,255,0.45)',
              opacity: 0.7,
            }}
          />
        ))}
        <style>{`
          @keyframes btn-ripple {
            0% { transform: scale(0.2); opacity: 0.7; }
            70% { transform: scale(1.1); opacity: 0.35; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          .animate-btn-ripple {
            animation: btn-ripple 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
          }
        `}</style>
      </button>
    );
  };

  // Show 4 brands at a time, alternate every 3 seconds, and animate slide/fade
  const [testimonialSet, setTestimonialSet] = useState(0); // 0: first 4, 1: next 4
  const [slideDirection, setSlideDirection] = useState('right');
  const [isSliding, setIsSliding] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection(testimonialSet === 0 ? 'right' : 'left');
      setIsSliding(true);
      setTimeout(() => {
        setTestimonialSet((prev) => (prev === 0 ? 1 : 0));
        setIsSliding(false);
      }, 400); // animation duration
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonialSet]);

  // RippleArea: mouse-move water ripple effect
  const RippleArea = () => {
    const [ripples, setRipples] = useState([]);
    const areaRef = useRef(null);

    // Color palette for ripples
    const colors = [
      'rgba(236, 72, 153, 0.35)', // pink-500
      'rgba(244, 63, 94, 0.35)',  // rose-500
      'rgba(251, 191, 36, 0.30)', // amber-400
      'rgba(190, 24, 93, 0.32)',  // dark pink
      'rgba(219, 39, 119, 0.32)', // dark rose
      'rgba(253, 164, 175, 0.28)',// light pink
    ];

    const handleMouseMove = (e) => {
      const rect = areaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 60 + Math.random() * 60; // 60-120px
      setRipples((prev) => [...prev, { x, y, id, color, size }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter(r => r.id !== id));
      }, 900);
    };

    return (
      <div
        ref={areaRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-2xl mx-auto h-64 bg-gradient-to-r from-pink-100 to-amber-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden cursor-pointer border-2 border-pink-200 dark:border-gray-700 shadow-lg"
        style={{ userSelect: 'none' }}
      >
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full animate-ripple-adv"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              background: ripple.color,
              boxShadow: `0 0 16px 4px ${ripple.color}, 0 0 32px 8px ${ripple.color}`,
              filter: 'blur(1.5px)',
              opacity: 0.8,
            }}
          />
        ))}
        <style>{`
          @keyframes ripple-adv {
            0% { transform: scale(0.2); opacity: 0.8; }
            60% { transform: scale(1.1); opacity: 0.5; }
            100% { transform: scale(2.3); opacity: 0; }
          }
          .animate-ripple-adv {
            animation: ripple-adv 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          }
        `}</style>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 bg-clip-text text-transparent mb-2">
              Radiance Beauty
            </h1>
            <p className="text-gray-600">Discover Your Inner Glow</p>
          </div>
          
          <div className="w-80 bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          
          <div className="text-2xl font-semibold text-gray-700">
            {loadingProgress}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 animate-scale-in">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes floatY {
          0% { transform: translateY(-50%) translateY(0); }
          50% { transform: translateY(-50%) translateY(-12px); }
          100% { transform: translateY(-50%) translateY(0); }
        }
        
        @keyframes floatX {
          0% { transform: translateX(0); }
          50% { transform: translateX(18px); }
          100% { transform: translateX(0); }
        }
        
        .floatY {
          animation: floatY 1.6s ease-in-out infinite;
        }
        
        .floatX {
          animation: floatX 1.8s ease-in-out infinite;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .testimonial-slide {
          transition: opacity 0.4s, transform 0.4s;
          opacity: 1;
          transform: translateX(0);
        }
        .testimonial-slide.slide-out-left {
          opacity: 0;
          transform: translateX(-60px);
          pointer-events: none;
        }
        .testimonial-slide.slide-out-right {
          opacity: 0;
          transform: translateX(60px);
          pointer-events: none;
        }
        .testimonial-slide.slide-in-left {
          opacity: 1;
          transform: translateX(-60px);
        }
        .testimonial-slide.slide-in-right {
          opacity: 1;
          transform: translateX(60px);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent dark:text-white">
                Radiance Beauty
              </h1>
            </div>
            
            <div className="hidden md:block">
              <div className="flex space-x-8">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Dark mode toggle button */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />}
            </button>
            
            <button
              className="md:hidden ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-pink-500 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section
        ref={sectionRefs.home}
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-16 opacity-0 translate-y-10 transition-all duration-800 dark:bg-transparent"
      >
        <div
          className="max-w-4xl mx-auto text-center rounded-2xl shadow-xl relative overflow-hidden"
          style={{
            backgroundImage: "url('https://img.freepik.com/free-vector/pink-silk-cloth-texture_107791-5362.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 pointer-events-none" />
          <div className="relative z-10 p-8 md:p-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Discover Your{' '}
              <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 bg-clip-text text-transparent dark:from-pink-400 dark:via-rose-400 dark:to-amber-400">
                Radiance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Unleash your natural beauty with our curated collection of premium{' '}
              <span className="relative group"
                onMouseEnter={() => setHoveredCategory('Skincare')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <span className="cursor-pointer text-pink-500 font-semibold hover:text-pink-600 transition-colors">
                  Skincare
                </span>
                {/* Two floating previews for Skincare, random position/size, different float direction */}
                <HoverPreview
                  category={productCategories[0]}
                  isVisible={hoveredCategory === 'Skincare'}
                  side="left"
                  className={hoveredCategory === 'Skincare' ? 'floatY' : ''}
                  style={hoveredCategory === 'Skincare' ? {
                    top: `calc(50% + ${skincareFloatProps.left.top}px)`,
                    left: `calc(-220% + ${skincareFloatProps.left.left}px)`,
                    width: skincareFloatProps.left.width,
                    height: skincareFloatProps.left.height,
                    position: 'absolute',
                    zIndex: 50
                  } : {}}
                />
                <HoverPreview
                  category={productCategories[0]}
                  isVisible={hoveredCategory === 'Skincare'}
                  side="right"
                  className={hoveredCategory === 'Skincare' ? 'floatX' : ''}
                  style={hoveredCategory === 'Skincare' ? {
                    top: `calc(50% + ${skincareFloatProps.right.top}px)`,
                    left: `calc(220% + ${skincareFloatProps.right.left}px)`,
                    width: skincareFloatProps.right.width,
                    height: skincareFloatProps.right.height,
                    position: 'absolute',
                    zIndex: 50
                  } : {}}
                />
              </span>
              {', '}
              <span className="relative group"
                onMouseEnter={() => setHoveredCategory('Makeup')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <span className="cursor-pointer text-amber-500 font-semibold hover:text-amber-600 transition-colors">
                  Makeup
                </span>
                {/* One floating preview for Makeup */}
                <HoverPreview
                  category={productCategories[1]}
                  isVisible={hoveredCategory === 'Makeup'}
                  side="right"
                  className={hoveredCategory === 'Makeup' ? 'floatY' : ''}
                  style={{}}
                />
              </span>
              {', '}
              <span className="relative group"
                onMouseEnter={() => setHoveredCategory('Haircare')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <span className="cursor-pointer text-rose-500 font-semibold hover:text-rose-600 transition-colors">
                  Haircare
                </span>
                {/* One floating preview for Haircare */}
                <HoverPreview
                  category={productCategories[2]}
                  isVisible={hoveredCategory === 'Haircare'}
                  side="right"
                  className={hoveredCategory === 'Haircare' ? 'floatY' : ''}
                  style={{}}
                />
              </span>
              {', and '}
              <span className="relative group">
                <span className="cursor-pointer text-pink-400 font-semibold hover:text-pink-500 transition-colors">
                  Fragrance
                </span>
                {/* No hover preview for Fragrance */}
              </span>
              {' products.'}
            </p>
            
            <RippleButton
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
              onClick={() => {}}
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-5 w-5" />
            </RippleButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={sectionRefs.testimonials}
        id="testimonials"
        className="py-20 px-4 opacity-0 translate-y-10 transition-all duration-800 dark:bg-transparent"
        onMouseEnter={() => setIsTestimonialHovered(true)}
        onMouseLeave={() => setIsTestimonialHovered(false)}
      >
        <div className="max-w-6xl mx-auto relative">
          <div className={`transition-all duration-500 ${isTestimonialHovered ? 'blur-sm' : ''}`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-amber-400">
              Trusted by Beauty Brands Worldwide
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {testimonials.slice(testimonialSet * 4, testimonialSet * 4 + 4).map((testimonial, index) => (
                <div
                  key={testimonial.company}
                  className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg transition-all duration-500 testimonial-slide ${isSliding ? (slideDirection === 'right' ? 'slide-out-left' : 'slide-out-right') : ''}`}
                >
                  <img
                    src={testimonial.logo}
                    alt={testimonial.company}
                    className="w-full h-16 object-contain mb-4"
                  />
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isTestimonialHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <button className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Meet Our Customers
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        ref={sectionRefs.products}
        id="products"
        className="py-20 px-4 opacity-0 translate-y-10 transition-all duration-800 dark:bg-transparent"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-amber-400">
            Our Signature Collection
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
              >
                <div className="p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500/20 to-amber-500/20 text-pink-300 text-sm rounded-full dark:from-pink-400/20 dark:to-amber-400/20">
                      {product.category}
                    </span>
                    
                    <h3 className="text-xl font-semibold text-white dark:text-gray-100">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-300 dark:text-gray-300 text-sm">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent dark:from-pink-300 dark:to-amber-300">
                        {product.price}
                      </span>
                      
                      <RippleButton className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2" onClick={() => {}}>
                        <ShoppingBag className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section
        ref={sectionRefs.analytics}
        id="analytics"
        className="py-20 px-4 opacity-0 translate-y-10 transition-all duration-800 dark:bg-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-amber-400">
              Our Impact & Growth
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Transforming beauty experiences across the globe
            </p>
            <button
              className="mt-6 bg-gradient-to-r from-pink-500 to-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                if (sectionRefs.products.current) {
                  sectionRefs.products.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Explore Our Products
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-center mb-8">
              <button
                className="px-6 py-2 rounded-full transition-all duration-300 bg-gradient-to-r from-pink-500 to-amber-500 text-white font-semibold hover:shadow-lg"
                onClick={() => setShowAlternate((prev) => !prev)}
              >
                {showAlternate ? 'Annually' : 'Quarterly'}
              </button>
            </div>
            {/* Growth Bar Graph */}
            <div className="mb-12">
              <div className="flex items-end justify-between h-80 space-x-4 w-full max-w-3xl mx-auto">
                {(showAlternate ? alternateAnnualData : analyticsData.annually).map((data, idx, arr) => {
                  const barColor = idx % 2 === 0 ? 'bg-pink-600' : 'bg-rose-500';
                  const maxValue = Math.max(...arr.map(d => d.value));
                  const barHeight = Math.max(24, (data.value / maxValue) * 280);
                  return (
                    <div key={data.period} className="flex-1 flex flex-col items-center justify-end">
                      <div className="relative w-full max-w-16 mb-2 flex flex-col items-center justify-end">
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 px-2 py-1 rounded text-xs font-bold text-gray-800 dark:text-gray-100 shadow">
                          {data.value.toLocaleString()}
                        </span>
                        <div
                          className={`${barColor} rounded-lg transition-all duration-1000 ease-out w-8`}
                          style={{ height: `${barHeight}px` }}
                        ></div>
                       </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-2">
                        {data.period}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Legend */}
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded bg-pink-600"></span>
                  <span className="text-xs text-gray-700 dark:text-gray-200">Even Years</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded bg-rose-500"></span>
                  <span className="text-xs text-gray-700 dark:text-gray-200">Odd Years</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 text-center">
                <Users className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Happy Customers</h3>
                <p className="text-2xl font-bold text-pink-600">50K+</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center">
                <Award className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Beauty Awards</h3>
                <p className="text-2xl font-bold text-amber-600">25+</p>
              </div>
              
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 text-center">
                <Heart className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Products Loved</h3>
                <p className="text-2xl font-bold text-rose-600">100+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ripple Effect Demo Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-pink-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 text-center">
        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">Ripple Effect</h2>
        <RippleArea />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent dark:from-pink-300 dark:to-amber-300">
                Radiance Beauty
              </h3>
              <p className="text-gray-300 dark:text-gray-400">
                Discover your inner glow with our premium beauty products designed to enhance your natural radiance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Shop All</a></li>
                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Gift Sets</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <p className="text-gray-300 mb-4">
                Stay updated with our latest products and beauty tips.
              </p>
              <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 dark:text-gray-500">
              © 2024 Radiance Beauty. All rights reserved. Designed with love for beautiful souls.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
