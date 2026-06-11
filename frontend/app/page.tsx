import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  Building2,
  Compass,
  ShieldCheck,
  Banknote,
  MapPin,
  Bot,
  Radar,
} from "lucide-react";
import { LogoWordmark, GeometricLogo } from "@/components/bauhaus/GeometricLogo";

const PORTALS = [
  {
    icon: <GraduationCap size={30} />,
    title: "Student Portal",
    color: "bg-blue text-white",
    desc: "Discover realistic career paths, audit your readiness, and land internships that actually convert to jobs.",
    agents: ["The Navigator", "The Auditor", "The Recruiter", "The Translator"],
  },
  {
    icon: <Briefcase size={30} />,
    title: "Candidate Portal",
    color: "bg-red text-white",
    desc: "Benchmark your salary, see your next 3 moves, and turn gig work into credentials employers respect.",
    agents: ["The Clerk", "The Analyst", "The Broker", "The Converter"],
  },
  {
    icon: <Building2 size={30} />,
    title: "Employer Portal",
    color: "bg-yellow text-ink",
    desc: "Hire by trajectory, not keywords. Spot flight risks early and re-engage the talent you almost hired.",
    agents: ["The Headhunter", "The Scout", "The Watcher", "The Diplomat"],
  },
];

const AGENTS = [
  { name: "The Navigator", job: "Maps realistic career path trees", icon: <Compass size={20} /> },
  { name: "The Auditor", job: "Scores how hireable you are right now", icon: <ShieldCheck size={20} /> },
  { name: "The Analyst", job: "Benchmarks your salary vs market", icon: <Banknote size={20} /> },
  { name: "The Planner", job: "Calculates city vs salary trade-offs", icon: <MapPin size={20} /> },
  { name: "The Scout", job: "Flags talent keyword filters miss", icon: <Radar size={20} /> },
  { name: "The Advisor", job: "Nudges you before deadlines bite", icon: <Bot size={20} /> },
];

const SDGS = [
  { num: "4", label: "Quality Education" },
  { num: "8", label: "Decent Work & Growth" },
  { num: "10", label: "Reduced Inequalities" },
  { num: "17", label: "Partnerships" },
];

