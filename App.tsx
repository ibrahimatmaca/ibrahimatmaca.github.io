import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import Support from './components/Support';
import ElevanaPrivacy from './components/privacy/ElevanaPrivacy';
import KidTalesPrivacy from './components/privacy/KidTalesPrivacy';
import GeneralPrivacy from './components/privacy/GeneralPrivacy';

const NotFound: React.FC = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Check if we came from 404.html
    const is404 = sessionStorage.getItem('is404');
    if (is404) {
      sessionStorage.removeItem('is404');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="text-center max-w-2xl relative z-10">
        {/* 404 Number with Glitch Effect */}
        <div className="relative mb-6">
          <div 
            className="text-[clamp(8rem,20vw,14rem)] font-bold font-mono bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-[shimmer_3s_linear_infinite]"
            style={{
              animation: 'shimmer 3s linear infinite, glitch 0.3s ease-in-out infinite',
              textShadow: '0 0 40px rgba(56, 189, 248, 0.5)'
            }}
          >
            404
          </div>
          <div 
            className="absolute inset-0 text-[clamp(8rem,20vw,14rem)] font-bold font-mono bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 bg-clip-text text-transparent blur-[30px] opacity-60 -z-10"
          >404</div>
        </div>
        
        <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold mb-4 animate-fade-in">
          Page Not Found
        </h1>
        <p className="text-gray-400 text-[clamp(1rem,2.5vw,1.25rem)] mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          The page you're looking for doesn't exist or has been moved.
          <br />
          Let's get you back on track.
        </p>
        
        {/* Modern Buttons */}
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <a 
            href="/" 
            className="group relative px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(14,165,233,0.5)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-125">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Go Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <button 
            onClick={() => window.history.back()} 
            className="group relative px-8 py-4 bg-slate-800/60 backdrop-blur-md text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-slate-800/90 hover:border-brand-400/50 border border-slate-700/50 hover:shadow-[0_12px_40px_rgba(56,189,248,0.2)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-125">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
              Go Back
            </span>
          </button>
        </div>
        
        {/* Code Snippet */}
        <div className="mt-12 p-6 bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-xl text-left font-mono text-sm text-gray-400 max-w-2xl mx-auto animate-fade-in hover:border-brand-400/50 transition-all duration-300" style={{ animationDelay: '0.6s' }}>
          <div className="mb-2"><span className="text-gray-500 italic">// Page not found</span></div>
          <div className="mb-2"><span className="text-purple-400 font-semibold">if</span> (<span className="text-green-400">'page'</span> === <span className="text-green-400">'not found'</span>) {'{'}</div>
          <div className="mb-2 ml-4"><span className="text-purple-400 font-semibold">return</span> <span className="text-green-400">'404'</span>;</div>
          <div className="mb-2">{'}'}</div>
          <div><span className="text-gray-500 italic">// Redirecting to home...</span></div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/support" element={<Support />} />
      <Route path="/elevana-privacy" element={<ElevanaPrivacy />} />
      <Route path="/kidtales-privacy" element={<KidTalesPrivacy />} />
      <Route path="/privacy-policy" element={<GeneralPrivacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};