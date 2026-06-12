"use client";

import { useState } from "react";
import {
  Search,
  TrendingUp,
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  MessageSquare,
  EyeOff,
  Zap,
} from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { trajectoryMatches } from "@/lib/mock-data/employer";

// Extended mock profile data per candidate
const CANDIDATE_DETAILS: Record<string, {
  about: string;
  education: string;
  experience: string[];
  skills: string[];
  certifications: string[];
  portfolioHighlight: string;
  preferredRoles: string[];
  openToWork: boolean;
}> = {
  cand_001: {
    about: "Final-year CS student at UTM with a CGPA of 3.4. Has shipped 3 web apps with real users — unusual for a pre-grad. Proactively learning Next.js and TypeScript outside coursework.",
    education: "Bachelor of Computer Science · UTM · Expected Dec 2026 · CGPA 3.4",
    experience: ["Freelance Frontend Developer (6 months) — built e-commerce site for SME client", "UTM ACM Chapter — led 3 React workshops for 60+ students"],
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "Git", "Figma"],
    certifications: ["AWS Cloud Practitioner (in progress)", "MUET Band 4"],
    portfolioHighlight: "CareerOS dashboard — deployed Next.js app with 200+ active users",
    preferredRoles: ["Junior Frontend Developer", "Full-Stack Developer"],
    openToWork: true,
  },
  cand_002: {
    about: "Self-taught developer who learned React in 6 months through projects, not courses. TVET background at Kolej Vokasional — brings a pragmatic, build-first mindset. Learning velocity in top 10% of tracked candidates.",
    education: "Diploma in Information Technology · Kolej Vokasional Shah Alam · 2024 · CGPA 3.6",
    experience: ["Personal projects — 3 deployed apps including a local hawker food ordering system with 80 daily active users", "Part-time web dev for family business"],
    skills: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "CSS"],
    certifications: ["Udemy Full-Stack Bootcamp (Certificate)", "MUET Band 3"],
    portfolioHighlight: "HawkerGo — food ordering app with 80 DAU, built solo in 3 months",
    preferredRoles: ["Junior Developer", "Software Engineer"],
    openToWork: true,
  },
  cand_003: {
    about: "QA Engineer at an e-commerce startup who is actively transitioning to automation engineering. Has been building CI/CD pipelines and writing Playwright tests in their own time. Production-ready for an SDET role.",
    education: "Bachelor of Software Engineering · USM · 2022 · CGPA 3.1",
    experience: ["QA Engineer · Zalora Malaysia (1.5 years) — manual testing, bug reporting, test case management", "Side project — automated regression suite with Playwright for an open-source project (300 GitHub stars)"],
    skills: ["Playwright", "JavaScript", "Python", "Selenium", "GitHub Actions", "CI/CD", "JIRA"],
    certifications: ["ISTQB Foundation Level", "AWS Cloud Practitioner"],
    portfolioHighlight: "Open-source Playwright automation suite — 200 test cases, 95% coverage",
    preferredRoles: ["SDET / Automation Engineer", "QA Lead"],
    openToWork: true,
  },
};

