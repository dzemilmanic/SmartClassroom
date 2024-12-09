import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState({
    userId: null,
    token: null,
    role: null,
  });
  const [loading, setLoading] = useState(true); // Dodato za praćenje učitavanja

  useEffect(() => {
    // Retrieve from localStorage
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role")

    // Update state if data is found in localStorage
    if (storedUserId && storedToken && storedRole) {
      setAuthData({
        userId: storedUserId,
        token: storedToken,
        role: storedRole,
      });
    }
    setLoading(false); // Završeno učitavanje
  }, []);

  const login = (userId, token, role) => {
    setAuthData({ userId, token, role });
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setAuthData({ userId: null, token: null, role: null });
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const value = {
    ...authData, // Spread the state (userId, token,role)
    login,
    logout,
    loading, // Dodaj loading status
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
