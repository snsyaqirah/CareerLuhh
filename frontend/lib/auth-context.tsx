"use client";

// Stage 1 mock auth — demo accounts only, session in localStorage.
// Stage 2 replaces this with NextAuth.js v5 + bcrypt-hashed passwords in Neon DB.
// NEVER put real credentials here — this file ships in the client bundle.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Role = "student" | "candidate" | "employer";

export interface SessionUser {
  email: string;
  role: Role;
  name: string;
}

// Public-facing demo account hints (email + role only — no passwords)
export const DEMO_ACCOUNTS: { email: string; role: Role; name: string }[] = [
  { email: "student@demo.com", role: "student", name: "Aina Sofea" },
  { email: "candidate@demo.com", role: "candidate", name: "Ahmad Faris" },
  { email: "employer@demo.com", role: "employer", name: "TechNova Sdn Bhd" },
];

// Auth credentials — NOT exported. Stays internal to this module.
// Stage 2: replace with POST /api/auth/login → server-side bcrypt verify.
const AUTH_USERS = DEMO_ACCOUNTS.map((u) => ({ ...u, password: "demo123" }));

export const ROLE_HOME: Record<Role, string> = {
  student: "/student/dashboard",
  candidate: "/candidate/dashboard",
  employer: "/employer/dashboard",
};

interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string; user?: SessionUser };
  register: (name: string, email: string, role: Role) => SessionUser;
  updateProfile: (updates: { name?: string }) => void;
  deleteAccount: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "careerluhh_session_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SessionUser;
        // Basic sanity-check: ensure the stored object has the right shape
        if (parsed.email && parsed.role && parsed.name) setUser(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY); // corrupted — start fresh
    }
    setLoading(false);
  }, []);

  const persist = (u: SessionUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = useCallback((email: string, password: string) => {
    const found = AUTH_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!found || found.password !== password) {
      return { ok: false, error: "Invalid email or password. Try a demo account below." };
    }
    const session: SessionUser = { email: found.email, role: found.role, name: found.name };
    persist(session);
    return { ok: true, user: session };
  }, []);

  const register = useCallback((name: string, email: string, role: Role) => {
    const session: SessionUser = { email: email.trim(), role, name: name.trim() || "New User" };
    persist(session);
    return session;
  }, []);

  const logout = useCallback(() => persist(null), []);

  const updateProfile = useCallback((updates: { name?: string }) => {
    setUser((current) => {
      if (!current) return current;
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteAccount = useCallback(() => {
    // Remove all CareerLuhh data from localStorage
    ["applied_jobs", "saved_jobs", STORAGE_KEY].forEach((k) => localStorage.removeItem(k));
    // Also remove any keys with careerluhh prefix
    Object.keys(localStorage)
      .filter((k) => k.startsWith("careerluhh"))
      .forEach((k) => localStorage.removeItem(k));
    persist(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateProfile, deleteAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
