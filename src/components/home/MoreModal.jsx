import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Store, PhoneCall, HelpCircle, FileText, Info } from "lucide-react";

export const MoreModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const options = [
    { label: "Restaurant Location & Hours", icon: Store, desc: "Dubai Mall Food Court, Floor 2" },
    { label: "Contact Restaurant Host", icon: PhoneCall, desc: "+971 4 800 4874" },
    { label: "Dining Help & Support", icon: HelpCircle, desc: "Instant assistance with your order" },
    { label: "Terms & Privacy Policy", icon: FileText, desc: "Warely Pass & Hush Lush policies" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-gray-100 flex flex-col gap-4 overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-[#E52E2E]" />
              More Options
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.label}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-100/80 flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <div className="p-2.5 bg-white text-[#E52E2E] rounded-xl shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{opt.label}</h4>
                    <p className="text-[11px] text-gray-500">{opt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-900 text-white font-bold text-xs rounded-xl hover:bg-black transition-colors mt-1"
          >
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
