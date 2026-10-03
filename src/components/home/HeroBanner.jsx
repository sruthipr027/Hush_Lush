import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    title: "UAE New Year Promo",
    subtitle: "From March 1 to April 1",
    tag: "SPECIAL OFFER",
    bgImage: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Weekend Biryani Feast",
    subtitle: "Buy 2 Biryanis, Get 1 Beverage Free",
    tag: "LIMITED EDITION",
    bgImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Flame Grilled Chops",
    subtitle: "Signature Black Pepper Glaze 20% Off",
    tag: "CHEF'S PICK",
    bgImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80",
  },
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full h-48 sm:h-56 md:h-72 rounded-2xl overflow-hidden shadow-lg border border-gray-100 my-3 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
            {slide.tag && (
              <span className="inline-block px-2.5 py-0.5 bg-[#E52E2E] text-white text-[10px] font-black tracking-wider uppercase rounded-md w-fit mb-1.5 shadow-sm">
                {slide.tag}
              </span>
            )}
            <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md">
              {slide.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 font-medium drop-shadow-sm mt-0.5">
              {slide.subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 right-4 flex items-center gap-1.5 z-10">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx
                ? "w-5 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
