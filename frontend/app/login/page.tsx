"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap, Briefcase, Building2 } from "lucide-react";
import { useAuth, MOCK_USERS, ROLE_HOME, type Role } from "@/lib/auth-context";
import { LogoWordmark } from "@/components/bauhaus/GeometricLogo";

const ROLE_ICONS: Record<Role, React.ReactNode> = {
  student: <GraduationCap size={18} />,
  candidate: <Briefcase size={18} />,
  employer: <Building2 size={18} />,
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok && res.user) router.push(ROLE_HOME[res.user.role]);
    else setError(res.error ?? "Login failed");
  }

  function quickLogin(role: Role) {
    const acc = MOCK_USERS.find((u) => u.role === role)!;
    login(acc.email, acc.password);
    router.push(ROLE_HOME[role]);
  }

  return (
    <main className="flex min-h-screen">
      {/* Left color block */}
      <div className="relative hidden w-2/5 flex-col justify-between border-r-4 border-ink bg-blue p-10 lg:flex">
        <Link href="/">
          <LogoWordmark light />
        </Link>
        <div>
          <p className="text-label mb-4 text-yellow">Asia&apos;s Career Co-Pilot</p>
          <h1 className="text-display text-white">
            Career
            <br />
            First.
          </h1>
          <p className="mt-6 max-w-sm font-medium text-white/80">
            16 specialised AI agents. One living career profile. From first
            semester to senior role.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="h-6 w-6 rounded-full bg-yellow border-2 border-ink" />
          <div className="h-6 w-6 bg-red border-2 border-ink" />
          <div className="h-6 w-6 bg-white border-2 border-ink" />
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 inline-block lg:hidden">
            <LogoWordmark />
          </Link>
          <h2 className="text-heading mb-2">Log In</h2>
          <p className="mb-8 text-sm font-medium text-ink/60">
            Welcome back. Your co-pilot has been keeping watch.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-bauhaus" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                className="input-bauhaus"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label-bauhaus" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                className="input-bauhaus"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="border-2 border-ink bg-red px-4 py-2 text-xs font-bold uppercase text-white">
                {error}
              </p>
            )}

            <button type="submit" className="btn-blue w-full">
              Log In <ArrowRight size={16} />
            </button>
          </form>

          <div className="my-8 flex items-center gap-3">
            <div className="h-0.5 flex-1 bg-ink" />
            <span className="text-label text-ink/50">Demo accounts</span>
            <div className="h-0.5 flex-1 bg-ink" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(["student", "candidate", "employer"] as Role[]).map((role) => (
              <button
                key={role}
                onClick={() => quickLogin(role)}
                className="card-sm card-hover flex flex-col items-center gap-2 py-4 text-xs font-bold uppercase tracking-wide hover:bg-yellow"
              >
                {ROLE_ICONS[role]}
                {role}
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs font-medium text-ink/50">
            One-click login · password is <span className="font-bold">demo123</span>
          </p>

          <p className="mt-8 text-center text-sm font-medium">
            No account yet?{" "}
            <Link href="/register" className="font-bold text-blue underline underline-offset-4">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
