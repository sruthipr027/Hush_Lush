import React, { createContext, useContext, useState } from "react";
import { OrderSuccessModal } from "../components/cart/OrderSuccessModal";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState(13);
  const [paxCount, setPaxCount] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState("Chicken Chop");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Menu");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setTableInfo = (table, pax) => {
    setTableNumber(table);
    setPaxCount(pax);
    addToast(`Updated to Table ${table} (${pax} PAX)`, "info");
  };

  const addToCart = (item, quantity = 1, instructions = "") => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          specialInstructions: instructions || updated[existingIndex].specialInstructions,
        };
        return updated;
      }
      return [...prev, { item, quantity, specialInstructions: instructions }];
    });
    addToast(`Added ${item.name} to cart!`, "success");
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
    addToast("Item removed from cart", "info");
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const cartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  const placeOrder = async () => {
    if (cart.length === 0) return false;
    await new Promise((resolve) => setTimeout(resolve, 800));

    const totalWithTax = cartTotal * 1.05;
    const orderDetails = {
      orderId: "#HL-" + Math.floor(1000 + Math.random() * 9000),
      tableNumber,
      paxCount,
      itemCount: cartCount,
      totalAmount: totalWithTax,
    };

    clearCart();
    setIsCartOpen(false);
    setCompletedOrder(orderDetails);
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        tableNumber,
        paxCount,
        selectedCategory,
        searchQuery,
        activeNav,
        isCartOpen,
        isTableModalOpen,
        selectedFoodItem,
        toasts,
        completedOrder,
        setTableInfo,
        setSelectedCategory,
        setSearchQuery,
        setActiveNav,
        setIsCartOpen,
        setIsTableModalOpen,
        setSelectedFoodItem,
        setCompletedOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        addToast,
        removeToast,
        placeOrder,
      }}
    >
      {children}
      <OrderSuccessModal order={completedOrder} onClose={() => setCompletedOrder(null)} />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
