import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

const LOCAL_STORAGE_KEY = "hushlush_user_session";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to restore session", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const login = async (email) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const loggedUser = {
      id: "usr-" + Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0].replace(".", " "),
      email: email,
      isGuest: false,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    };

    saveUserSession(loggedUser);
    setIsLoading(false);
    return true;
  };

  const loginAsGuest = () => {
    const guestNumber = Math.floor(1000 + Math.random() * 9000);
    const guestUser = {
      id: `guest-${guestNumber}`,
      name: `Guest #${guestNumber}`,
      email: `guest${guestNumber}@hushlush.guest`,
      isGuest: true,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    };
    saveUserSession(guestUser);
  };

  const logout = () => {
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
