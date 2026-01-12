import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Load stored token on refresh
  const storedToken = localStorage.getItem("token");
  const storedEmail = localStorage.getItem("email");

  const [admin, setAdmin] = useState(
    storedToken ? { token: storedToken, email: storedEmail } : null
  );

  // Called after successful backend login
  const login = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setAdmin({ token, email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
