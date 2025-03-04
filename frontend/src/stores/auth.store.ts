import { API_URL } from "@/api/axios.config";
import { User } from "@/types/user/entity.type";
import AuthService from "@/services/auth.service";
import axios from "axios";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await AuthService.signIn(email, password);
      localStorage.setItem("token", data.accessToken);
      set({ isAuthenticated: true, user: data.user, error: null });
    } catch (error) {
      set({ error: "Invalid credentials", isAuthenticated: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      await AuthService.signUp(username, email, password);
      set({ error: null });
    } catch (error) {
      set({ error: "Registration failed" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const { data: tokenData } = await axios.post<{ accessToken: string }>(
        `${API_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      localStorage.setItem("token", tokenData.accessToken);

      const { data: userData } = await axios.get<User>(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${tokenData.accessToken}` },
      });

      set({ user: userData, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem("token");
      set({ isAuthenticated: false, user: null });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
