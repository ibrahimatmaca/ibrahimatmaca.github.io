import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import content from '../content.json';

const About: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Interaction Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const codeSnippet = [
    "import SwiftUI",
    "",
    "struct ContentView: View {",
    "    @State private var text = \"Hello, World!\"",
    "    @State private var count = 0",
    "",
    "    var body: some View {",
    "        VStack(spacing: 20) {",
    "            Text(text)",
    "                .font(.largeTitle)",
    "                .foregroundColor(.blue)",
    "",
    "            Button(action: {",
    "                count += 1",
    "                text = \"Button tapped \\(count) times\"",
    "            }) {",
    "                Text(\"Tap Me\")",
    "                    .padding()",
    "                    .background(Color.blue)",
    "                    .foregroundColor(.white)",
    "                    .cornerRadius(10)",
    "            }",
    "        }",
    "        .padding()",
    "    }",
    "}"
  ];

  return (
    <section id="about" className="container mx-auto px-4 py-20 scroll-mt-24">
       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
             {/* Text Content */}
             <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">{content.about.title}</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                  {content.about.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <p className="font-medium text-brand-400 pt-2">
                     {content.about.education}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                   <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                      <div className="text-2xl font-bold text-white mb-1">{content.about.stats.experience}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Years Exp</div>
                   </div>
                   <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                      <div className="text-2xl font-bold text-white mb-1">{content.about.stats.specialization}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Specialization</div>
                   </div>
                </div>
             </div>

             {/* 3D Visual Element */}
             <div className="h-full min-h-[300px] md:min-h-[400px] w-full flex items-center justify-center [perspective:1000px]">
                <motion.div
                   ref={cardRef}
                   onMouseMove={handleMouseMove}
                   onMouseLeave={handleMouseLeave}
                   style={{ 
                     rotateX, 
                     rotateY,
                     transformStyle: "preserve-3d"
                   }}
                   className="relative w-full h-full min-h-[300px] md:min-h-[400px] rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden shadow-2xl cursor-pointer"
                >
                   {/* Background Code - Deep Layer */}
                   <div 
                      className="font-mono text-[10px] sm:text-xs text-brand-300/60 p-6 w-full h-full overflow-hidden select-none flex flex-col justify-center absolute inset-0 bg-slate-900"
                      style={{ transform: "translateZ(0px)" }}
                   >
                      {codeSnippet.map((line, i) => (
                        <div key={i} className="whitespace-pre opacity-80 mb-0.5">
                           <span className="text-purple-400">{line.includes("struct") || line.includes("import") || line.includes("var") ? line.split(" ")[0] : ""}</span>
                           <span className="text-brand-200">{line.includes("struct") || line.includes("import") || line.includes("var") ? line.substring(line.indexOf(" ")) : line}</span>
                        </div>
                      ))}
                   </div>
                   
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 pointer-events-none"></div>
                   
                   {/* Floating Info - Foreground Layer */}
                   <div 
                      className="absolute bottom-8 left-8 right-8 z-20"
                      style={{ transform: "translateZ(40px)" }}
                   >
                       <motion.div 
                          className="bg-slate-800/90 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-lg inline-block mb-4"
                          initial={{ y: 0 }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                       >
                         <div className="text-white font-bold text-lg">{content.about.codeCard.title}</div>
                         <div className="text-gray-400 text-sm">{content.about.codeCard.subtitle}</div>
                       </motion.div>
                       
                       <div className="flex gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                          <div className="text-xs text-green-400 font-mono">{content.about.codeCard.status}</div>
                       </div>
                   </div>

                   {/* Tech Logos - Responsive Positioning */}
                   <div 
                      className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex flex-col gap-1.5 md:gap-2.5"
                      style={{ transform: "translateZ(20px)" }}
                   >
                      <div className="flex items-center gap-1.5 md:gap-2.5 px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 shadow-lg">
                         <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center shrink-0">
                            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968371.png" alt="Swift" className="w-full h-full object-contain" />
                         </div>
                         <span className="text-xs md:text-lg font-semibold text-slate-200 whitespace-nowrap">Swift</span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2.5 px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 shadow-lg">
                         <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center shrink-0">
                            <img src="https://juststickers.in/wp-content/uploads/2019/01/flutter.png" alt="Flutter" className="w-full h-full object-contain" />
                         </div>
                         <span className="text-xs md:text-lg font-semibold text-slate-200 whitespace-nowrap">Flutter</span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2.5 px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 shadow-lg">
                         <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center shrink-0">
                            <img src="https://logos-world.net/wp-content/uploads/2021/08/Android-Logo-2008-2014.png" alt="Android" className="w-full h-full object-contain" />
                         </div>
                         <span className="text-xs md:text-lg font-semibold text-slate-200 whitespace-nowrap">Android</span>
                      </div>
                   </div>

                </motion.div>
             </div>
          </div>
       </div>
    </section>
  );
};

export default About;