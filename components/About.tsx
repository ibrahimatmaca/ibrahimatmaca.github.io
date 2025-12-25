import React from 'react';
import { motion } from 'framer-motion';
import content from '../content.json';

const About: React.FC = () => {
  const techStack = [
    {
      name: 'Swift',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968371.png',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Flutter',
      icon: 'https://juststickers.in/wp-content/uploads/2019/01/flutter.png',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'Android',
      icon: 'https://logos-world.net/wp-content/uploads/2021/08/Android-Logo-2008-2014.png',
      color: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Kotlin',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Firebase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="about" className="container mx-auto px-4 py-24 scroll-mt-24">
       <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden backdrop-blur-sm">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
             {/* Header */}
             <div className="mb-8">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">{content.about.title}</h2>
             </div>

             {/* Bio Text + Stats Cards Side by Side */}
             <div className="grid lg:grid-cols-[1fr,auto] gap-8 mb-10">
                {/* Bio Text */}
                <div>
                   <div className="space-y-5 text-gray-400 leading-relaxed text-base md:text-lg">
                     {content.about.paragraphs.map((p, i) => (
                       <p key={i}>{p}</p>
                     ))}
                   </div>
                   <a href="#" className="inline-block mt-6 font-bold text-brand-400 text-lg hover:text-brand-300 transition-colors">
                      {content.about.education}
                   </a>
                </div>

                {/* Stats Cards - Vertical Stack on Right */}
                <div className="flex flex-col gap-4 lg:min-w-[280px]">
                   <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                      className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/50 hover:border-brand-500/30 transition-all duration-300"
                   >
                      <div className="text-4xl font-bold text-white mb-1 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        {content.about.stats.experience}
                      </div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Years Experience</div>
                   </motion.div>
                   
                   <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/50 hover:border-brand-500/30 transition-all duration-300"
                   >
                      <div className="text-3xl font-bold text-white mb-1 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        {content.about.stats.specialization}
                      </div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Specialization</div>
                   </motion.div>
                </div>
             </div>

             {/* Tech Stack - Full Width Below */}
             <div>
                <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                   {techStack.map((tech, index) => (
                     <motion.div
                       key={tech.name}
                       initial={{ opacity: 0, scale: 0.8 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: index * 0.1 }}
                       viewport={{ once: true }}
                       className="group relative bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300 flex flex-col items-center gap-2 hover:scale-105 cursor-default"
                     >
                       <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${tech.color} p-0.5 shadow-lg`}>
                         <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center p-2">
                           <img 
                             src={tech.icon} 
                             alt={tech.name}
                             className="w-full h-full object-contain"
                           />
                         </div>
                       </div>
                       <span className="text-xs font-semibold text-white text-center">{tech.name}</span>
                     </motion.div>
                   ))}
                </div>
             </div>

             {/* Mobile Development Badge */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               viewport={{ once: true }}
               className="mt-8 inline-flex items-center gap-3 bg-slate-800/60 border border-slate-700/50 px-6 py-4 rounded-2xl"
             >
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <div>
                 <div className="text-white font-bold text-lg">Mobile Development</div>
                 <div className="text-slate-400 text-sm">SwiftUI & Flutter Expertise</div>
               </div>
             </motion.div>
          </div>
       </div>
    </section>
  );
};

export default About;