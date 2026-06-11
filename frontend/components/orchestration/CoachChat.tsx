"use client";

// Conversational layer over The Advisor (CoachAgent). Scripted Q&A in Stage 1,
// but grounded in the live shared Career Profile — so its answers reference what
// the other agents just wrote (consistency across agents). Stage 2: streamed
// Gemini responses reading the same profile.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Send, MessageCircle, ArrowRight } from "lucide-react";
import type { Role } from "@/lib/auth-context";
import type { CareerProfile } from "@/lib/orchestration";

interface QA {
  keywords: string[];
  answer: (p: CareerProfile) => string;
  action?: { label: string; url: string };
}

interface ChatMsg {
  from: "user" | "advisor";
  text: string;
  action?: { label: string; url: string };
}

const val = (p: CareerProfile, k: string, fallback: string) =>
  p[k] !== undefined ? String(p[k]) : fallback;

const SCRIPTS: Record<Role, { suggestions: string[]; qa: QA[]; greeting: string }> = {
  student: {
    greeting:
      "I've read your whole profile — paths, readiness, internships. Ask me anything about your next step.",
    suggestions: ["Am I ready to apply?", "Which path should I pick?", "Should I move to KL?"],
    qa: [
      {
        keywords: ["ready", "apply", "hireable", "job"],
        answer: (p) =>
          `The Auditor scored you ${val(p, "readinessScore", "62")}/100 (grade ${val(
            p,
            "readinessGrade",
            "B"
          )}). You're close, but you have no deployed project yet — ship one before you apply and that score clears 80.`,
        action: { label: "See readiness gaps", url: "/student/dashboard" },
      },
      {
        keywords: ["path", "career", "which", "pick", "choose"],
        answer: (p) =>
          `The Navigator ranked ${val(p, "pathsGenerated", "3")} paths for you — ${val(
            p,
            "topPath",
            "Frontend Developer"
          )} is the strongest at ${val(p, "topPathMatch", "87")}% match, driven by your interests and rising Next.js demand.`,
        action: { label: "Open roadmap", url: "/student/roadmap" },
      },
      {
        keywords: ["kl", "move", "relocate", "city", "remote", "location"],
        answer: (p) =>
          `The Planner ran the numbers: a remote role in ${val(
            p,
            "bestLocation",
            "Alor Setar"
          )} nets you RM${val(p, "netDisposable", "2100")}/month vs RM1,400 in KL. Prioritise remote-first roles.`,
        action: { label: "See Lokal Route", url: "/student/lokal" },
      },
    ],
  },
  candidate: {
    greeting:
      "Your resume's parsed and benchmarked. Ask me about pay, your next move, or which jobs to chase.",
    suggestions: ["Am I underpaid?", "What's my safest move?", "Which job should I take?"],
    qa: [
      {
        keywords: ["underpaid", "pay", "salary", "worth", "money"],
        answer: (p) =>
          `Yes — The Analyst found you're ${val(
            p,
            "salaryVerdict",
            "Underpaid"
          )} by RM${val(p, "salaryGap", "800")}/month against the KL market floor. Your annual review in 6 weeks is the window to fix it.`,
        action: { label: "See benchmark + script", url: "/candidate/salary" },
      },
      {
        keywords: ["safe", "move", "next", "progression"],
        answer: () =>
          `The Navigator's safe lane is Mid-level Frontend Developer (RM5,500–7,500) in 3–6 months — just add TypeScript and testing. Low risk, real salary jump.`,
        action: { label: "See all 3 moves", url: "/candidate/next-move" },
      },
      {
        keywords: ["job", "which", "take", "apply", "match"],
        answer: (p) =>
          `The Broker found ${val(p, "jobMatches", "3")} trajectory matches — top is Grab Malaysia at ${val(
            p,
            "topJobScore",
            "94"
          )}%. It fits your React + Node background and values your growth signal.`,
        action: { label: "See job matches", url: "/candidate/jobs" },
      },
    ],
  },
  employer: {
    greeting:
      "I've run talent, retention, and workforce analysis for your open role. Ask me who to hire or who's at risk.",
    suggestions: ["Who should I hire first?", "Anyone about to quit?", "What roles are at risk?"],
    qa: [
      {
        keywords: ["hire", "who", "candidate", "first", "best"],
        answer: (p) =>
          `The Headhunter ranks Nurul Ain bt Rosli highest — trajectory ${val(
            p,
            "topTrajectoryScore",
            "89"
          )}. Her Next.js/TypeScript velocity matches your Q3 timeline; hire now and she ramps in 3 months.`,
        action: { label: "Open talent search", url: "/employer/search" },
      },
      {
        keywords: ["quit", "leave", "risk", "retention", "flight"],
        answer: (p) =>
          `The Watcher flagged ${val(
            p,
            "flightRisks",
            "1"
          )} flight risk: Siti Hajar updated her LinkedIn and added skills unrelated to her role. Have a career conversation this week.`,
        action: { label: "See retention alert", url: "/employer/dashboard" },
      },
      {
        keywords: ["role", "automation", "future", "workforce", "plan"],
        answer: (p) =>
          `The Strategist found ${val(
            p,
            "riskRoles",
            "2"
          )} roles at high automation risk in 18 months — Manual QA and Data Entry. Recommend upskilling budget now over net-new hires.`,
        action: { label: "See workforce plan", url: "/employer/workforce" },
      },
    ],
  },
};

