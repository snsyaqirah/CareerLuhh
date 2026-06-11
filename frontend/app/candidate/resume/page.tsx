"use client";

import { useState, useRef } from "react";
import {
  Upload,
  Bot,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  FileText,
  Printer,
  FileDown,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";

// ─── Types ──────────────────────────────────────────────────────────────────
interface WorkExperience {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: WorkExperience[];
  skills: string;
  certifications: string;
}

const PROFILE_DATA: ResumeData = {
  name: "Ahmad Faris bin Azman",
  email: "candidate@demo.com",
  phone: "+60 11-234 5678",
  location: "Petaling Jaya, Selangor",
  linkedin: "linkedin.com/in/ahmadfaris",
  github: "github.com/ahmadfaris",
  summary:
    "Software Engineer with 2 years of experience building full-stack web applications using React, Node.js, and PostgreSQL. Proven track record of shipping production features at pace. Seeking a senior individual contributor or tech lead role at a product-first company.",
  experience: [
    {
      title: "Junior Software Engineer",
      company: "TechNova Sdn Bhd",
      period: "Jul 2024 – Present",
      bullets: [
        "Built 4 customer-facing React features used by 80,000+ monthly active users, reducing load time by 35% through code splitting and lazy loading",
        "Led migration of legacy REST endpoints to a GraphQL API, cutting average payload size by 60%",
        "Mentored 2 intern developers, reviewing PRs and running weekly knowledge-share sessions",
      ],
    },
    {
      title: "Frontend Developer Intern",
      company: "Setel Ventures",
      period: "Jan 2024 – Jun 2024",
      bullets: [
        "Developed 3 new UI components for the Setel driver dashboard using React and CSS Modules",
        "Fixed 12 critical UI bugs ahead of a major iOS release, contributing to a 4.2 → 4.6 App Store rating improvement",
        "Wrote end-to-end tests using Playwright, achieving 85% coverage on key user flows",
      ],
    },
  ],
  skills:
    "React, Next.js, TypeScript, JavaScript, Node.js, Express, PostgreSQL, Prisma, Docker, Git, REST APIs, GraphQL, CI/CD",
  certifications: "AWS Certified Cloud Practitioner (2025) · Meta Front-End Developer Certificate (2024)",
};

// ─── Mock OCR analysis result ────────────────────────────────────────────
const MOCK_ANALYSIS = {
  score: 65,
  extracted: {
    name: "Ahmad Faris bin Azman",
    email: "ahmadfaris@hotmail.com",
    phone: "+60 11-234 5678",
    roles: ["Junior Software Engineer", "Frontend Developer Intern"],
    skills: ["React", "JavaScript", "CSS", "Node.js", "Git"],
    yearsExp: 2,
  },
  issues: [
    { severity: "high", text: "No quantifiable achievements — add numbers to your bullet points (%, RM, users affected)" },
    { severity: "high", text: "Missing LinkedIn URL — recruiters need to verify your profile" },
    { severity: "medium", text: "Objective/summary is missing — add 3–4 lines at the top" },
    { severity: "medium", text: "Skills section only has 5 skills — you listed more in your profile (TypeScript, PostgreSQL, Docker missing)" },
    { severity: "low", text: "No certifications section — you have AWS and Meta certs that should be on here" },
  ],
  strengths: [
    "Clean formatting — ATS-parseable layout",
    "Relevant work experience for your target roles",
    "Good progression visible: intern → full-time",
  ],
};

type Severity = "high" | "medium" | "low";
const SEV_COLOR: Record<Severity, string> = {
  high: "border-red bg-red/5 text-red",
  medium: "border-yellow bg-yellow/5 text-ink",
  low: "border-ink/20 bg-canvas text-ink/60",
};
const SEV_LABEL: Record<Severity, string> = {
  high: "Fix Now",
  medium: "Improve",
  low: "Optional",
};

function TipCard({ tip, section }: { tip: string; section: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left border-2 border-yellow bg-yellow/10 p-2.5 text-xs">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-black uppercase">
          <Bot size={12} className="text-blue" />
          <span className="text-blue">Tip: {section}</span>
        </div>
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </div>
      {open && <p className="mt-2 font-medium leading-relaxed text-ink/70">{tip}</p>}
    </button>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #111", paddingBottom: "2px", marginBottom: "5px" }}>
      {children}
    </div>
  );
}

function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <div id="resume-preview" className="bg-white p-8 text-[11px] leading-snug text-[#111]" style={{ fontFamily: "Georgia, serif", minHeight: "842px", width: "100%" }}>
      <div className="border-b-2 border-[#111] pb-3 mb-3 text-center">
        <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase" }}>
          {data.name || "Your Name"}
        </h1>
        <p className="mt-1 text-[10px]" style={{ fontFamily: "Arial, sans-serif" }}>
          {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
        </p>
        {(data.linkedin || data.github) && (
          <p className="mt-0.5 text-[10px]" style={{ fontFamily: "Arial, sans-serif" }}>
            {[data.linkedin, data.github].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>

      {data.summary && (
        <div className="mb-3">
          <SectionHead>Professional Summary</SectionHead>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-3">
          <SectionHead>Work Experience</SectionHead>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "10.5px" }}>{exp.title}</span>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "10px", color: "#555" }}>{exp.period}</span>
              </div>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", color: "#333", fontStyle: "italic" }}>{exp.company}</p>
              <ul style={{ marginLeft: "14px", marginTop: "3px", listStyleType: "disc" }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5", color: "#111" }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.skills && (
        <div className="mb-3">
          <SectionHead>Skills</SectionHead>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>{data.skills}</p>
        </div>
      )}

      {data.certifications && (
        <div className="mb-3">
          <SectionHead>Certifications</SectionHead>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>{data.certifications}</p>
        </div>
      )}
    </div>
  );
}

