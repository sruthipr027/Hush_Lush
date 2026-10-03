import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, User, ShieldAlert, Utensils, Mail } from "lucide-react";

export const AccountModal = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { tableNumber, paxCount } = useCart();

  if (!isOpen || !user) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-gray-100 flex flex-col gap-5 overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-[#E52E2E]" />
              Account Details
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <img
              src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#E52E2E]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-gray-900 text-base truncate">
                  {user.name}
                </h4>
                {user.isGuest && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex-shrink-0">
                    GUEST
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3 text-gray-400" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-3 bg-red-50/50 rounded-xl border border-red-100/60">
              <span className="text-gray-600 flex items-center gap-1.5 font-medium">
                <Utensils className="w-4 h-4 text-[#E52E2E]" />
                Current Table
              </span>
              <span className="font-extrabold text-gray-900">
                Table {tableNumber} ({paxCount} PAX)
              </span>
            </div>
            {user.isGuest && (
              <p className="text-[11px] text-amber-600 bg-amber-50 p-2.5 rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                You are browsing as a Guest. Log in with Email for order tracking & rewards.
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full py-3 bg-red-50 hover:bg-red-100 text-[#E52E2E] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>{user.isGuest ? "Exit Guest Mode" : "Log Out"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
