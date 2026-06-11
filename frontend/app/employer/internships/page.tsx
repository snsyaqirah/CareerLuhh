"use client";

import { useState } from "react";
import { Plus, X, MapPin, Clock, Banknote, Users } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { internshipListings } from "@/lib/mock-data/employer";

export default function EmployerInternshipsPage() {
  const [listings, setListings] = useState(internshipListings);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [allowance, setAllowance] = useState("800");

  function addListing(e: React.FormEvent) {
    e.preventDefault();
    setListings((s) => [
      {
        id: `list_${Date.now()}`,
        title,
        mode: "hybrid",
        location: "Kuala Lumpur",
        durationMonths: 6,
        allowance: Number(allowance) || 800,
        skillsNeeded: [],
        applicants: 0,
        topMatchScore: 0,
        isActive: true,
        postedAt: "Just now",
      },
      ...s,
    ]);
    setTitle("");
    setShowForm(false);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label mb-1 text-red">Internship Listings</p>
          <h1 className="text-heading mb-2">
            Build Your Pipeline<span className="text-blue">.</span>
          </h1>
          <p className="max-w-xl text-sm font-medium text-ink/60">
            Post once — The Recruiter matches students by trajectory and shows
            them your absorption rate, so high-intent applicants self-select.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-yellow px-4 py-2 text-xs">
          {showForm ? <X size={14} /> : <Plus size={14} />} {showForm ? "Cancel" : "Post Listing"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addListing} className="card mb-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-bauhaus">Role title</label>
              <input
                className="input-bauhaus"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Backend Developer Intern"
              />
            </div>
            <div>
              <label className="label-bauhaus">Allowance (RM/month)</label>
              <input
                className="input-bauhaus"
                type="number"
                value={allowance}
                onChange={(e) => setAllowance(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-red px-5 py-2 text-xs">
            Publish (demo) <Plus size={14} />
          </button>
        </form>
      )}

      <div className="space-y-6">
        {listings.map((l) => (
          <AgentCard
            key={l.id}
            agentName={l.isActive ? "Active" : "Closed"}
            codeName={`Posted ${l.postedAt}`}
            status={l.isActive ? "complete" : "idle"}
            accent={l.isActive ? "blue" : "red"}
            className="card-hover"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-md">
                <h2 className="text-xl font-black uppercase">{l.title}</h2>
                {l.skillsNeeded.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {l.skillsNeeded.map((s) => (
                      <span key={s} className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-3 flex items-center gap-2 text-sm font-bold text-red">
                  <Users size={14} /> {l.applicants} applicants
                  {l.topMatchScore > 0 && ` · top match ${l.topMatchScore}%`}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm font-bold">
                <span className="flex items-center gap-2">
                  <MapPin size={14} /> {l.location} · {l.mode}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} /> {l.durationMonths} months
                </span>
                <span className="flex items-center gap-2">
                  <Banknote size={14} /> RM{l.allowance}/month
                </span>
              </div>
            </div>
          </AgentCard>
        ))}
      </div>
    </div>
  );
}
