import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const data = localStorage.getItem("AUTH");
  const navigate = useNavigate();

  const [user, setUser] = useState(data ? JSON.parse(data) : null);
  //
  console.log("User", user);
  const updateUser = (payload) => {
    setUser(payload);
    localStorage.setItem(`AUTH`, JSON.stringify(payload));
  };
  const logoutUser = () => {
    localStorage.removeItem(`AUTH`);
    setUser(null);
  };
  const getDashboardURL = () => {
    if (user?.type) {
      switch (user?.type) {
        case "Admin":
          return "/admin";
        case "Super Admin":
          return "/superadmin";
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        updateUser,
        user,
        getDashboardURL,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
