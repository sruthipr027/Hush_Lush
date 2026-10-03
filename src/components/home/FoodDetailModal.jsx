import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Clock, Star, Minus, Plus, ShoppingBag } from "lucide-react";

export const FoodDetailModal = () => {
  const { selectedFoodItem, setSelectedFoodItem, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  if (!selectedFoodItem) return null;

  const handleAdd = () => {
    addToCart(selectedFoodItem, quantity, instructions);
    setSelectedFoodItem(null);
    setQuantity(1);
    setInstructions("");
  };

  const totalPrice = (selectedFoodItem.price * quantity).toFixed(2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100"
        >
          <div className="relative h-56 sm:h-64 bg-gray-100">
            <img
              src={selectedFoodItem.image}
              alt={selectedFoodItem.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedFoodItem(null)}
              className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedFoodItem.code && (
              <span className="absolute bottom-3 left-3 bg-[#E52E2E] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                Item #{selectedFoodItem.code}
              </span>
            )}
          </div>

          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-extrabold text-gray-900 text-lg sm:text-xl">
                  {selectedFoodItem.name}
                </h2>
                <div className="text-right">
                  <span className="font-black text-[#E52E2E] text-lg sm:text-xl block">
                    ${selectedFoodItem.price.toFixed(2)}
                  </span>
                  {selectedFoodItem.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${selectedFoodItem.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-gray-600">
                {selectedFoodItem.rating && (
                  <span className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    {selectedFoodItem.rating}
                  </span>
                )}
                {selectedFoodItem.prepTime && (
                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    {selectedFoodItem.prepTime}
                  </span>
                )}
                {selectedFoodItem.spicyLevel && selectedFoodItem.spicyLevel > 0 ? (
                  <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                    <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                    Spicy Level {selectedFoodItem.spicyLevel}
                  </span>
                ) : null}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-b border-gray-100 py-3">
              {selectedFoodItem.description}
            </p>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Special Instructions
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Extra sauce, no onions, make it less spicy..."
                rows={2}
                className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E52E2E]/30"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-bold text-gray-800">Quantity</span>
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-bold text-sm text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 bg-[#E52E2E] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order — ${totalPrice}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
