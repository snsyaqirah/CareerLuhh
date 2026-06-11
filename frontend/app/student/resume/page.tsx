"use client";

import { useState } from "react";
import { Bot, Printer, FileDown, ChevronDown, ChevronUp, Check, Plus, Trash2 } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { portfolioItems, studentProfile, transcriptRecords } from "@/lib/mock-data/student";

interface Project {
  name: string;
  desc: string;
  tech: string;
  url?: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  year: string;
  cgpa: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  objective: string;
  education: Education[];
  projects: Project[];
  skills: string;
  certifications: string;
  activities: string;
}

// ─── Auto-populate from portfolio + transcript ────────────────────────────
const githubItem = portfolioItems.find((p) => p.type === "github");
const projectItems = portfolioItems.filter((p) => p.type === "project");
const certItems = portfolioItems.filter((p) => p.type === "cert");

const autoProjects: Project[] = projectItems.map((p) => ({
  name: p.title,
  desc: p.description,
  tech: p.techStack.join(", "),
  url: p.url?.replace(/^https?:\/\//, ""),
}));

const autoCerts = certItems.map((c) => `${c.title} (${c.date})`).join(" · ");

const latestSemester = transcriptRecords.length > 0 ? transcriptRecords[transcriptRecords.length - 1] : null;
const cgpaDisplay = latestSemester ? latestSemester.cgpa.toFixed(2) : studentProfile.cgpa.toFixed(2);

// Collect all unique skills from portfolio tech stacks
const allSkills = [...new Set(portfolioItems.flatMap((p) => p.techStack))].join(", ");

const INITIAL: ResumeData = {
  name: studentProfile.name,
  email: "ainasofea@student.uitm.edu.my",
  phone: "+60 12-345 6789",
  location: "Shah Alam, Selangor",
  linkedin: "linkedin.com/in/ainasofea",
  github: githubItem?.url?.replace(/^https?:\/\//, "") ?? "github.com/ainasofea",
  objective: `Final-year ${studentProfile.programme.split("(")[0].trim()} student at ${studentProfile.university} (CGPA ${cgpaDisplay}) seeking a Junior Frontend Developer role. Passionate about building products that solve real problems — ${projectItems.length} portfolio projects live, with a consistent commit record on GitHub.`,
  education: [
    {
      school: `${studentProfile.university}`,
      degree: studentProfile.programme,
      field: "Software Engineering",
      year: `Expected ${studentProfile.graduation}`,
      cgpa: cgpaDisplay,
    },
  ],
  projects: autoProjects.length > 0 ? autoProjects : [
    { name: "", desc: "", tech: "" },
  ],
  skills: allSkills || "React, JavaScript, CSS, Git",
  certifications: autoCerts,
  activities: "",
};

const AI_TIPS: Record<string, string> = {
  header: "Use a professional email — ideally name@university.edu.my. Add GitHub if you have deployed projects. LinkedIn is checked by ~80% of recruiters before an interview.",
  objective: "3 things: (1) your year/CGPA, (2) what role you want, (3) one thing you bring. Under 3 sentences. The AI pre-filled one from your profile — edit it to sound like you.",
  education: "CGPA 3.5+ is a differentiator — list it. Include Dean's List. Skip secondary school once you graduate.",
  projects: "Lead with impact: 'Reduced page load by 40%' beats 'Built a web app'. If it's deployed, add the URL. List the tech so ATS systems pick it up.",
  skills: "Only list what you can discuss in an interview. Group: Languages · Frameworks · Tools. Remove anything you'd struggle to explain.",
  certifications: "MUET Band 4+ is relevant for many GLCs — list it. Coursera/AWS certs show initiative. Put most relevant first.",
  activities: "Only activities that show leadership or commitment. 'Led 3 workshops for 80 students' beats 'Member of Computing Club'.",
};

function TipCard({ tip, section }: { tip: string; section: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left border-2 border-yellow bg-yellow/10 p-2.5 text-xs mt-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-black uppercase">
          <Bot size={12} className="text-blue" />
          <span className="text-blue">AI Tip: {section}</span>
        </div>
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </div>
      {open && <p className="mt-2 font-medium leading-relaxed text-ink/70">{tip}</p>}
    </button>
  );
}

// ─── A4 Resume Preview ─────────────────────────────────────────────────────
function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #111", paddingBottom: "2px", marginBottom: "5px" }}>
      {children}
    </div>
  );
}

