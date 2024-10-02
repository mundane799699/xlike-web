import { create } from "zustand";
import { User } from "@supabase/supabase-js";
type AuthStateStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useAuth = create<AuthStateStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
