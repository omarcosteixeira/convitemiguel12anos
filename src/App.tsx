/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { ChevronLeft, Gift, Play, Pause, Music } from "lucide-react";

export default function App() {
  const [[currentPage, direction], setPageWithDirection] = useState([1, 0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback error:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const paginate = (newPage: number) => {
    setPageWithDirection([newPage, newPage > currentPage ? 1 : -1]);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 antialiased flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto w-full relative">
        
        {/* Mini Music Player */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isPlaying ? 'bg-zinc-800 text-white animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
              <Music size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Música</p>
              <p className="text-xs font-bold text-gray-700 truncate max-w-[150px]">Tocando agora</p>
            </div>
          </div>
          
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-all active:scale-90 cursor-pointer shadow-md"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} className="ml-0.5" fill="currentColor" />}
          </button>

          <audio 
            ref={audioRef}
            src="/audio/musica.mp3"
            loop
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </motion.div>

        <div className="relative overflow-hidden min-h-[600px] flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {currentPage === 1 ? (
              <motion.section
                key="page1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full bg-white p-2 sm:p-4 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 relative group"
              >
                <div className="relative w-full h-0 pb-[150%] rounded-2xl overflow-hidden bg-gray-50">
                  <iframe
                    loading="lazy"
                    className="absolute inset-0 w-full h-full border-none"
                    src="https://www.canva.com/design/DAHPZTkxHq0/IRRzcqGC_wAHWZF3fGWPpQ/view?embed"
                    allowFullScreen
                    allow="fullscreen"
                    title="Convite de Aniversário - Página 1"
                  />
                  
                  {/* Clickable Overlay over the "SUGESTÃO" graphic area */}
                  <div 
                    onClick={() => paginate(2)}
                    className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[80%] h-[12%] cursor-pointer z-30 flex items-center justify-center"
                    title="Clique para ver sugestões"
                  >
                    {/* Optional: subtle pulse effect to hint interactivity */}
                    <div className="w-full h-full bg-white/0 hover:bg-white/10 rounded-full transition-all duration-300" />
                  </div>
                </div>
              </motion.section>
            ) : (
              <motion.section
                key="page2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full bg-white p-2 sm:p-4 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
              >
                <div className="relative w-full h-0 pb-[150%] rounded-2xl overflow-hidden bg-gray-50">
                  <iframe
                    loading="lazy"
                    className="absolute inset-0 w-full h-full border-none"
                    src="https://www.canva.com/design/DAHPZ_fxcRI/EyHA2Uo3SbSK7mS47FgPdA/view?embed"
                    allowFullScreen
                    allow="fullscreen"
                    title="Convite de Aniversário - Página 2"
                  />

                  {/* Clickable Overlay over the "VOLTAR" graphic area on Page 2 */}
                  <div 
                    onClick={() => paginate(1)}
                    className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[80%] h-[12%] cursor-pointer z-30 flex items-center justify-center"
                    title="Clique para voltar ao convite"
                  >
                    <div className="w-full h-full bg-white/0 hover:bg-white/5 rounded-full transition-all duration-300" />
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === 1 ? "bg-zinc-800 w-4" : "bg-gray-300"}`} />
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === 2 ? "bg-zinc-800 w-4" : "bg-gray-300"}`} />
          </div>

          <div className="flex items-center justify-center w-full min-h-[60px]">
            {currentPage === 2 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => paginate(1)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-600 shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer font-bold uppercase text-sm tracking-wider"
              >
                <ChevronLeft size={18} />
                Voltar ao Convite
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
