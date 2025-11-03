import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
  gender?: "Male" | "Female" | "Other";
  dob?: string;
  address?: string;
  avatarUrl?: string;
}

type UsersTable = Record<
  string,
  {
    pass: string;
    profile?: Omit<UserProfile, "email">;
  }
>;

export interface AuthState {
  user?: UserProfile;
  isLoggedIn: boolean;

  tempEmail?: string;

  users: UsersTable;

  setTempEmail: (email: string) => void;
  registerLocal: (email: string, pass: string) => void;

  completeProfile: (profile: Omit<UserProfile, "email">) => void;

  loginLocal: (email: string, pass: string) => boolean;
  logout: () => void;

  updateProfile: (profile: Omit<UserProfile, "email">) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: undefined,
      isLoggedIn: false,
      tempEmail: undefined,
      users: {},

      setTempEmail: (email) => set({ tempEmail: email }),
      registerLocal: (email, pass) => {
        const users = { ...get().users };
        users[email] = { pass, profile: users[email]?.profile };
        set({ users });
      },

      completeProfile: (profile) => {
        const email = get().tempEmail ?? "";
        const users = { ...get().users };

        if (!users[email]) users[email] = { pass: "" };
        users[email].profile = profile;

        set({
          users,
          user: { email, ...profile },
          isLoggedIn: true,
          tempEmail: undefined,
        });
      },

      loginLocal: (email, pass) => {
        const row = get().users[email];
        if (!row) return false;
        const ok = row.pass === pass && !!row.pass;
        if (!ok) return false;

        if (row.profile) {
          set({ user: { email, ...row.profile }, isLoggedIn: true });
        } else {
          set({ isLoggedIn: true, tempEmail: email, user: undefined });
        }
        return true;
      },

      logout: () =>
        set({ user: undefined, isLoggedIn: false, tempEmail: undefined }),

      updateProfile: (profile) => {
        const email = get().user?.email;
        if (!email || !get().users[email]) return;

        const users = { ...get().users };
        users[email].profile = profile;

        set({
          users,
          user: { email, ...profile },
        });
      },
    }),
    { name: "kosai-auth" }
  )
);
