import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopwave-user") || "null");
    } catch {
      return null;
    }
  });

  // Accepts either a string email OR a user object {email, name}
  const login = useCallback((emailOrUser, _password) => {
    let newUser;
    if (typeof emailOrUser === "string") {
      newUser = { email: emailOrUser, name: emailOrUser.split("@")[0] };
    } else {
      newUser = {
        email: emailOrUser.email,
        name: emailOrUser.name || emailOrUser.email.split("@")[0],
      };
    }
    setUser(newUser);
    try {
      localStorage.setItem("shopwave-user", JSON.stringify(newUser));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem("shopwave-user");
    } catch {}
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
