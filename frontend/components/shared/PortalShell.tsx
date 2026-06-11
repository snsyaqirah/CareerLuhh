"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Lock, Menu, Settings } from "lucide-react";
import { useAuth, type Role } from "@/lib/auth-context";
import { GeometricLogo } from "@/components/bauhaus/GeometricLogo";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  /** Stage 2 routes shown in nav but locked in the Stage 1 prototype */
  soon?: boolean;
}

const ROLE_LABEL: Record<Role, string> = {
  student: "🎓 Student",
  candidate: "💼 Candidate",
  employer: "🏢 Employer",
};

const ROLE_COLOR: Record<Role, string> = {
  student: "bg-blue text-white",
  candidate: "bg-red text-white",
  employer: "bg-yellow text-ink",
};

export function PortalShell({
  role,
  nav,
  children,
}: {
  role: Role;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== role)) router.replace("/login");
  }, [loading, user, role, router]);

  useEffect(() => setMobileOpen(false), [pathname]);

  if (loading || !user || user.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="agent-badge-running">Loading session…</span>
      </div>
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-ink text-white">
      <Link href="/" className="flex items-center gap-2.5 border-b-2 border-white/10 px-5 py-5">
        <GeometricLogo size={26} />
        <span className="font-black uppercase tracking-tight">
          Career<span className="text-yellow">Luhh</span>
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {nav.map((item) => {
          const active = pathname === item.href;
          if (item.soon) {
            return (
              <span
                key={item.href}
                className="flex cursor-not-allowed items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-white/30"
                title="Coming in Stage 2"
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                <Lock size={12} />
              </span>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-1 flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                active ? "bg-yellow text-ink" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t-2 border-white/10 p-4">
        <p className="mb-0.5 truncate text-sm font-bold">{user.name}</p>
        <p className="mb-3 truncate text-xs text-white/50">{user.email}</p>
        <div className="flex gap-2">
          <Link
            href={`/${role}/settings`}
            className="flex flex-1 items-center justify-center gap-1.5 border-2 border-white/30 px-2 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-white/10"
          >
            <Settings size={12} /> Settings
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex flex-1 items-center justify-center gap-1.5 border-2 border-white/30 px-2 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-red hover:border-red"
          >
            <LogOut size={12} /> Log Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 lg:block">{sidebar}</aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-60">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b-4 border-ink bg-white px-5 py-3">
          <button
            className="border-2 border-ink p-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <span className={`agent-badge ${ROLE_COLOR[role]} hidden sm:inline-flex`}>
            {ROLE_LABEL[role]} Portal
          </span>
          <span className="agent-badge-idle">
            <span className="h-2 w-2 rounded-full bg-red" />
            Stage 1 · Mock Data
          </span>
        </header>

        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