export default function LandingPage() {
  return (
    <main>
      {/* ---------- Navbar ---------- */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b-4 border-ink bg-white px-5 py-4 md:px-10">
        <Link href="/">
          <LogoWordmark />
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-bold uppercase tracking-wider underline-offset-4 hover:underline sm:block"
          >
            Log In
          </Link>
          <Link href="/register" className="btn-red px-4 py-2 text-xs">
            Get Started
          </Link>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="grid border-b-4 border-ink lg:grid-cols-[1.2fr_1fr]">
        <div className="bg-white px-5 py-16 md:px-10 md:py-24">
          <span className="agent-badge-running mb-6">
            Talentbank Hackathon 2026 · Stage 1 Prototype
          </span>
          <h1 className="text-display mb-6">
            Career First<span className="text-red">.</span>
            <br />
            Everything
            <br />
            Else Later<span className="text-blue">.</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg font-medium text-ink/70">
            Across Asia, careers are built alone — no map, no signal, no
            co-pilot. CareerLuhh is the answer: 16 specialised AI agents on one
            living career profile, from first semester to senior role.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/register" className="btn-blue">
              Choose Your Portal <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="btn-ghost">
              Try Demo Accounts
            </Link>
          </div>
        </div>

        {/* Blue right panel with geometric composition */}
        <div className="relative hidden items-center justify-center overflow-hidden border-l-4 border-ink bg-blue lg:flex">
          <div className="absolute left-10 top-10 h-24 w-24 rounded-full border-4 border-ink bg-yellow" />
          <div className="absolute bottom-16 right-12 h-32 w-32 border-4 border-ink bg-red" />
          <div className="absolute right-24 top-24 h-0 w-0 border-l-[50px] border-r-[50px] border-b-[86px] border-l-transparent border-r-transparent border-b-white" />
          <div className="rotate-[-4deg] border-4 border-ink bg-white p-6 shadow-hard-lg">
            <p className="text-label mb-2 text-red">The Advisor says</p>
            <p className="max-w-[240px] text-sm font-bold leading-snug">
              &ldquo;Graduation is 4 months away. You need one deployed project
              before you apply. Start this weekend.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Stats bar ---------- */}
      <section className="grid grid-cols-2 border-b-4 border-ink bg-yellow md:grid-cols-4">
        {[
          ["16", "AI Agents"],
          ["3", "Portals, 1 Profile"],
          ["MY", "Malaysia-First"],
          ["4", "SDGs Aligned"],
        ].map(([num, label]) => (
          <div
            key={label}
            className="border-ink px-6 py-8 text-center [&:not(:last-child)]:md:border-r-4 odd:border-r-4 md:odd:border-r-4"
          >
            <p className="text-4xl font-black md:text-5xl">{num}</p>
            <p className="text-label mt-1">{label}</p>
          </div>
        ))}
      </section>

      {/* ---------- Three portals ---------- */}
      <section className="border-b-4 border-ink bg-canvas px-5 py-16 md:px-10 md:py-24">
        <p className="text-label mb-3 text-red">Three portals · One shared career profile</p>
        <h2 className="text-heading mb-12 max-w-2xl">
          Your portal grows with you — student to senior, never start from scratch.
        </h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {PORTALS.map((p) => (
            <div key={p.title} className="card card-hover">
              <span className={`mb-5 inline-block border-2 border-ink p-3 ${p.color}`}>
                {p.icon}
              </span>
              <h3 className="mb-3 text-xl font-black uppercase">{p.title}</h3>
              <p className="mb-5 text-sm font-medium leading-relaxed text-ink/70">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.agents.map((a) => (
                  <span
                    key={a}
                    className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Agent showcase (dark) ---------- */}
      <section className="border-b-4 border-ink bg-ink px-5 py-16 text-white md:px-10 md:py-24">
        <p className="text-label mb-3 text-yellow">The agent system</p>
        <h2 className="text-heading mb-4 max-w-3xl">One agent. One job. Zero fluff.</h2>
        <p className="mb-12 max-w-xl font-medium text-white/60">
          Instead of one chatbot that does everything badly, CareerLuhh runs 16
          specialised agents — each with a single responsibility, all reading and
          writing to your living career profile.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <div
              key={a.name}
              className="border-2 border-white/20 p-5 transition-colors hover:border-yellow"
            >
              <span className="mb-3 inline-block border-2 border-white/40 p-2 text-yellow">
                {a.icon}
              </span>
              <p className="font-black uppercase tracking-wide">{a.name}</p>
              <p className="mt-1 text-sm font-medium text-white/60">{a.job}</p>
            </div>
          ))}
        </div>
        <p className="text-label mt-10 text-white/40">
          + 10 more agents across all three portals
        </p>
      </section>

      {/* ---------- SDG section (red) ---------- */}
      <section className="border-b-4 border-ink bg-red px-5 py-16 text-white md:px-10 md:py-20">
        <p className="text-label mb-3 text-yellow">Built for impact</p>
        <h2 className="text-heading mb-10">Aligned with 4 UN SDGs</h2>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {SDGS.map((s) => (
            <div key={s.num} className="border-4 border-ink bg-white p-5 text-ink shadow-hard">
              <p className="text-4xl font-black">SDG {s.num}</p>
              <p className="text-label mt-2">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl font-medium text-white/85">
          MUET to CEFR translation, gig-work credentialing, and rural-vs-city
          salary planning — levelling the field for TVET grads, gig workers, and
          rural youth across Malaysia.
        </p>
      </section>

      {/* ---------- CTA banner (yellow) ---------- */}
      <section className="flex flex-col items-center border-b-4 border-ink bg-yellow px-5 py-16 text-center md:py-20">
        <GeometricLogo size={56} />
        <h2 className="text-heading mt-6 mb-4 max-w-2xl">
          Stop guessing your career. Start navigating it.
        </h2>
        <Link href="/register" className="btn-red mt-2">
          Get Started — It&apos;s a Demo, Click Around <ArrowRight size={16} />
        </Link>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="flex flex-col items-center justify-between gap-4 bg-ink px-5 py-8 text-white md:flex-row md:px-10">
        <LogoWordmark light />
        <p className="text-xs font-medium text-white/50">
          Stage 1 prototype · Talentbank First Cohort Tech Hackathon 2026 · All
          data shown is dummy data
        </p>
      </footer>
    </main>
  );
}
