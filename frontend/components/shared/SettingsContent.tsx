"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { User, Mail, Shield, Download, Trash2, Check, AlertTriangle } from "lucide-react";

export function SettingsContent() {
  const { user, updateProfile, deleteAccount, logout } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name ?? "");
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  if (!user) return null;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    updateProfile({ name: name.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleDelete() {
    if (deleteInput !== "DELETE") return;
    deleteAccount();
    logout();
    router.push("/");
  }

  function exportData() {
    const data = {
      profile: user,
      appliedJobs: JSON.parse(localStorage.getItem("applied_jobs") ?? "[]"),
      savedJobs: JSON.parse(localStorage.getItem("saved_jobs") ?? "[]"),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `careerluhh-data-${user?.email}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div>
        <p className="text-label mb-1 text-blue">Account Settings</p>
        <h1 className="text-heading">Your Profile<span className="text-red">.</span></h1>
      </div>

      {/* Edit profile */}
      <section className="card space-y-5">
        <div className="flex items-center gap-2 border-b-4 border-ink pb-3">
          <User size={16} />
          <h2 className="font-black uppercase">Edit Profile</h2>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label-bauhaus">Display Name</label>
            <input
              className="input-bauhaus"
              value={name}
              onChange={(e) => { setName(e.target.value); setSaved(false); }}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="label-bauhaus">Email</label>
            <input className="input-bauhaus bg-canvas text-ink/50 cursor-not-allowed" value={user.email} readOnly />
            <p className="mt-1 text-xs font-medium text-ink/40">Email cannot be changed in Stage 1.</p>
          </div>
          <div>
            <label className="label-bauhaus">Role</label>
            <input className="input-bauhaus bg-canvas text-ink/50 cursor-not-allowed capitalize" value={user.role} readOnly />
            <p className="mt-1 text-xs font-medium text-ink/40">To switch portals, log out and log in with a different account.</p>
          </div>
          <div>
            <label className="label-bauhaus">Password</label>
            <input className="input-bauhaus bg-canvas text-ink/50 cursor-not-allowed" value="••••••••" readOnly />
            <p className="mt-1 text-xs font-medium text-ink/40">Password change available in Stage 2.</p>
          </div>

          <button type="submit" className="btn-blue">
            {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
          </button>
        </form>
      </section>

      {/* Privacy & data */}
      <section className="card space-y-5">
        <div className="flex items-center gap-2 border-b-4 border-ink pb-3">
          <Shield size={16} />
          <h2 className="font-black uppercase">Privacy &amp; Data</h2>
        </div>

        <p className="text-sm font-medium text-ink/60">
          Your data is stored in your browser&apos;s localStorage only (Stage 1).
          Under Malaysia&apos;s PDPA 2010, you have the right to export or delete your data at any time.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="/privacy" target="_blank" className="btn-ghost text-xs px-4 py-2 flex items-center gap-1.5">
            <Shield size={13} /> Read Privacy Policy
          </a>
          <button
            onClick={exportData}
            className="flex items-center gap-1.5 border-2 border-ink px-4 py-2 text-xs font-bold uppercase hover:bg-yellow"
          >
            <Download size={13} /> Export My Data (JSON)
          </button>
        </div>
      </section>

      {/* Danger zone */}
      <section className="card space-y-5 border-2 border-red">
        <div className="flex items-center gap-2 border-b-4 border-red pb-3">
          <Trash2 size={16} className="text-red" />
          <h2 className="font-black uppercase text-red">Danger Zone</h2>
        </div>

        {!showDeleteConfirm ? (
          <div>
            <p className="mb-3 text-sm font-medium text-ink/60">
              Permanently delete your account and all associated data (applications, saved jobs, portfolio entries). This cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 border-2 border-red px-4 py-2 text-xs font-bold uppercase text-red hover:bg-red hover:text-white"
            >
              <Trash2 size={13} /> Delete Account
            </button>
          </div>
        ) : (
          <div className="space-y-4 border-2 border-red bg-red/5 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red" />
              <p className="text-sm font-bold">
                This will delete your profile, all applications, saved jobs, and portfolio data permanently.
              </p>
            </div>
            <div>
              <label className="label-bauhaus">Type DELETE to confirm</label>
              <input
                className="input-bauhaus border-red"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder="DELETE"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteConfirm(false); setDeleteInput(""); }}
                className="btn-ghost flex-1 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteInput !== "DELETE"}
                className="flex flex-1 items-center justify-center gap-2 border-2 border-red bg-red px-4 py-2 text-xs font-bold uppercase text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 size={13} /> Confirm Delete
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
