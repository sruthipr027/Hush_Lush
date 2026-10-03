import React from "react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/mockData";

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory } = useCart();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 my-1 flex items-center gap-2.5 px-0.5">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-150 flex-shrink-0 ${
              isSelected
                ? "bg-[#E52E2E] text-white shadow-sm"
                : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200/80 shadow-2xs"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