export function CoachChat({
  role,
  profile,
  ready,
}: {
  role: Role;
  profile: CareerProfile;
  ready: boolean;
}) {
  const script = SCRIPTS[role];
  const [messages, setMessages] = useState<ChatMsg[]>([
    { from: "advisor", text: script.greeting },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  function answerFor(q: string): ChatMsg {
    const lower = q.toLowerCase();
    const hit = script.qa.find((qa) => qa.keywords.some((k) => lower.includes(k)));
    if (hit) return { from: "advisor", text: hit.answer(profile), action: hit.action };
    return {
      from: "advisor",
      text: "I can speak to your readiness, paths, pay, job matches, retention, or workforce plan — try one of the suggestions below.",
    };
  }

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    setInput("");
    // small delay so it reads like the advisor is "thinking"
    setTimeout(() => setMessages((m) => [...m, answerFor(q)]), 450);
  }

  return (
    <div className="card">
      <div className="mb-4 flex items-center gap-2">
        <span className="border-2 border-ink bg-yellow p-2">
          <MessageCircle size={16} />
        </span>
        <div>
          <p className="font-black uppercase leading-tight">The Advisor · CoachAgent</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink/50">
            Conversational layer · grounded in shared memory
          </p>
        </div>
        <span className={`ml-auto ${ready ? "agent-badge-complete" : "agent-badge-idle"}`}>
          {ready ? "profile ready" : "waiting for pipeline"}
        </span>
      </div>

      {/* messages */}
      <div className="max-h-72 space-y-3 overflow-y-auto border-2 border-ink bg-canvas p-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] border-2 border-ink px-3 py-2 text-sm font-medium ${
                m.from === "user" ? "bg-blue text-white" : "bg-white"
              }`}
            >
              {m.text}
              {m.action && (
                <Link
                  href={m.action.url}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-blue underline underline-offset-2"
                >
                  {m.action.label} <ArrowRight size={12} />
                </Link>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {script.suggestions.map((s) => (
          <button
            key={s}
            onClick={() => ask(s)}
            className="border-2 border-ink bg-white px-2.5 py-1 text-xs font-bold transition-colors hover:bg-yellow"
          >
            {s}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="mt-3 flex gap-2"
      >
        <input
          className="input-bauhaus flex-1"
          placeholder="Ask The Advisor…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-blue px-4">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
