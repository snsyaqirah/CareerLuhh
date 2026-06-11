"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap, Briefcase, Building2, Check } from "lucide-react";
import { useAuth, ROLE_HOME, type Role } from "@/lib/auth-context";
import { LogoWordmark } from "@/components/bauhaus/GeometricLogo";

const ROLES: { role: Role; title: string; desc: string; icon: React.ReactNode; color: string }[] = [
  {
    role: "student",
    title: "I'm a Student",
    desc: "Discover paths, build portfolio, find internships",
    icon: <GraduationCap size={28} />,
    color: "bg-blue text-white",
  },
  {
    role: "candidate",
    title: "I'm a Job Seeker",
    desc: "Job hunt smarter, benchmark salary, plan next move",
    icon: <Briefcase size={28} />,
    color: "bg-red text-white",
  },
  {
    role: "employer",
    title: "I'm an Employer",
    desc: "Find talent by trajectory, retain and re-engage",
    icon: <Building2 size={28} />,
    color: "bg-yellow text-ink",
  },
];

// Role-specific extra fields (Stage 1: collected but not stored anywhere real)
const EXTRA_FIELDS: Record<Role, { label: string; placeholder: string }[]> = {
  student: [
    { label: "University", placeholder: "e.g. UiTM Shah Alam" },
    { label: "Field of Study", placeholder: "e.g. Computer Science" },
  ],
  candidate: [
    { label: "Current / Last Role", placeholder: "e.g. Junior Software Engineer" },
    { label: "Years of Experience", placeholder: "e.g. 2" },
  ],
  employer: [
    { label: "Company Name", placeholder: "e.g. TechNova Sdn Bhd" },
    { label: "Industry", placeholder: "e.g. Software & IT Services" },
  ],
};

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pdpaConsent, setPdpaConsent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role || !pdpaConsent) return;
    register(name, email, role);
    router.push(ROLE_HOME[role]);
  }

  return (
    <main className="min-h-screen bg-canvas">
      <header className="flex items-center justify-between border-b-4 border-ink bg-white px-6 py-4">
        <Link href="/">
          <LogoWordmark />
        </Link>
        <Link href="/login" className="text-sm font-bold uppercase tracking-wider underline underline-offset-4">
          Log In
        </Link>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Step indicator */}
        <div className="mb-10 flex items-center gap-3">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center border-2 border-ink text-sm font-black ${
                  step >= s ? "bg-yellow" : "bg-white"
                }`}
              >
                {step > s ? <Check size={16} /> : s}
              </span>
              <span className="text-label">{s === 1 ? "Choose role" : "Your details"}</span>
              {s === 1 && <div className="h-0.5 w-10 bg-ink" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <h1 className="text-heading mb-2">Who are you?</h1>
            <p className="mb-8 text-sm font-medium text-ink/60">
              Your portal adapts to where you are in your career.
            </p>
            <div className="grid gap-5 md:grid-cols-3">
              {ROLES.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    setRole(r.role);
                    setStep(2);
                  }}
                  className="card card-hover flex flex-col items-start gap-4 text-left"
                >
                  <span className={`border-2 border-ink p-3 ${r.color}`}>{r.icon}</span>
                  <span className="text-lg font-black uppercase leading-tight">{r.title}</span>
                  <span className="text-sm font-medium text-ink/60">{r.desc}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && role && (
          <>
            <h1 className="text-heading mb-2">
              Almost there<span className="text-red">.</span>
            </h1>
            <p className="mb-8 text-sm font-medium text-ink/60">
              Registering as{" "}
              <button
                onClick={() => setStep(1)}
                className="font-bold text-blue underline underline-offset-4"
              >
                {role}
              </button>{" "}
              — Stage 1 demo: no real account is created.
            </p>
            <form onSubmit={handleSubmit} className="card max-w-lg space-y-5">
              <div>
                <label className="label-bauhaus" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  required
                  className="input-bauhaus"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                <input id="password" type="password" required className="input-bauhaus" placeholder="••••••••" />
              </div>
              {EXTRA_FIELDS[role].map((f) => (
                <div key={f.label}>
                  <label className="label-bauhaus">{f.label}</label>
                  <input className="input-bauhaus" placeholder={f.placeholder} />
                </div>
              ))}
              <button type="submit" className="btn-red w-full">
                Create Account <ArrowRight size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