function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <div id="resume-preview" style={{ fontFamily: "Georgia, serif", background: "white", padding: "2cm", minHeight: "842px", width: "100%", fontSize: "11px", lineHeight: "1.4", color: "#111", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ borderBottom: "2px solid #111", paddingBottom: "10px", marginBottom: "10px", textAlign: "center" }}>
        <div style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
          {data.name || "Your Name"}
        </div>
        <div style={{ marginTop: "4px", fontSize: "10px", fontFamily: "Arial, sans-serif" }}>
          {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
        </div>
        {(data.linkedin || data.github) && (
          <div style={{ marginTop: "2px", fontSize: "10px", fontFamily: "Arial, sans-serif" }}>
            {[data.linkedin, data.github].filter(Boolean).join(" · ")}
          </div>
        )}
      </div>

      {/* Objective */}
      {data.objective && (
        <div style={{ marginBottom: "10px" }}>
          <SectionHead>Objective</SectionHead>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>{data.objective}</div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <SectionHead>Education</SectionHead>
          {data.education.map((e, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "10.5px" }}>{e.school}</span>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "10px", color: "#555" }}>{e.year}</span>
              </div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", color: "#333" }}>
                {[e.degree, e.field].filter(Boolean).join(", ")}{e.cgpa ? ` · CGPA: ${e.cgpa}` : ""}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.filter(p => p.name).length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <SectionHead>Projects</SectionHead>
          {data.projects.filter(p => p.name).map((p, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "10.5px" }}>
                  {p.name}{p.url ? <span style={{ fontWeight: 400, fontSize: "9.5px", color: "#555" }}> · {p.url}</span> : ""}
                </span>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "9.5px", color: "#666", fontStyle: "italic" }}>{p.tech}</span>
              </div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", color: "#333", marginTop: "1px" }}>{p.desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div style={{ marginBottom: "10px" }}>
          <SectionHead>Technical Skills</SectionHead>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>{data.skills}</div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && (
        <div style={{ marginBottom: "10px" }}>
          <SectionHead>Certifications &amp; Language</SectionHead>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>{data.certifications}</div>
        </div>
      )}

      {/* Activities */}
      {data.activities && (
        <div style={{ marginBottom: "10px" }}>
          <SectionHead>Co-Curricular &amp; Activities</SectionHead>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>{data.activities}</div>
        </div>
      )}
    </div>
  );
}

