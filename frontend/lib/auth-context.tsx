"use client";

// Stage 1 mock auth — hardcoded demo accounts, session in localStorage.
// Stage 2 replaces this with NextAuth.js v5.

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

export const MOCK_USERS: (SessionUser & { password: string })[] = [
  { email: "student@demo.com", password: "demo123", role: "student", name: "Aina Sofea" },
  { email: "candidate@demo.com", password: "demo123", role: "candidate", name: "Ahmad Faris" },
  { email: "employer@demo.com", password: "demo123", role: "employer", name: "TechNova Sdn Bhd" },
];

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
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "careerluhh_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // corrupted session — start fresh
    }
    setLoading(false);
  }, []);

  const persist = (u: SessionUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = useCallback((email: string, password: string) => {
    const found = MOCK_USERS.find(
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

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