// ─── DOCX download ────────────────────────────────────────────────────────
function downloadDoc(data: ResumeData) {
  const expHtml = data.experience.map((exp) => `
    <p style="margin:0"><b>${exp.title}</b> <span style="float:right">${exp.period}</span></p>
    <p style="margin:0;color:#333;font-style:italic">${exp.company}</p>
    <ul style="margin:4px 0 8px 18px;padding:0">
      ${exp.bullets.filter(Boolean).map((b) => `<li style="font-size:10.5pt;line-height:1.4">${b}</li>`).join("")}
    </ul>
  `).join("");

  const html = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
<head><meta charset='utf-8'>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; margin: 2cm; color: #111; }
  h1 { font-size: 18pt; text-align: center; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
  .contact { text-align: center; font-size: 9pt; color: #555; margin-bottom: 4px; }
  .section-head { font-size: 10pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #111; padding-bottom: 2px; margin-top: 14px; margin-bottom: 6px; }
  p { margin: 2px 0; font-size: 10.5pt; line-height: 1.4; }
</style></head>
<body>
  <h1>${data.name}</h1>
  <div class="contact">${[data.email, data.phone, data.location].filter(Boolean).join(" &nbsp;·&nbsp; ")}</div>
  ${data.linkedin || data.github ? `<div class="contact">${[data.linkedin, data.github].filter(Boolean).join(" &nbsp;·&nbsp; ")}</div>` : ""}
  ${data.summary ? `<div class="section-head">Professional Summary</div><p>${data.summary}</p>` : ""}
  ${data.experience.length ? `<div class="section-head">Work Experience</div>${expHtml}` : ""}
  ${data.skills ? `<div class="section-head">Skills</div><p>${data.skills}</p>` : ""}
  ${data.certifications ? `<div class="section-head">Certifications</div><p>${data.certifications}</p>` : ""}
</body></html>`;

  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(data.name || "resume").replace(/\s+/g, "_")}_resume.doc`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function CandidateResumePage() {
  const [tab, setTab] = useState<"analyze" | "build">("analyze");
  const [uploadState, setUploadState] = useState<"idle" | "processing" | "done">("idle");
  const [data, setData] = useState<ResumeData>(PROFILE_DATA);
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof ResumeData>(key: K, val: ResumeData[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  function setExp(i: number, field: keyof WorkExperience, val: string | string[]) {
    const next = [...data.experience];
    next[i] = { ...next[i], [field]: val };
    set("experience", next);
  }

  function setBullet(expIdx: number, bIdx: number, val: string) {
    const next = [...data.experience];
    const bullets = [...next[expIdx].bullets];
    bullets[bIdx] = val;
    next[expIdx] = { ...next[expIdx], bullets };
    set("experience", next);
  }

  function handleUpload() {
    setUploadState("processing");
    setTimeout(() => setUploadState("done"), 2200);
  }

  const score = MOCK_ANALYSIS.score;
  const scoreColor = score >= 80 ? "text-blue" : score >= 60 ? "text-yellow" : "text-red";

  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-label mb-1 text-blue">Resume</p>
      <h1 className="text-heading mb-2">
        Your Resume Hub<span className="text-red">.</span>
      </h1>
      <p className="mb-6 max-w-2xl text-sm font-medium text-ink/60">
        Upload your existing resume for AI analysis, or build a polished version directly from your CareerProfile.
      </p>

      {/* Tabs */}
      <div className="mb-8 flex border-b-4 border-ink">
        <button
          onClick={() => setTab("analyze")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-colors ${tab === "analyze" ? "bg-ink text-white" : "hover:bg-canvas"}`}
        >
          <Upload size={14} /> Analyze My Resume
        </button>
        <button
          onClick={() => setTab("build")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-colors ${tab === "build" ? "bg-ink text-white" : "hover:bg-canvas"}`}
        >
          <FileText size={14} /> Build / Edit Resume
        </button>
      </div>

      {/* ── Analyze Tab ─────────────────────────────── */}
      {tab === "analyze" && (
        <div className="space-y-6 max-w-3xl">
          {/* Upload zone */}
          {uploadState === "idle" && (
            <div
              onClick={() => fileRef.current?.click()}
              className="cursor-pointer border-4 border-dashed border-ink bg-canvas p-12 text-center hover:bg-yellow/10 transition-colors"
            >
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} />
              <Upload size={40} className="mx-auto mb-4 text-ink/30" />
              <p className="font-black uppercase text-lg">Drop your resume here</p>
              <p className="mt-2 text-sm font-medium text-ink/50">PDF, DOC, or DOCX · Max 5MB</p>
              <p className="mt-4 inline-block border-2 border-ink bg-blue px-4 py-2 text-xs font-black uppercase text-white">
                Choose File
              </p>
              <p className="mt-4 text-[11px] font-medium text-ink/40">
                Stage 1: any file triggers a mock OCR analysis. Stage 2: ResumeOCRAgent reads your actual resume.
              </p>
            </div>
          )}

          {uploadState === "processing" && (
            <div className="border-4 border-ink bg-blue p-8 text-center text-white">
              <div className="mb-4 inline-block h-10 w-10 animate-spin border-4 border-white border-t-transparent rounded-full" />
              <p className="font-black uppercase text-lg">ResumeOCRAgent analysing…</p>
              <p className="mt-2 text-sm font-medium text-white/70">
                Parsing layout, extracting entities, scoring against market benchmarks
              </p>
            </div>
          )}

          {uploadState === "done" && (
            <>
              <AgentCard agentName="ResumeOCRAgent" codeName="— OCR & analysis" status="complete">
                <p className="text-sm font-medium text-ink/70">
                  Resume parsed. Found {MOCK_ANALYSIS.extracted.roles.length} roles,{" "}
                  {MOCK_ANALYSIS.extracted.yearsExp} YoE,{" "}
                  {MOCK_ANALYSIS.extracted.skills.length} skills detected. Overall score:{" "}
                  {MOCK_ANALYSIS.score}/100.
                </p>
              </AgentCard>

              {/* Score */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border-4 border-ink bg-white p-5 text-center col-span-1">
                  <p className="text-label mb-1 text-ink/50">Resume Score</p>
                  <p className={`text-5xl font-black ${scoreColor}`}>{score}</p>
                  <p className="text-xs font-bold text-ink/50">/100</p>
                  <p className="mt-2 text-[11px] font-medium text-ink/50">
                    {score >= 80 ? "Strong — ready to send" : score >= 60 ? "Good foundation, room to improve" : "Needs significant work before sending"}
                  </p>
                </div>
                <div className="col-span-2 space-y-2">
                  <p className="text-label mb-2">Extracted Info</p>
                  {Object.entries(MOCK_ANALYSIS.extracted).map(([k, v]) => (
                    <div key={k} className="flex items-start gap-2 text-xs">
                      <span className="font-black uppercase w-20 shrink-0 text-ink/40">{k}</span>
                      <span className="font-semibold">{Array.isArray(v) ? v.join(", ") : String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Issues */}
              <div>
                <p className="text-label mb-3">Issues Found</p>
                <div className="space-y-2">
                  {MOCK_ANALYSIS.issues.map((issue, i) => (
                    <div key={i} className={`flex items-start gap-3 border-2 p-3 ${SEV_COLOR[issue.severity as Severity]}`}>
                      <AlertCircle size={13} className="mt-0.5 shrink-0" />
                      <div className="flex-1 text-xs">
                        <span className="font-black uppercase text-[10px] mr-2 border border-current px-1">{SEV_LABEL[issue.severity as Severity]}</span>
                        {issue.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div>
                <p className="text-label mb-3">Strengths</p>
                <div className="space-y-2">
                  {MOCK_ANALYSIS.strengths.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 border-2 border-blue bg-blue/5 p-3 text-xs font-semibold">
                      <Check size={13} className="shrink-0 text-blue" /> {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 border-t-4 border-ink pt-4">
                <button onClick={() => setTab("build")} className="btn-blue">
                  Fix These Issues → Build Resume <Zap size={14} />
                </button>
                <button
                  onClick={() => setUploadState("idle")}
                  className="btn-ghost"
                >
                  Upload Different Resume
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Build Tab ────────────────────────────────── */}
      {tab === "build" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_520px]">
          {/* Form */}
          <div className="space-y-8">

            {/* Header */}
            <section>
              <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
                <span className="border-2 border-ink bg-blue px-2 py-0.5 text-[10px] font-black uppercase text-white">01</span>
                <h2 className="font-black uppercase">Contact Info</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["name", "email", "phone", "location", "linkedin", "github"] as const).map((f) => (
                  <div key={f}>
                    <label className="label-bauhaus">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                    <input className="input-bauhaus" value={data[f] as string} onChange={(e) => set(f, e.target.value)} />
                  </div>
                ))}
              </div>
            </section>

            {/* Summary */}
            <section>
              <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
                <span className="border-2 border-ink bg-red px-2 py-0.5 text-[10px] font-black uppercase text-white">02</span>
                <h2 className="font-black uppercase">Professional Summary</h2>
              </div>
              <TipCard
                tip="As an experienced candidate, your summary should answer: What level are you? What have you delivered? What are you looking for next? 3-4 sentences max. No 'passionate team player' clichés."
                section="Summary"
              />
              <textarea
                className="input-bauhaus mt-3 h-24 resize-none"
                value={data.summary}
                onChange={(e) => set("summary", e.target.value)}
                placeholder="Your level + what you've shipped + what you're looking for next"
              />
            </section>

            {/* Experience */}
            <section>
              <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
                <span className="border-2 border-ink bg-yellow px-2 py-0.5 text-[10px] font-black uppercase">03</span>
                <h2 className="font-black uppercase">Work Experience</h2>
              </div>
              <TipCard
                tip="Every bullet should follow: Action verb + what you built/did + measurable result. 'Led migration of REST to GraphQL, cutting payload size by 60%' > 'Worked on API migration'. Use real numbers — estimates are fine."
                section="Experience"
              />
              <div className="mt-3 space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={i} className="border-2 border-ink bg-canvas p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-ink/50">Role {i + 1}</span>
                      {data.experience.length > 1 && (
                        <button onClick={() => set("experience", data.experience.filter((_, j) => j !== i))} className="text-red"><Trash2 size={13} /></button>
                      )}
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <label className="label-bauhaus">Job Title</label>
                        <input className="input-bauhaus" value={exp.title} onChange={(e) => setExp(i, "title", e.target.value)} />
                      </div>
                      <div>
                        <label className="label-bauhaus">Company</label>
                        <input className="input-bauhaus" value={exp.company} onChange={(e) => setExp(i, "company", e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label-bauhaus">Period</label>
                        <input className="input-bauhaus" placeholder="Jan 2023 – Present" value={exp.period} onChange={(e) => setExp(i, "period", e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="label-bauhaus">Bullet Points (what you shipped + impact)</label>
                      {exp.bullets.map((b, j) => (
                        <div key={j} className="mb-2 flex gap-2">
                          <textarea
                            className="input-bauhaus flex-1 h-14 resize-none text-xs"
                            value={b}
                            onChange={(e) => setBullet(i, j, e.target.value)}
                            placeholder="Built X that reduced Y by Z%…"
                          />
                          {exp.bullets.length > 1 && (
                            <button
                              onClick={() => setExp(i, "bullets", exp.bullets.filter((_, k) => k !== j))}
                              className="self-start border-2 border-ink p-1.5 hover:bg-red hover:text-white transition-colors"
                            >
                              <X size={11} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => setExp(i, "bullets", [...exp.bullets, ""])}
                        className="flex items-center gap-1 text-xs font-bold text-blue hover:underline"
                      >
                        <Plus size={12} /> Add bullet
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => set("experience", [...data.experience, { title: "", company: "", period: "", bullets: [""] }])}
                  className="flex items-center gap-2 text-xs font-bold text-blue hover:underline"
                >
                  <Plus size={13} /> Add role
                </button>
              </div>
            </section>

            {/* Skills */}
            <section>
              <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
                <span className="border-2 border-ink bg-blue px-2 py-0.5 text-[10px] font-black uppercase text-white">04</span>
                <h2 className="font-black uppercase">Skills</h2>
              </div>
              <textarea
                className="input-bauhaus h-20 resize-none"
                placeholder="React, TypeScript, Node.js, PostgreSQL, Docker, AWS, Git…"
                value={data.skills}
                onChange={(e) => set("skills", e.target.value)}
              />
            </section>

            {/* Certifications */}
            <section>
              <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
                <span className="border-2 border-ink bg-red px-2 py-0.5 text-[10px] font-black uppercase text-white">05</span>
                <h2 className="font-black uppercase">Certifications</h2>
              </div>
              <textarea
                className="input-bauhaus h-16 resize-none"
                placeholder="AWS Cloud Practitioner (2025) · Meta Front-End Certificate"
                value={data.certifications}
                onChange={(e) => set("certifications", e.target.value)}
              />
            </section>

            <div className="border-t-4 border-ink pt-6 flex flex-wrap gap-3 items-center">
              <button onClick={() => window.print()} className="btn-blue flex items-center gap-2">
                <Printer size={14} /> Print / PDF
              </button>
              <button onClick={() => downloadDoc(data)} className="flex items-center gap-2 border-2 border-ink bg-canvas px-4 py-2 text-xs font-black uppercase hover:bg-yellow">
                <FileDown size={14} /> Download DOC
              </button>
              <span className="text-xs font-medium text-ink/40">DOC = editable in Microsoft Word</span>
            </div>
          </div>

          {/* Preview */}
          <div className="print:block">
            <div className="sticky top-6">
              <div className="mb-3 flex items-center justify-between print:hidden">
                <p className="text-label">Live Preview</p>
                <div className="flex gap-2">
                  <button onClick={() => downloadDoc(data)} className="flex items-center gap-1 border-2 border-ink px-3 py-1.5 text-xs font-bold uppercase hover:bg-yellow">
                    <FileDown size={12} /> DOC
                  </button>
                  <button onClick={() => window.print()} className="flex items-center gap-1 border-2 border-ink bg-blue px-3 py-1.5 text-xs font-bold uppercase text-white hover:bg-blue/80">
                    <Printer size={12} /> Print
                  </button>
                </div>
              </div>
              <div className="overflow-auto border-4 border-ink shadow-hard-lg print:border-0 print:overflow-visible print:shadow-none">
                <div style={{ width: "520px" }} className="print:w-full">
                  <ResumePreview data={data} />
                </div>
              </div>
              <p className="mt-2 text-[10px] font-medium text-ink/40 print:hidden">Live preview — edits show instantly</p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media print {
          * { visibility: hidden !important; }
          #resume-preview, #resume-preview * { visibility: visible !important; }
          #resume-preview {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            border: none !important;
          }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  );
}
