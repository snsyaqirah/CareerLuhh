"use client";

import { useState } from "react";
import { FolderGit2, GitBranch, Award, Trophy, Plus, Sparkles, X } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { portfolioItems, type PortfolioItem } from "@/lib/mock-data/student";

const TYPE_META: Record<PortfolioItem["type"], { icon: React.ReactNode; label: string; color: string }> = {
  project: { icon: <FolderGit2 size={16} />, label: "Project", color: "bg-blue text-white" },
  github: { icon: <GitBranch size={16} />, label: "GitHub", color: "bg-ink text-white" },
  cert: { icon: <Award size={16} />, label: "Certificate", color: "bg-yellow text-ink" },
  competition: { icon: <Trophy size={16} />, label: "Competition", color: "bg-red text-white" },
};

export default function PortfolioPage() {
  const [items, setItems] = useState(portfolioItems);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState<PortfolioItem["type"]>("project");

  function addItem(e: React.FormEvent) {
    e.preventDefault();
    setItems((s) => [
      {
        id: `pf_${Date.now()}`,
        type,
        title,
        description: desc,
        skillsUsed: [],
        date: "Just now",
        aiSummary:
          "The Auditor will summarise this for employers once Stage 2 agents are live — for now it counts toward your readiness score.",
      },
      ...s,
    ]);
    setTitle("");
    setDesc("");
    setShowForm(false);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label mb-1 text-blue">Living Portfolio</p>
          <h1 className="text-heading mb-2">
            Proof, not promises<span className="text-red">.</span>
          </h1>
          <p className="max-w-xl text-sm font-medium text-ink/60">
            Everything here feeds your readiness score and follows you from
            student to senior — you never start from scratch again.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-yellow px-4 py-2 text-xs">
          {showForm ? <X size={14} /> : <Plus size={14} />} {showForm ? "Cancel" : "Add Item"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addItem} className="card mb-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-bauhaus">Type</label>
              <select
                className="input-bauhaus"
                value={type}
                onChange={(e) => setType(e.target.value as PortfolioItem["type"])}
              >
                <option value="project">Project</option>
                <option value="github">GitHub</option>
                <option value="cert">Certificate</option>
                <option value="competition">Competition</option>
              </select>
            </div>
            <div>
              <label className="label-bauhaus">Title</label>
              <input
                className="input-bauhaus"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Personal finance tracker"
              />
            </div>
          </div>
          <div>
            <label className="label-bauhaus">Description</label>
            <input
              className="input-bauhaus"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="One line on what it is and what you used"
            />
          </div>
          <button type="submit" className="btn-blue px-5 py-2 text-xs">
            Add to Portfolio <Plus size={14} />
          </button>
        </form>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => {
          const meta = TYPE_META[item.type];
          return (
            <AgentCard
              key={item.id}
              agentName={meta.label}
              codeName={item.date}
              accent={item.type === "cert" ? "yellow" : item.type === "competition" ? "red" : "blue"}
              className="card-hover"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={`border-2 border-ink p-2 ${meta.color}`}>{meta.icon}</span>
                <h2 className="text-lg font-black uppercase leading-tight">{item.title}</h2>
              </div>
              <p className="mb-3 text-sm font-medium text-ink/70">{item.description}</p>
              {item.skillsUsed.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {item.skillsUsed.map((s) => (
                    <span key={s} className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <p className="flex items-start gap-1.5 border-l-4 border-yellow pl-2 text-xs font-semibold text-ink/60">
                <Sparkles size={12} className="mt-0.5 shrink-0" /> {item.aiSummary}
              </p>
            </AgentCard>
          );
        })}
      </div>
    </div>
  );
}
