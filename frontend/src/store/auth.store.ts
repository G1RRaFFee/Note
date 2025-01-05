import AuthService from "@/services/auth.service";
import { create } from "zustand";

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuth: (isAuthenticated: boolean) => void;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  signIn: async (email, password) => {
    try {
      const response = await AuthService.signIn(email, password);
      console.log("SignIn: ", response);
      localStorage.setItem("token", response.data.accessToken);
      set({ isAuthenticated: true });
    } catch (error) {
      console.error("SignIn Error:", error);
      set({ isAuthenticated: false });
    }
  },

  signUp: async (username, email, password) => {
    try {
      const response = await AuthService.signUp(username, email, password);
      console.log("SignUp: ", response);
      localStorage.setItem("token", response.data.accessToken);
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
}));
