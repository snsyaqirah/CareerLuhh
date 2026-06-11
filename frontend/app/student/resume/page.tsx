"use client";

import { useState } from "react";
import { Bot, Printer, ChevronDown, ChevronUp, Check, Plus, Trash2, Lightbulb } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";

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

const INITIAL: ResumeData = {
  name: "Aina Sofea binti Ahmad",
  email: "ainasofea@student.uitm.edu.my",
  phone: "+60 12-345 6789",
  location: "Shah Alam, Selangor",
  linkedin: "linkedin.com/in/ainasofea",
  github: "github.com/ainasofea",
  objective:
    "Final-year Computer Science student at UiTM Shah Alam (CGPA 3.67) seeking a Junior Frontend Developer role where I can apply my React and Next.js skills to build products used by real users. Passionate about clean interfaces and performance-first development.",
  education: [
    {
      school: "Universiti Teknologi MARA (UiTM) Shah Alam",
      degree: "Bachelor of Computer Science (Hons)",
      field: "Software Engineering",
      year: "Expected Jun 2026",
      cgpa: "3.67",
    },
    {
      school: "Sekolah Menengah Kebangsaan Damansara Jaya",
      degree: "Sijil Pelajaran Malaysia (SPM)",
      field: "",
      year: "2021",
      cgpa: "",
    },
  ],
  projects: [
    {
      name: "CareerLuhh",
      desc: "Built a full-stack career co-pilot platform using Next.js, TypeScript, and Tailwind CSS with multi-portal architecture (Student, Candidate, Employer). Deployed on Vercel.",
      tech: "Next.js, TypeScript, Tailwind CSS, Vercel",
      url: "careerluhh.vercel.app",
    },
    {
      name: "Kedai Online Inventory System",
      desc: "Designed and developed an inventory management system for a small business, reducing manual stock errors by 40%. Integrated real-time low-stock alerts.",
      tech: "React, Node.js, PostgreSQL, REST API",
    },
    {
      name: "MUET Prep Tracker",
      desc: "Mobile-responsive web app to help Malaysian students track and improve their MUET band scores with practice modules and progress visualisation.",
      tech: "React, Firebase, CSS Modules",
    },
  ],
  skills:
    "React, Next.js, TypeScript, JavaScript, Node.js, PostgreSQL, CSS, Tailwind CSS, Git, Figma, Agile / Scrum",
  certifications:
    "AWS Certified Cloud Practitioner (2025) · Meta Front-End Developer Certificate (Coursera, 2024) · MUET Band 4",
  activities:
    "Vice President, UiTM Computing Society (2024–2025) · Hackathon Participant, Talentbank Tech Hackathon 2026 · Tutor, UiTM Peer Learning Programme",
};

const AI_TIPS: Record<string, string> = {
  header:
    "Use a professional email — ideally name@university.edu.my or name@gmail.com. Never use a nickname. Add GitHub if you have projects to show.",
  objective:
    "3 things a great objective has: (1) your role/year/CGPA, (2) what you're applying for specifically, (3) one thing you bring. Keep it under 3 sentences. The AI wrote a draft — edit it to sound like you.",
  education:
    "If your CGPA is 3.5+, list it — it's a differentiator. Include Dean's List awards here. Skip secondary school once you have 2+ years of work experience.",
  projects:
    "Lead with impact over features: 'Reduced stock errors by 40%' is 10x stronger than 'Built a CRUD app'. If it's live, add the URL. List tech used so ATS systems can pick it up.",
  skills:
    "Only list skills you can confidently discuss in an interview. If you list Kubernetes but can't explain a pod, remove it. Group by category if you have 15+ skills.",
  certifications:
    "List certs in order of relevance to the job you're applying for. If your MUET band is 4+, list it — some GLC employers specifically filter for this.",
  activities:
    "Only include activities that show leadership, commitment, or relevance. 'Member of X' adds noise; 'Led 3 workshops attended by 80+ students' adds signal.",
};