export default function TalentSearchPage() {
  const [query, setQuery] = useState("React developer, junior to mid, KL or remote");
  const [saved, setSaved] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-blue">The Headhunter · TrajectoryMatchAgent</p>
      <h1 className="text-heading mb-2">
        Search by Trajectory<span className="text-yellow">.</span>
      </h1>
      <p className="mb-2 max-w-2xl text-sm font-medium text-ink/60">
        Keyword filters miss where people are <span className="font-bold text-ink">heading</span>.
        The Headhunter ranks candidates by growth curve, not just CV history.
      </p>
      <p className="mb-4 text-xs font-bold text-ink/40 uppercase tracking-wide">
        Open to all industries — IT, Finance, Healthcare, Operations, Education, and more.
      </p>

      {/* Differentiator callout */}
      <div className="mb-8 flex items-start gap-3 border-2 border-ink bg-ink p-4 text-white">
        <EyeOff size={16} className="mt-0.5 shrink-0 text-yellow" />
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-yellow">What Jobstreet &amp; LinkedIn miss</p>
          <p className="mt-1 text-sm font-medium text-white/80">
            Keyword filters exclude candidates who don&apos;t write &ldquo;React Developer, 3 years&rdquo; on their CV.
            CareerLuhh ranks by <strong className="text-white">growth curve</strong> — surfacing TVET graduates, career switchers,
            and self-taught builders whose trajectory predicts your next great hire.
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-8 flex gap-3">
        <input
          className="input-bauhaus flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe who you need…"
        />
        <button className="btn-blue px-5">
          <Search size={16} />
        </button>
      </div>

      <div className="space-y-6">
        {trajectoryMatches.map((c) => {
          const detail = CANDIDATE_DETAILS[c.candidateId];
          const isOpen = expanded === c.candidateId;

          return (
            <AgentCard
              key={c.candidateId}
              agentName={`Trajectory ${c.trajectoryScore}`}
              codeName={`Readiness ${c.readinessScore}/100`}
              status={c.trajectoryScore >= 85 ? "complete" : "running"}
              accent={c.trajectoryScore >= 85 ? "blue" : "yellow"}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {c.university.toLowerCase().includes("tvet") && (
                      <span className="flex items-center gap-1 border-2 border-yellow bg-yellow px-2 py-0.5 text-[10px] font-black uppercase text-ink">
                        <EyeOff size={9} /> Keyword-invisible · CareerLuhh only
                      </span>
                    )}
                    {c.currentRole.toLowerCase().includes("self-taught") && (
                      <span className="flex items-center gap-1 border-2 border-red bg-red px-2 py-0.5 text-[10px] font-black uppercase text-white">
                        <Zap size={9} /> Non-traditional · high velocity
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-black uppercase">{c.name}</h2>
                  <p className="mb-3 font-bold text-blue">
                    {c.currentRole} · {c.university}
                  </p>
                  <p className="text-sm font-medium text-ink/70">{c.trajectorySummary}</p>
                  <p className="mt-3 flex items-start gap-1.5 text-sm font-bold text-red">
                    <TrendingUp size={14} className="mt-0.5 shrink-0" /> {c.matchReason}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleSave(c.candidateId)}
                    className={saved.includes(c.candidateId) ? "btn-yellow px-4 py-2 text-xs" : "btn-white px-4 py-2 text-xs"}
                  >
                    {saved.includes(c.candidateId) ? (
                      <><Check size={14} /> Shortlisted</>
                    ) : (
                      <><Bookmark size={14} /> Shortlist</>
                    )}
                  </button>
                  <button
                    className="flex items-center gap-1.5 border-2 border-ink/30 px-4 py-2 text-xs font-bold uppercase hover:bg-canvas"
                  >
                    <MessageSquare size={13} /> Message
                  </button>
                </div>
              </div>

              {/* Expand toggle */}
              <button
                onClick={() => setExpanded(isOpen ? null : c.candidateId)}
                className="mt-4 flex w-full items-center justify-between border-t border-ink/10 pt-3 text-xs font-black uppercase tracking-wide text-ink/50 hover:text-blue"
              >
                <span>{isOpen ? "Hide full profile" : "View full profile"}</span>
                {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>

              {isOpen && detail && (
                <div className="mt-4 space-y-5 border-t-2 border-ink pt-4">
                  {/* About */}
                  <p className="text-sm font-medium leading-relaxed text-ink/70 border-l-4 border-yellow pl-3">
                    {detail.about}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Education */}
                    <div>
                      <p className="text-label mb-2 flex items-center gap-1.5">
                        <GraduationCap size={13} /> Education
                      </p>
                      <p className="text-sm font-semibold text-ink/70">{detail.education}</p>
                    </div>

                    {/* Open to work */}
                    <div>
                      <p className="text-label mb-2 flex items-center gap-1.5">
                        <Briefcase size={13} /> Status
                      </p>
                      <span className={`agent-badge ${detail.openToWork ? "agent-badge-complete" : "agent-badge-idle"}`}>
                        {detail.openToWork ? "Open to opportunities" : "Not actively looking"}
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {detail.preferredRoles.map((r) => (
                          <span key={r} className="border border-ink/20 px-1.5 py-0.5 text-[10px] font-bold uppercase">{r}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <p className="text-label mb-2 flex items-center gap-1.5">
                      <Briefcase size={13} /> Experience
                    </p>
                    <ul className="space-y-1.5">
                      {detail.experience.map((e) => (
                        <li key={e} className="flex items-start gap-2 text-sm font-medium text-ink/70">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-label mb-2 flex items-center gap-1.5">
                      <Code size={13} /> Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {detail.skills.map((s) => (
                        <span key={s} className="border-2 border-ink px-2 py-0.5 text-[10px] font-black uppercase">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  {detail.certifications.length > 0 && (
                    <div>
                      <p className="text-label mb-2 flex items-center gap-1.5">
                        <Award size={13} /> Certifications
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {detail.certifications.map((cert) => (
                          <span key={cert} className="border border-yellow bg-yellow/10 px-2 py-0.5 text-[10px] font-bold uppercase">{cert}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Portfolio */}
                  <div className="border-2 border-ink bg-canvas p-3">
                    <p className="text-label mb-1 text-blue">Portfolio highlight</p>
                    <p className="text-sm font-semibold">{detail.portfolioHighlight}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => toggleSave(c.candidateId)}
                      className={`flex items-center gap-1.5 border-2 border-ink px-5 py-2.5 text-xs font-black uppercase ${
                        saved.includes(c.candidateId) ? "bg-yellow" : "hover:bg-yellow"
                      }`}
                    >
                      {saved.includes(c.candidateId) ? <><Check size={13} /> Shortlisted</> : <><Bookmark size={13} /> Add to shortlist</>}
                    </button>
                    <button className="flex items-center gap-1.5 border-2 border-ink bg-blue px-5 py-2.5 text-xs font-black uppercase text-white hover:bg-blue/80">
                      <MessageSquare size={13} /> Send message
                    </button>
                  </div>
                </div>
              )}
            </AgentCard>
          );
        })}
      </div>
    </div>
  );
}
