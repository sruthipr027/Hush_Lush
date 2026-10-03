import React from "react";
import { useCart } from "@/context/CartContext";
import { Store, BookOpen, User, MoreHorizontal } from "lucide-react";

export const BottomNav = ({ onOpenAccount, onOpenMore }) => {
  const { activeNav, setActiveNav } = useCart();

  const navItems = [
    { name: "Outlet", icon: Store, action: () => setActiveNav("Outlet") },
    { name: "Menu", icon: BookOpen, action: () => setActiveNav("Menu") },
    { name: "Account", icon: User, action: () => { setActiveNav("Account"); onOpenAccount(); } },
    { name: "More", icon: MoreHorizontal, action: () => { setActiveNav("More"); onOpenMore(); } },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around py-2.5 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.name;
          return (
            <button
              key={item.name}
              onClick={item.action}
              className={`flex flex-col items-center gap-1 transition-colors px-3 py-1 ${
                isActive ? "text-[#E52E2E]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              <span className={`text-[10px] font-bold ${isActive ? "text-[#E52E2E]" : "text-gray-500"}`}>
                {item.name}
              </span>
              {isActive && (
                <span className="w-8 h-0.5 bg-[#E52E2E] rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      <div className="w-full text-center pb-1.5 pt-0 bg-white">
        <p className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-1">
          Powered By <span className="font-serif font-bold text-[#E52E2E]">Hush Lush</span>
        </p>
      </div>
    </nav>
  );
};
