import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, FileText } from "lucide-react";

export const TermsModal = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const isTerms = type === "terms";
  const title = isTerms ? "Terms of Use" : "Privacy Policy";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden border border-gray-100"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
              {isTerms ? (
                <FileText className="w-5 h-5 text-[#E52E2E]" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-[#E52E2E]" />
              )}
              <span>{title}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-200/60 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-4 text-sm text-gray-600 leading-relaxed">
            {isTerms ? (
              <>
                <p className="font-semibold text-gray-800">
                  Welcome to Warely Pass & Hush Lush Partnered Restaurant Ordering Services.
                </p>
                <p>
                  1. <strong>Guest & Account Access:</strong> By placing orders through Warely Pass, you accept responsibility for maintaining accurate contact details and table verification.
                </p>
                <p>
                  2. <strong>Ordering & Payment:</strong> Orders submitted are immediately routed to the restaurant kitchen. Payments are processed securely via verified Hush Lush gateways.
                </p>
                <p>
                  3. <strong>Promotions & Pricing:</strong> All promotional offers, discounts (e.g. UAE New Year Promo), and menu items are subject to availability and partner restaurant terms.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-gray-800">
                  Hush Lush Technologies Privacy Commitment
                </p>
                <p>
                  1. <strong>Data Collection:</strong> We collect minimal necessary data (Email address, order history, table location) to process food orders at partnered venues.
                </p>
                <p>
                  2. <strong>Guest Ordering Privacy:</strong> Guest sessions store transient cart data locally on your browser without selling personal information to third parties.
                </p>
                <p>
                  3. <strong>Security:</strong> All communications between your device and Hush Lush servers are protected using industry-standard SSL encryption.
                </p>
              </>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50/50">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#E52E2E] text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
