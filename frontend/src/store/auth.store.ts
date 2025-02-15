import { API_URL } from "@/api/axios.config";
import SignIn from "@/interface/auth/signin.interface";
import User from "@/interface/user/user.interface";
import AuthService from "@/services/auth.service";
import axios from "axios";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<SignIn>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuth: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  signIn: async (email, password) => {
    try {
      const { data } = await AuthService.signIn(email, password);
      localStorage.setItem("token", data.accessToken);
      set({ isAuthenticated: true, user: data.user });
      return data.accessToken;
    } catch (error) {
      console.error("SignIn Error:", error);
      set({ isAuthenticated: false });
    }
  },

  signUp: async (username, email, password) => {
    try {
      const response = await AuthService.signUp(username, email, password);
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      console.error("SignIn Error:", error);
      set({ isAuthenticated: false });
    }
  },

  logout: async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("SignIn Error:", error);
      set({ isAuthenticated: false });
    }
  },

  setUser: (user) => {
    set({ user });
  },

  setAuth: (isAuthenticated) => {
    set({ isAuthenticated });
  },

  checkAuth: async () => {
    try {
      const { data } = await axios.post<{ accessToken: string }>(
        `${API_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      localStorage.setItem("token", data.accessToken);
      set({ isAuthenticated: true });
    } catch (error) {
      console.log(error);
    }
  },
}));
