import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { HushLushLogo } from "@/components/ui/HushLushLogo";
import { Search, X, ShoppingCart, User as UserIcon, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = ({ onOpenAccount }) => {
  const { tableNumber, paxCount, setIsTableModalOpen, searchQuery, setSearchQuery, cartCount, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="sm:hidden">
            <HushLushLogo variant="badge" />
          </div>
          <div className="hidden sm:block">
            <HushLushLogo variant="compact" />
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md relative mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes, biryani, burgers, drinks..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E52E2E]/30 focus:border-[#E52E2E] transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="md:hidden flex-1 flex justify-center">
          {!isMobileSearchOpen ? (
            <button
              onClick={() => setIsTableModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200/80 transition-all text-gray-900 font-bold text-xs sm:text-sm shadow-2xs group"
            >
              <Utensils className="w-3.5 h-3.5 text-[#E52E2E]" />
              <span>Table {tableNumber} ({paxCount} PAX)</span>
              <span className="text-[10px] text-gray-400 group-hover:text-gray-600">▼</span>
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="w-full relative"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu..."
                  autoFocus
                  className="w-full pl-9 pr-8 py-2 text-xs bg-gray-100 border border-gray-200 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E52E2E]/40"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsTableModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200/80 transition-all text-gray-900 font-bold text-xs sm:text-sm shadow-2xs"
          >
            <Utensils className="w-4 h-4 text-[#E52E2E]" />
            <span>Table {tableNumber} ({paxCount} PAX)</span>
            <span className="text-[10px] text-gray-400">▼</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-2 bg-[#E52E2E] text-white hover:bg-red-700 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-[#E52E2E] px-1.5 py-0.5 rounded-full text-xs font-extrabold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs flex items-center gap-1.5 border border-gray-200/60"
            title="Account Profile"
          >
            <UserIcon className="w-4 h-4 text-gray-600" />
            <span className="hidden md:inline truncate max-w-[90px]">{user?.name}</span>
          </button>

          <button
            onClick={() => {
              setIsMobileSearchOpen(!isMobileSearchOpen);
              if (isMobileSearchOpen) setSearchQuery("");
            }}
            className="md:hidden p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-100"
            aria-label="Toggle mobile search"
          >
            {isMobileSearchOpen ? <X className="w-4 h-4 text-gray-600" /> : <Search className="w-4 h-4 text-gray-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