function TipCard({ tip, section }: { tip: string; section: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border-2 border-yellow bg-yellow/10 p-2.5 text-xs"
    >
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

function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-preview"
      className="w-full bg-white p-8 text-[11px] leading-snug text-[#111] shadow-hard-lg"
      style={{ fontFamily: "Georgia, serif", minHeight: "842px" }}
    >
      {/* Header */}
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

      {/* Objective */}
      {data.objective && (
        <div className="mb-3">
          <SectionHead>Objective</SectionHead>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>
            {data.objective}
          </p>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-3">
          <SectionHead>Education</SectionHead>
          {data.education.map((e, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "10.5px" }}>
                  {e.school}
                </span>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "10px", color: "#555" }}>
                  {e.year}
                </span>
              </div>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", color: "#333" }}>
                {[e.degree, e.field].filter(Boolean).join(", ")}
                {e.cgpa && ` · CGPA: ${e.cgpa}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-3">
          <SectionHead>Projects</SectionHead>
          {data.projects.map((p, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "10.5px" }}>
                  {p.name}
                  {p.url && (
                    <span style={{ fontWeight: 400, fontSize: "9.5px", color: "#555" }}> · {p.url}</span>
                  )}
                </span>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "9.5px", color: "#666", fontStyle: "italic" }}>
                  {p.tech}
                </span>
              </div>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", color: "#333", marginTop: "1px" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-3">
          <SectionHead>Technical Skills</SectionHead>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>
            {data.skills}
          </p>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && (
        <div className="mb-3">
          <SectionHead>Certifications &amp; Language</SectionHead>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>
            {data.certifications}
          </p>
        </div>
      )}

      {/* Activities */}
      {data.activities && (
        <div className="mb-3">
          <SectionHead>Co-Curricular &amp; Activities</SectionHead>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "10.5px", lineHeight: "1.5" }}>
            {data.activities}
          </p>
        </div>
      )}
    </div>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        borderBottom: "1px solid #111",
        paddingBottom: "2px",
        marginBottom: "5px",
      }}
    >
      {children}
    </div>
  );
}

export default function StudentResumePage() {
  const [data, setData] = useState<ResumeData>(INITIAL);
  const [aiComplete, setAiComplete] = useState(false);
  const [generatingObjective, setGeneratingObjective] = useState(false);

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
      <p className="mb-6 max-w-2xl text-sm font-medium text-ink/60">
        Freshie? No worries. Fill in your details on the left — the live preview updates on the right.
        Click any AI tip for guidance on what to write.
      </p>

      {aiComplete && (
        <div className="mb-6">
          <AgentCard
            agentName="ResumeCoachAgent"
            status="complete"
            summary="Your objective has been drafted based on your profile. Sections with blue checkmarks are looking good. Don't forget to tailor the objective for each role you apply to."
          />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_520px]">
        {/* ── Form ── */}
        <div className="space-y-8">

          {/* Header info */}
          <section>
            <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-blue px-2 py-0.5 text-[10px] font-black uppercase text-white">01</span>
              <h2 className="font-black uppercase">Personal Info</h2>
            </div>
            <TipCard tip={AI_TIPS.header} section="Personal Info" />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(["name", "email", "phone", "location", "linkedin", "github"] as const).map((f) => (
                <div key={f}>
                  <label className="label-bauhaus">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                  <input className="input-bauhaus" value={data[f] as string} onChange={(e) => set(f, e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          {/* Objective */}
          <section>
            <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-red px-2 py-0.5 text-[10px] font-black uppercase text-white">02</span>
              <h2 className="font-black uppercase">Objective / Summary</h2>
            </div>
            <TipCard tip={AI_TIPS.objective} section="Objective" />
            <div className="mt-3 space-y-2">
              <textarea
                className="input-bauhaus h-24 resize-none"
                value={data.objective}
                onChange={(e) => set("objective", e.target.value)}
                placeholder="3 sentences: who you are, what you're applying for, what you bring."
              />
              <button
                onClick={generateObjective}
                disabled={generatingObjective}
                className="flex items-center gap-2 border-2 border-ink bg-yellow px-4 py-2 text-xs font-black uppercase hover:bg-yellow/70 disabled:opacity-50"
              >
                <Bot size={13} />
                {generatingObjective ? "Writing…" : "AI Draft Objective for me"}
              </button>
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-yellow px-2 py-0.5 text-[10px] font-black uppercase">03</span>
              <h2 className="font-black uppercase">Education</h2>
            </div>
            <TipCard tip={AI_TIPS.education} section="Education" />
            <div className="mt-3 space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="border-2 border-ink bg-canvas p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-ink/50">Education {i + 1}</span>
                    {data.education.length > 1 && (
                      <button onClick={() => set("education", data.education.filter((_, j) => j !== i))} className="text-red hover:underline text-xs">
                        <Trash2 size={13} />
                      </button>
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
              <button
                onClick={() => set("education", [...data.education, { school: "", degree: "", field: "", year: "", cgpa: "" }])}
                className="flex items-center gap-2 text-xs font-bold text-blue hover:underline"
              >
                <Plus size={13} /> Add education
              </button>
            </div>
          </section>

          {/* Projects */}
          <section>
            <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-blue px-2 py-0.5 text-[10px] font-black uppercase text-white">04</span>
              <h2 className="font-black uppercase">Projects</h2>
            </div>
            <TipCard tip={AI_TIPS.projects} section="Projects" />
            <div className="mt-3 space-y-4">
              {data.projects.map((proj, i) => (
                <div key={i} className="border-2 border-ink bg-canvas p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-ink/50">Project {i + 1}</span>
                    <button onClick={() => set("projects", data.projects.filter((_, j) => j !== i))} className="text-red">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input className="input-bauhaus" placeholder="Project Name" value={proj.name} onChange={(e) => setProj(i, "name", e.target.value)} />
                    <input className="input-bauhaus" placeholder="Tech Used (comma-separated)" value={proj.tech} onChange={(e) => setProj(i, "tech", e.target.value)} />
                  </div>
                  <input className="input-bauhaus" placeholder="Live URL (optional)" value={proj.url ?? ""} onChange={(e) => setProj(i, "url", e.target.value)} />
                  <textarea
                    className="input-bauhaus h-16 resize-none"
                    placeholder="What did it do? Lead with impact — 'Reduced X by Y%' is better than 'Built a CRUD app'"
                    value={proj.desc}
                    onChange={(e) => setProj(i, "desc", e.target.value)}
                  />
                </div>
              ))}
              <button
                onClick={() => set("projects", [...data.projects, { name: "", desc: "", tech: "" }])}
                className="flex items-center gap-2 text-xs font-bold text-blue hover:underline"
              >
                <Plus size={13} /> Add project
              </button>
            </div>
          </section>

          {/* Skills */}
          <section>
            <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-red px-2 py-0.5 text-[10px] font-black uppercase text-white">05</span>
              <h2 className="font-black uppercase">Skills</h2>
            </div>
            <TipCard tip={AI_TIPS.skills} section="Skills" />
            <textarea
              className="input-bauhaus mt-3 h-20 resize-none"
              placeholder="React, Next.js, TypeScript, Python, Figma, Git, SQL…"
              value={data.skills}
              onChange={(e) => set("skills", e.target.value)}
            />
          </section>

          {/* Certifications */}
          <section>
            <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-yellow px-2 py-0.5 text-[10px] font-black uppercase">06</span>
              <h2 className="font-black uppercase">Certifications &amp; Language</h2>
            </div>
            <TipCard tip={AI_TIPS.certifications} section="Certifications" />
            <textarea
              className="input-bauhaus mt-3 h-16 resize-none"
              placeholder="AWS Cloud Practitioner (2025) · Meta Front-End Certificate · MUET Band 4"
              value={data.certifications}
              onChange={(e) => set("certifications", e.target.value)}
            />
          </section>

          {/* Activities */}
          <section>
            <div className="mb-3 flex items-center gap-2 border-b-4 border-ink pb-2">
              <span className="border-2 border-ink bg-ink px-2 py-0.5 text-[10px] font-black uppercase text-white">07</span>
              <h2 className="font-black uppercase">Co-Curricular &amp; Activities</h2>
            </div>
            <TipCard tip={AI_TIPS.activities} section="Activities" />
            <textarea
              className="input-bauhaus mt-3 h-20 resize-none"
              placeholder="Vice President, UiTM Computing Society · Hackathon participant · Peer tutor"
              value={data.activities}
              onChange={(e) => set("activities", e.target.value)}
            />
          </section>

          {/* Print */}
          <div className="border-t-4 border-ink pt-6">
            <button
              onClick={() => window.print()}
              className="btn-blue w-full sm:w-auto"
            >
              <Printer size={16} /> Print / Save as PDF
            </button>
            <p className="mt-2 text-xs font-medium text-ink/50">
              Use browser Print → Save as PDF. Layout is optimised for A4.
            </p>
          </div>
        </div>

        {/* ── Live Preview ── */}
        <div className="print:block">
          <div className="sticky top-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-label">Live Preview</p>
              <button onClick={() => window.print()} className="flex items-center gap-1.5 border-2 border-ink px-3 py-1.5 text-xs font-bold uppercase hover:bg-yellow">
                <Printer size={12} /> Print
              </button>
            </div>
            <div className="overflow-auto border-4 border-ink">
              <div style={{ width: "520px" }}>
                <ResumePreview data={data} />
              </div>
            </div>
            <p className="mt-2 text-[10px] font-medium text-ink/40">
              Preview is live — edit the form to see changes here
            </p>
          </div>
        </div>
      </div>

      {/* Print CSS */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { position: fixed; top: 0; left: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
