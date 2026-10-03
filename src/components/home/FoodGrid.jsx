import React from "react";
import { useCart } from "@/context/CartContext";
import { MOCK_FOOD_ITEMS } from "@/data/mockData";
import { FoodCard } from "./FoodCard";
import { SearchX, Utensils } from "lucide-react";

export const FoodGrid = () => {
  const { selectedCategory, searchQuery } = useCart();

  const filteredItems = MOCK_FOOD_ITEMS.filter((item) => {
    if (searchQuery.trim()) {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory === "For You") {
      return item.isPopular;
    }

    return item.category === selectedCategory;
  });

  if (filteredItems.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-gray-50/80 rounded-3xl border border-dashed border-gray-200 my-6">
        <div className="w-16 h-16 mx-auto mb-3 bg-red-50 rounded-full flex items-center justify-center text-[#E52E2E]">
          <SearchX className="w-8 h-8" />
        </div>
        <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1">No items found</h4>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
          We couldn't find any dishes matching "{searchQuery || selectedCategory}". Try searching for another item or category.
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-extrabold text-gray-900 text-base sm:text-xl flex items-center gap-2">
          <Utensils className="w-5 h-5 text-[#E52E2E]" />
          <span>{searchQuery ? `Results for "${searchQuery}"` : selectedCategory}</span>
        </h3>
        <span className="text-xs sm:text-sm text-gray-400 font-semibold bg-gray-100 px-3 py-1 rounded-full">
          {filteredItems.length} dishes available
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
