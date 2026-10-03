import React from "react";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { RestaurantHome } from "@/components/home/RestaurantHome";
import { ToastContainer } from "@/components/ui/Toast";

export const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-[#E52E2E] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif text-xl font-bold">Hush Lush</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans selection:bg-[#E52E2E] selection:text-white">
      <ToastContainer />
      <div className="flex-1 w-full flex flex-col">
        {!isAuthenticated ? <LoginForm /> : <RestaurantHome />}
      </div>
    </div>
  );
};
