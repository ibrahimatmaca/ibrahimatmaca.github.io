'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';

const HeroSection = () => {
  const typedRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    if (typedRef.current) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: [
          'Flutter Expert',
          'iOS & FinTech Specialist', 
          'Payment Systems Expert',
          'Team Leadership',
          'Mobile Architecture'
        ],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500
      });
    }

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const skills = [
    'Flutter', 'SwiftUI', 'Cloud Firestore', 'Payment Systems',
    'Team Leadership', 'MVVM', 'FinTech', 'MoneyPay'
  ];

  return (
    <section className="min-h-screen relative bg-transparent overflow-hidden py-8">
      {/* Matrix Background */}
      <div className="fixed inset-0 -z-10">
        <div className="matrix-rain" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center min-h-screen">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Content */}
            <motion.div 
              className="order-2 lg:order-1 space-y-8"
              variants={itemVariants}
            >
              {/* Name Headline */}
              <div className="relative">
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
                  variants={itemVariants}
                >
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent bg-300% animate-gradient-x">
                    İbrahim Atmaca
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 blur-lg opacity-30 animate-pulse-glow -z-10 rounded-lg" />
                </motion.h1>
              </div>

              {/* Role & Expertise */}
              <motion.h2 
                className="text-xl md:text-2xl font-normal text-gray-600 dark:text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                Senior Mobile Developer – 
                <span className="relative inline-block ml-2">
                  <span ref={typedRef} className="text-blue-600 font-semibold" />
                </span>
              </motion.h2>

              {/* Skills Badges */}
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={itemVariants}
              >
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-gray-200/20 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(37, 99, 235, 0.3)"
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* PR Intro Paragraph */}
              <motion.div variants={itemVariants}>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
                  As a Senior Mobile Developer at MoneyPay, I combine technical expertise with a deep passion for building seamless user experiences. My work empowers digital products in the finance and payment sectors, helping brands deliver secure, innovative solutions at scale.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <motion.a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Me
                </motion.a>
                
                <motion.a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Avatar & Status */}
            <motion.div 
              className="order-1 lg:order-2 flex flex-col items-center"
              variants={itemVariants}
            >
              <div className="relative mb-6">
                <div className="w-72 h-72 relative">
                  <img 
                    src="/img/intro-bg.jpg" 
                    alt="İbrahim Atmaca - Senior Mobile Developer"
                    className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 relative z-10"
                  />
                  
                  {/* Animated Glow */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur-xl opacity-40 animate-pulse-glow" />
                  
                  {/* Rotating Ring */}
                  <div className="absolute -inset-2 border-2 border-blue-600 rounded-full animate-spin-slow">
                    <div className="absolute -top-1 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-cyan-400/50" />
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-gray-200/20 rounded-full font-semibold text-gray-700 dark:text-gray-200"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                <span>Available for projects</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/10 text-4xl text-blue-600/30"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          { }
        </motion.div>
        <motion.div 
          className="absolute top-3/5 right-1/6 text-2xl opacity-40"
          animate={{ x: [-5, 15, -5] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          📱
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-1/6 text-2xl opacity-30"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          🚀
        </motion.div>
      </div>
    </section>
  );
};

// Tailwind CSS Utilities (add to your tailwind.config.js)
/*
module.exports = {
  content: ['./src/**\/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 4s ease infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.05)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      spacing: {
        '1/10': '10%',
        '1/6': '16.666667%',
      }
    },
  },
  plugins: [],
}
*/

export default HeroSection; 