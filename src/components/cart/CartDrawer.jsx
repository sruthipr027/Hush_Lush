import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Trash2, Plus, Minus, Loader2 } from "lucide-react";

export const CartFloatingButton = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <motion.button
      onClick={() => setIsCartOpen(true)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-20 right-5 z-40 w-14 h-14 bg-gray-900 hover:bg-[#E52E2E] text-white rounded-full shadow-2xl flex items-center justify-center transition-colors border-2 border-white"
      aria-label="View Shopping Cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#E52E2E] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md">
          {cartCount}
        </span>
      )}
    </motion.button>
  );
};

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    tableNumber,
    paxCount,
    updateQuantity,
    removeFromCart,
    cartTotal,
    placeOrder,
  } = useCart();

  const [isOrdering, setIsOrdering] = useState(false);

  if (!isCartOpen) return null;

  const tax = cartTotal * 0.05;
  const grandTotal = cartTotal + tax;

  const handleCheckout = async () => {
    setIsOrdering(true);
    await placeOrder();
    setIsOrdering(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#E52E2E]" />
                Your Order Cart
              </h2>
              <p className="text-xs text-gray-500">
                Serving at <strong>Table {tableNumber}</strong> ({paxCount} PAX)
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-gray-200/60 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center text-gray-400 space-y-3">
                <ShoppingCart className="w-12 h-12 mx-auto stroke-1" />
                <p className="text-sm font-semibold text-gray-600">Your cart is empty</p>
                <p className="text-xs">Browse menu and add your favorite dishes</p>
              </div>
            ) : (
              cart.map((ci) => (
                <div
                  key={ci.item.id}
                  className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100/80 gap-3"
                >
                  <img
                    src={ci.item.image}
                    alt={ci.item.name}
                    className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                      {ci.item.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#E52E2E]">
                      ${(ci.item.price * ci.quantity).toFixed(2)}
                    </span>
                    {ci.specialInstructions && (
                      <p className="text-[10px] text-gray-500 truncate italic">
                        Note: {ci.specialInstructions}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white rounded-lg border border-gray-200 p-0.5 shadow-2xs">
                      <button
                        onClick={() => updateQuantity(ci.item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black font-bold text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-gray-900">
                        {ci.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(ci.item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black font-bold text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(ci.item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/80 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Tax (5%)</span>
                  <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-[#E52E2E]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isOrdering}
                className="w-full py-3.5 bg-[#E52E2E] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
              >
                {isOrdering ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <span>Confirm Order — ${grandTotal.toFixed(2)}</span>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
