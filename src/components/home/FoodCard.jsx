import React from "react";
import { useCart } from "@/context/CartContext";
import { Plus, ArrowRight, Flame } from "lucide-react";

export const FoodCard = ({ item }) => {
  const { addToCart, setSelectedFoodItem } = useCart();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between group transition-shadow">
      <div className="relative w-full h-36 sm:h-44 overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
          {item.spicyLevel && item.spicyLevel > 0 ? (
            <span className="bg-black/60 backdrop-blur-xs text-white p-1 rounded-full text-xs shadow-xs" title={`Spicy Level: ${item.spicyLevel}`}>
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            </span>
          ) : null}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
          aria-label={`Add ${item.name} to cart`}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/40 hover:bg-[#E52E2E] backdrop-blur-md text-white flex items-center justify-center transition-colors shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between text-center sm:text-left">
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 leading-snug">
          {item.code ? `${item.code} ` : ""}
          {item.name}
        </h3>
      </div>

      <div
        onClick={() => setSelectedFoodItem(item)}
        className="cursor-pointer bg-[#FFF5F5] border-t border-red-100/60 px-3.5 py-2.5 flex items-center justify-between group/row hover:bg-red-100/60 transition-colors"
      >
        <span className="font-extrabold text-[#E52E2E] text-sm sm:text-base">
          ${item.price.toFixed(2)}
        </span>
        <button
          type="button"
          className="text-[#E52E2E] group-hover/row:translate-x-1 transition-transform p-0.5"
          aria-label="View food details"
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
