import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { validateLoginForm } from "@/lib/validation";
import { HushLushLogo } from "@/components/ui/HushLushLogo";
import { TermsModal } from "./TermsModal";
import { Eye, EyeOff, Loader2, Send, Utensils, ShieldCheck, Sparkles, Key } from "lucide-react";
import { motion } from "framer-motion";

export const LoginForm = () => {
  const { login, loginAsGuest, isLoading } = useAuth();
  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalType, setModalType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateLoginForm(identifier, password, isPhoneMode);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await login(identifier);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setIsPhoneMode(false);
    setIdentifier("user@hushlush.com");
    setPassword("Password123!");
    setErrors({});
  };

  const handleSocialLogin = async (provider) => {
    setIsSubmitting(true);
    await login(`${provider.toLowerCase()}user@hushlush.com`);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md md:max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 grid grid-cols-1 md:grid-cols-2 min-h-[620px]"
      >
        <div className="hidden md:flex flex-col justify-between p-8 sm:p-10 bg-gradient-to-br from-gray-900 via-black to-red-950 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80')",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-red-300 border border-white/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#E52E2E]" />
              <span>Warely Pass Authentication</span>
            </div>
            <HushLushLogo variant="full" className="justify-start mb-6 text-white [&_h1]:text-white [&_p]:text-red-400" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white leading-tight">
              Seamless Ordering at Partnered Dining Venues.
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-3 leading-relaxed">
              Warely Pass grants access to instant digital menus, real-time table orders, and exclusive promotional offers.
            </p>
          </div>


        </div>

        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between w-full bg-white">
          <div>
            <div className="md:hidden mb-4 text-center">
              <HushLushLogo variant="full" />
              <p className="text-gray-500 text-xs max-w-xs mx-auto text-center leading-relaxed mt-3">
                Warely Pass Grants Access to Log in at any of Our Partnered Restaurants.
              </p>
            </div>

            <div className="hidden md:block mb-6">
              <h3 className="text-xl font-bold text-gray-900">Sign in to your account</h3>
              <p className="text-xs text-gray-500 mt-1">Enter your credentials or continue as a guest.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  {isPhoneMode ? "Mobile Number" : "Email"}
                </label>
                <input
                  type={isPhoneMode ? "tel" : "email"}
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errors.email || errors.phone) {
                      setErrors((prev) => ({ ...prev, email: undefined, phone: undefined }));
                    }
                  }}
                  placeholder={isPhoneMode ? "+971 50 123 4567" : "Mail ID"}
                  className={`w-full px-4 py-3 text-sm rounded-xl border ${
                    errors.email || errors.phone ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                  } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E52E2E]/30 focus:border-[#E52E2E] transition-all shadow-xs`}
                />
                {(errors.email || errors.phone) && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.email || errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }
                    }}
                    placeholder="Password"
                    className={`w-full px-4 py-3 pr-11 text-sm rounded-xl border ${
                      errors.password ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                    } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E52E2E]/30 focus:border-[#E52E2E] transition-all shadow-xs`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleFillDemoCredentials}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors bg-gray-100 px-2.5 py-1 rounded-lg"
                >
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                  Auto-fill Demo Credentials
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPhoneMode(!isPhoneMode);
                    setIdentifier("");
                    setErrors({});
                  }}
                  className="text-xs font-semibold text-[#E52E2E] hover:underline transition-all"
                >
                  {isPhoneMode ? "Use Email-ID Instead" : "Use Mobile Number Instead"}
                </button>
              </div>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-200 w-full"></div>
                <span className="bg-white px-3 text-xs text-gray-400 font-medium">Or</span>
                <div className="border-t border-gray-200 w-full"></div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Facebook")}
                  className="w-14 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all shadow-xs hover:scale-105 active:scale-95"
                  title="Log in with Facebook"
                >
                  <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin("Telegram")}
                  className="w-14 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all shadow-xs hover:scale-105 active:scale-95"
                  title="Log in with Telegram"
                >
                  <Send className="w-5 h-5 text-[#229ED9]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin("Google")}
                  className="w-14 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all shadow-xs hover:scale-105 active:scale-95"
                  title="Log in with Google"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                </button>
              </div>

              <p className="text-[11px] text-gray-500 text-center leading-normal pt-2">
                By ordering, You have Read and Agreement to Our{" "}
                <button
                  type="button"
                  onClick={() => setModalType("terms")}
                  className="text-[#E52E2E] font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Terms of Use
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => setModalType("privacy")}
                  className="text-[#E52E2E] font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Privacy Policy
                </button>
              </p>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full py-3.5 px-4 bg-[#E52E2E] hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => loginAsGuest()}
                  className="text-xs font-semibold text-gray-700 underline underline-offset-4 hover:text-[#E52E2E] transition-colors"
                >
                  Sign as Guest
                </button>
              </div>
            </form>
          </div>

          <div className="w-full pt-4 pb-1 text-center border-t border-gray-100/80 mt-6">
            <p className="text-[11px] text-gray-400 font-medium flex items-center justify-center gap-1">
              Powered By{" "}
              <span className="font-serif font-bold text-[#E52E2E] text-xs">
                Hush Lush
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      <TermsModal
        isOpen={!!modalType}
        type={modalType}
        onClose={() => setModalType(null)}
      />
    </div>
  );
};
