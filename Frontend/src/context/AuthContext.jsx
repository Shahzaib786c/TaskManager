import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextObject.js";
import { loginUser, registerUser, getMe } from "../api/authService.js";
import { getToken, setToken, removeToken } from "../utils/storage.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getMe();
        setUser(data.user);
      } catch {
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function login(credentials) {
    const data = await loginUser(credentials);
    setToken(data.token);
    setUser(data.user);
    return data;
  }
  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  async function register(formData) {
    return await registerUser(formData);
  }

  function logout() {
    removeToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