// ─── DOCX download (HTML-as-DOC trick) ────────────────────────────────────
function downloadDoc(data: ResumeData) {
  const eduHtml = data.education.map((e) => `
    <p style="margin:0"><b>${e.school}</b> <span style="float:right">${e.year}</span></p>
    <p style="margin:0;color:#333">${[e.degree, e.field].filter(Boolean).join(", ")}${e.cgpa ? ` · CGPA: ${e.cgpa}` : ""}</p>
    <br/>
  `).join("");

  const projHtml = data.projects.filter(p => p.name).map((p) => `
    <p style="margin:0"><b>${p.name}</b>${p.url ? ` <span style="color:#555;font-size:9pt">&nbsp;·&nbsp;${p.url}</span>` : ""} <span style="float:right;font-style:italic;color:#666;font-size:9pt">${p.tech}</span></p>
    <p style="margin:0;color:#333">${p.desc}</p>
    <br/>
  `).join("");

  const html = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; margin: 2cm; color: #111; }
    h1 { font-size: 18pt; text-align: center; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
    .contact { text-align: center; font-size: 9pt; color: #555; margin-bottom: 12px; }
    .section-head { font-size: 10pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #111; padding-bottom: 2px; margin-top: 12px; margin-bottom: 6px; }
    p { margin: 2px 0; font-size: 10.5pt; line-height: 1.4; }
    b { font-weight: 700; }
  </style>
</head>
<body>
  <h1>${data.name || "Your Name"}</h1>
  <div class="contact">${[data.email, data.phone, data.location].filter(Boolean).join(" &nbsp;·&nbsp; ")}</div>
  ${data.linkedin || data.github ? `<div class="contact">${[data.linkedin, data.github].filter(Boolean).join(" &nbsp;·&nbsp; ")}</div>` : ""}

  ${data.objective ? `<div class="section-head">Objective</div><p>${data.objective}</p>` : ""}

  ${data.education.length ? `<div class="section-head">Education</div>${eduHtml}` : ""}

  ${data.projects.filter(p => p.name).length ? `<div class="section-head">Projects</div>${projHtml}` : ""}

  ${data.skills ? `<div class="section-head">Technical Skills</div><p>${data.skills}</p>` : ""}

  ${data.certifications ? `<div class="section-head">Certifications &amp; Language</div><p>${data.certifications}</p>` : ""}

  ${data.activities ? `<div class="section-head">Co-Curricular &amp; Activities</div><p>${data.activities}</p>` : ""}
</body>
</html>`;

  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(data.name || "resume").replace(/\s+/g, "_")}_resume.doc`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function StudentResumePage() {
  const [data, setData] = useState<ResumeData>(INITIAL);
  const [aiComplete, setAiComplete] = useState(false);
  const [generatingObjective, setGeneratingObjective] = useState(false);
  const [portfolioImported] = useState(projectItems.length > 0);

  function set<K extends keyof ResumeData>(key: K, val: ResumeData[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  function setEdu(i: number, field: keyof Education, val: string) {
    const next = [...data.education];
    next[i] = { ...next[i], [field]: val };
    set("education", next);
  }

  function setProj(i: number, field: keyof Project, val: string) {
    const next = [...data.projects];
    next[i] = { ...next[i], [field]: val };
    set("projects", next);
  }

  function generateObjective() {
    setGeneratingObjective(true);
    setTimeout(() => {
      set("objective", INITIAL.objective);
      setGeneratingObjective(false);
      setAiComplete(true);
    }, 1500);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-label mb-1 text-blue">Resume Builder</p>
      <h1 className="text-heading mb-2">
        Build Your Resume<span className="text-red">.</span>
      </h1>
      <p className="mb-2 max-w-2xl text-sm font-medium text-ink/60">
        Your portfolio projects and skills have been auto-loaded. Edit anything, then print or download as DOC.
      </p>

      {portfolioImported && (
        <div className="mb-4 inline-flex items-center gap-2 border-2 border-blue bg-blue/5 px-3 py-1.5 text-xs font-bold">
          <Check size={13} className="text-blue" />
          {projectItems.length} portfolio project{projectItems.length !== 1 ? "s" : ""} + {certItems.length} cert{certItems.length !== 1 ? "s" : ""} auto-imported from your Portfolio
        </div>
      )}

      {aiComplete && (
        <div className="mb-4">
          <AgentCard agentName="ResumeCoachAgent" codeName="— resume coach" status="complete">
            <p className="text-sm font-medium text-ink/70">
              Objective drafted. Edit it to match the specific role you&apos;re applying for — one tailored resume beats ten generic ones.
            </p>
          </AgentCard>
        </div>
      )}

      {/* Download buttons */}
      <div className="mb-6 flex flex-wrap gap-3 print:hidden">
        <button onClick={() => window.print()} className="flex items-center gap-2 border-2 border-ink bg-blue px-4 py-2 text-xs font-black uppercase text-white hover:bg-blue/80">
          <Printer size={14} /> Print / PDF
        </button>
        <button onClick={() => downloadDoc(data)} className="flex items-center gap-2 border-2 border-ink bg-canvas px-4 py-2 text-xs font-black uppercase hover:bg-yellow">
          <FileDown size={14} /> Download DOC
        </button>
        <span className="self-center text-xs font-medium text-ink/40">PDF: Print → Save as PDF &nbsp;·&nbsp; DOC: open and edit in Word</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_520px]">
        {/* ── Form side (hidden on print) ── */}
        <div className="space-y-8 print:hidden">

          {/* 01 Personal Info */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-blue px-2 py-0.5 text-[10px] font-black uppercase text-white">01</span>
              <h2 className="font-black uppercase">Personal Info</h2>
            </div>
            <TipCard tip={AI_TIPS.header} section="Header" />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(["name", "email", "phone", "location", "linkedin", "github"] as const).map((f) => (
                <div key={f}>
                  <label className="label-bauhaus">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                  <input className="input-bauhaus" value={data[f] as string} onChange={(e) => set(f, e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          {/* 02 Objective */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-red px-2 py-0.5 text-[10px] font-black uppercase text-white">02</span>
              <h2 className="font-black uppercase">Objective / Summary</h2>
            </div>
            <TipCard tip={AI_TIPS.objective} section="Objective" />
            <div className="mt-3 space-y-2">
              <textarea className="input-bauhaus h-24 resize-none" value={data.objective} onChange={(e) => set("objective", e.target.value)} placeholder="3 sentences: who you are, what you want, what you bring." />
              <button onClick={generateObjective} disabled={generatingObjective} className="flex items-center gap-2 border-2 border-ink bg-yellow px-4 py-2 text-xs font-black uppercase hover:bg-yellow/70 disabled:opacity-50">
                <Bot size={13} />
                {generatingObjective ? "Writing from your profile…" : "AI Draft from my Profile"}
              </button>
            </div>
          </section>

          {/* 03 Education */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-yellow px-2 py-0.5 text-[10px] font-black uppercase">03</span>
              <h2 className="font-black uppercase">Education</h2>
            </div>
            <TipCard tip={AI_TIPS.education} section="Education" />
            <div className="mt-3 space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="border-2 border-ink bg-canvas p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-ink/50">Entry {i + 1}</span>
                    {data.education.length > 1 && (
                      <button onClick={() => set("education", data.education.filter((_, j) => j !== i))} className="text-red"><Trash2 size={13} /></button>
                    )}
                  </div>
                  <input className="input-bauhaus" placeholder="School / University" value={edu.school} onChange={(e) => setEdu(i, "school", e.target.value)} />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input className="input-bauhaus" placeholder="Degree" value={edu.degree} onChange={(e) => setEdu(i, "degree", e.target.value)} />
                    <input className="input-bauhaus" placeholder="Field of Study" value={edu.field} onChange={(e) => setEdu(i, "field", e.target.value)} />
                    <input className="input-bauhaus" placeholder="Year / Expected" value={edu.year} onChange={(e) => setEdu(i, "year", e.target.value)} />
                    <input className="input-bauhaus" placeholder="CGPA (optional)" value={edu.cgpa} onChange={(e) => setEdu(i, "cgpa", e.target.value)} />
                  </div>
                </div>
              ))}
              <button onClick={() => set("education", [...data.education, { school: "", degree: "", field: "", year: "", cgpa: "" }])} className="flex items-center gap-2 text-xs font-bold text-blue hover:underline">
                <Plus size={13} /> Add education
              </button>
            </div>
          </section>

          {/* 04 Projects (auto-populated from portfolio) */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-blue px-2 py-0.5 text-[10px] font-black uppercase text-white">04</span>
              <h2 className="font-black uppercase">Projects</h2>
              {portfolioImported && (
                <span className="ml-auto text-[10px] font-bold text-blue border border-blue px-1.5 py-0.5">
                  Auto-imported from Portfolio
                </span>
              )}
            </div>
            <TipCard tip={AI_TIPS.projects} section="Projects" />
            <div className="mt-3 space-y-4">
              {data.projects.map((proj, i) => (
                <div key={i} className="border-2 border-ink bg-canvas p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-ink/50">Project {i + 1}</span>
                    <button onClick={() => set("projects", data.projects.filter((_, j) => j !== i))} className="text-red"><Trash2 size={13} /></button>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input className="input-bauhaus" placeholder="Project Name" value={proj.name} onChange={(e) => setProj(i, "name", e.target.value)} />
                    <input className="input-bauhaus" placeholder="Tech Used (comma-separated)" value={proj.tech} onChange={(e) => setProj(i, "tech", e.target.value)} />
                  </div>
                  <input className="input-bauhaus" placeholder="Live URL (optional)" value={proj.url ?? ""} onChange={(e) => setProj(i, "url", e.target.value)} />
                  <textarea className="input-bauhaus h-16 resize-none" placeholder="Impact first: 'Reduced X by Y%' > 'Built a CRUD app'" value={proj.desc} onChange={(e) => setProj(i, "desc", e.target.value)} />
                </div>
              ))}
              <button onClick={() => set("projects", [...data.projects, { name: "", desc: "", tech: "" }])} className="flex items-center gap-2 text-xs font-bold text-blue hover:underline">
                <Plus size={13} /> Add project
              </button>
            </div>
          </section>

          {/* 05 Skills */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-red px-2 py-0.5 text-[10px] font-black uppercase text-white">05</span>
              <h2 className="font-black uppercase">Skills</h2>
            </div>
            <TipCard tip={AI_TIPS.skills} section="Skills" />
            <textarea className="input-bauhaus mt-3 h-20 resize-none" placeholder="React, Next.js, TypeScript, Python, Figma, Git, SQL…" value={data.skills} onChange={(e) => set("skills", e.target.value)} />
          </section>

          {/* 06 Certs */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-yellow px-2 py-0.5 text-[10px] font-black uppercase">06</span>
              <h2 className="font-black uppercase">Certifications &amp; Language</h2>
              {certItems.length > 0 && (
                <span className="ml-auto text-[10px] font-bold text-blue border border-blue px-1.5 py-0.5">Auto-imported</span>
              )}
            </div>
            <TipCard tip={AI_TIPS.certifications} section="Certifications" />
            <textarea className="input-bauhaus mt-3 h-16 resize-none" placeholder="AWS Cloud Practitioner (2025) · MUET Band 4" value={data.certifications} onChange={(e) => set("certifications", e.target.value)} />
          </section>

          {/* 07 Activities */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-ink px-2 py-0.5 text-[10px] font-black uppercase text-white">07</span>
              <h2 className="font-black uppercase">Co-Curricular &amp; Activities</h2>
            </div>
            <TipCard tip={AI_TIPS.activities} section="Activities" />
            <textarea className="input-bauhaus mt-3 h-20 resize-none" placeholder="Vice President, Computing Society · Hackathon participant · Peer tutor" value={data.activities} onChange={(e) => set("activities", e.target.value)} />
          </section>
        </div>

        {/* ── Live Preview (print-only on small screens) ── */}
        <div className="print:block">
          <div className="sticky top-6 print:static">
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
            <div className="overflow-auto border-4 border-ink print:border-0 print:overflow-visible">
              <div style={{ width: "520px" }} className="print:w-full">
                <ResumePreview data={data} />
              </div>
            </div>
            <p className="mt-2 text-[10px] font-medium text-ink/40 print:hidden">
              Live preview · edits reflect instantly
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          * { visibility: hidden !important; }
          #resume-preview, #resume-preview * { visibility: visible !important; }
          #resume-preview {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            padding: 0 !important;
            border: none !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
