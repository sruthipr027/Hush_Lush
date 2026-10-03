import React, { useState } from "react";
import { Header } from "./Header";
import { HeroBanner } from "./HeroBanner";
import { CategoryPills } from "./CategoryPills";
import { FoodGrid } from "./FoodGrid";
import { FoodDetailModal } from "./FoodDetailModal";
import { TableSelectorModal } from "./TableSelectorModal";
import { CartFloatingButton, CartDrawer } from "@/components/cart/CartDrawer";
import { BottomNav } from "./BottomNav";
import { AccountModal } from "@/components/account/AccountModal";
import { MoreModal } from "./MoreModal";

export const RestaurantHome = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 md:pb-12 text-gray-900 w-full relative">
      <Header onOpenAccount={() => setIsAccountOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <HeroBanner />
        <CategoryPills />
        <FoodGrid />
      </main>

      <CartFloatingButton />
      <CartDrawer />
      <FoodDetailModal />
      <TableSelectorModal />

      <AccountModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
      <MoreModal isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} />

      <div className="md:hidden">
        <BottomNav
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenMore={() => setIsMoreOpen(true)}
        />
      </div>

      <footer className="hidden md:block py-6 border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Hush Lush Technologies & Warely Pass. All rights reserved.</p>
          <div className="flex items-center gap-4 font-semibold text-gray-600">
            <button onClick={() => setIsMoreOpen(true)} className="hover:text-[#E52E2E]">Restaurant Info</button>
            <button onClick={() => setIsMoreOpen(true)} className="hover:text-[#E52E2E]">Terms & Privacy</button>
            <button onClick={() => setIsMoreOpen(true)} className="hover:text-[#E52E2E]">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
