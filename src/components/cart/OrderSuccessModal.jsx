import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Utensils, Clock, Sparkles, X } from "lucide-react";

export const OrderSuccessModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full p-6 sm:p-8 border border-gray-100 text-center overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-gray-300 hover:text-gray-600">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative my-2 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center shadow-inner"
            >
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
              <CheckCircle2 className="w-12 h-12 text-emerald-500 stroke-[2.2] relative z-10" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-1 mt-3"
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Order Confirmed!
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight pt-1">
              Sent to Kitchen
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto">
              Our chef is preparing your fresh meal for Table {order.tableNumber}.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="my-5 p-4 bg-gray-50/90 rounded-2xl border border-gray-100 text-left space-y-2.5 text-xs shadow-2xs"
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-200/70">
              <span className="text-gray-500 font-medium">Order Ticket ID</span>
              <span className="font-mono font-bold text-gray-900">{order.orderId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#E52E2E]" />
                Dining Table
              </span>
              <span className="font-bold text-gray-900">
                Table {order.tableNumber} ({order.paxCount} PAX)
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Dishes Ordered</span>
              <span className="font-bold text-gray-900">{order.itemCount} items</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200/70 text-sm font-extrabold text-gray-900">
              <span>Total Paid</span>
              <span className="text-[#E52E2E]">${order.totalAmount.toFixed(2)}</span>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 mb-5 bg-amber-50/80 border border-amber-100 p-2.5 rounded-xl">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Estimated Prep Time: <strong>15–20 Mins</strong></span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3.5 bg-[#E52E2E] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            Awesome, Got It!
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
