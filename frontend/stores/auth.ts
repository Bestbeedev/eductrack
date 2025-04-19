import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  username: string;
  role: string;
  telephone: string;
  adresse?: string;
  matiere?: string;
  matricule?:string;
  ecoleId?:string;
}

type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      setUser: (user, token) => set({ user, token }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      logout: () => {
        fetch("/api/auth/logout", { method: "POST" });
        set({ user: null, token: null });
      }   
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
