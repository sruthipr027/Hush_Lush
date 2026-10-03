import React from "react";

export const HushLushLogo = ({ variant = "full", className = "" }) => {
  if (variant === "badge") {
    return (
      <div className={`bg-white rounded-xl shadow-md border border-gray-100 p-2.5 flex items-center justify-center w-12 h-12 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#E52E2E]" fill="currentColor">
          <path d="M20 20 H30 V45 H70 V20 H80 V80 H70 V55 H30 V80 H20 Z" fill="#E52E2E" />
          <path d="M15 50 C25 25, 60 20, 85 30 C70 45, 50 40, 35 60 Z" fill="#E52E2E" opacity="0.85" />
          <path d="M30 40 C45 30, 75 35, 90 45 C75 55, 55 50, 40 70 Z" fill="#DC2626" opacity="0.9" />
        </svg>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-1.5 flex items-center justify-center w-8 h-8">
          <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#E52E2E]" fill="currentColor">
            <path d="M20 20 H30 V45 H70 V20 H80 V80 H70 V55 H30 V80 H20 Z" fill="#E52E2E" />
            <path d="M15 50 C25 25, 60 20, 85 30 C70 45, 50 40, 35 60 Z" fill="#E52E2E" />
          </svg>
        </div>
        <div>
          <span className="font-serif font-bold text-gray-900 text-lg tracking-tight block leading-none">
            Hush<span className="text-[#E52E2E]">Lush</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-3.5 ${className}`}>
      <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <path d="M 30 25 L 42 25 L 42 52 L 78 52 L 78 25 L 90 25 L 90 95 L 78 95 L 78 64 L 42 64 L 42 95 L 30 95 Z" fill="#DC2626" />
          <path d="M 42 83 L 102 83 L 102 95 L 42 95 Z" fill="#DC2626" />
          <path d="M 35 55 C 45 25, 85 15, 105 32 C 85 45, 65 42, 50 65 C 45 60, 38 58, 35 55 Z" fill="#EE2C2C" />
          <path d="M 50 38 C 65 22, 95 20, 110 38 C 92 48, 75 44, 60 70 Z" fill="#B91C1C" opacity="0.75" />
        </svg>
      </div>

      <div className="h-12 sm:h-14 w-[1.5px] bg-[#E52E2E] opacity-70"></div>

      <div className="flex flex-col justify-center text-left">
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Hush Lush
        </h1>
        <p className="text-[9px] sm:text-[10px] font-bold text-[#E52E2E] tracking-[0.2em] uppercase leading-none mt-1">
          ADVERTISING & TECHNOLOGIES
        </p>
      </div>
    </div>
  );
};
