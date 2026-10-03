import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, UtensilsCrossed, Check } from "lucide-react";

export const TableSelectorModal = () => {
  const { isTableModalOpen, setIsTableModalOpen, tableNumber, paxCount, setTableInfo } = useCart();
  const [selectedTable, setSelectedTable] = useState(tableNumber);
  const [selectedPax, setSelectedPax] = useState(paxCount);

  if (!isTableModalOpen) return null;

  const tables = Array.from({ length: 20 }, (_, i) => i + 1);
  const paxOptions = [1, 2, 3, 4, 5, 6, 8, 10];

  const handleSave = () => {
    setTableInfo(selectedTable, selectedPax);
    setIsTableModalOpen(false);
  };

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
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-50 text-[#E52E2E] rounded-xl">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Select Table & Guests</h3>
            </div>
            <button
              onClick={() => setIsTableModalOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Table Number
            </label>
            <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1">
              {tables.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTable(t)}
                  className={`py-2 rounded-xl text-sm font-bold transition-all relative ${
                    selectedTable === t
                      ? "bg-[#E52E2E] text-white shadow-md scale-105"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200/60"
                  }`}
                >
                  {t}
                  {selectedTable === t && (
                    <span className="absolute -top-1 -right-1 bg-white text-[#E52E2E] rounded-full p-0.5 shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              Party Size (PAX)
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {paxOptions.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPax(p)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedPax === p
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {p} PAX
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-[#E52E2E] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Confirm Table {selectedTable} ({selectedPax} PAX)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
