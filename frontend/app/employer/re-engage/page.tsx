"use client";

import { useState } from "react";
import {
  MailOpen,
  Clock,
  Sparkles,
  Send,
  Edit3,
  Check,
  MessageSquare,
  X,
  Mail,
  Bell,
} from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { warmlist, reEngagement } from "@/lib/mock-data/employer";

interface ChatMessage {
  id: string;
  sender: "employer" | "candidate";
  senderName: string;
  text: string;
  sentAt: string;
  channel: "careerluhh" | "email";
}

const MOCK_REPLY: Record<string, ChatMessage[]> = {
  warm_1: [
    {
      id: "m1",
      sender: "employer",
      senderName: "You (TechNova)",
      text: "Hi Daniel, it's been about 18 months since we last spoke. I remember you were focused on building your data engineering skills at the time — looks like you've made great progress. We have a Senior Data Engineer role opening next month that I think is worth a conversation. Would a quick 20-minute call work for you?",
      sentAt: "Just now",
      channel: "careerluhh",
    },
    {
      id: "m2",
      sender: "candidate",
      senderName: "Daniel Wong",
      text: "Hey! Thanks for reaching out — I was actually just thinking about TechNova last week. The Data Engineer role sounds interesting. I'm open to a call. Thursday or Friday next week works well for me. Looking forward to hearing more.",
      sentAt: "2 hours later",
      channel: "careerluhh",
    },
  ],
};

export default function ReEngagePage() {
  const [selected, setSelected] = useState(warmlist[0].id);
  const [editMode, setEditMode] = useState(false);
  const [draftText, setDraftText] = useState("");
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [chatInput, setChatInput] = useState("");
  const [extraMessages, setExtraMessages] = useState<Record<string, ChatMessage[]>>({});

  const candidate = warmlist.find((w) => w.id === selected)!;
  const isSent = sentIds.has(selected);
  const baseDraft = reEngagement.messageDraft.replace("[Name]", candidate.name.split(" ")[0]);

  function initDraft() {
    setDraftText(baseDraft);
    setEditMode(true);
  }

  function sendMessage() {
    setSentIds((prev) => new Set([...prev, selected]));
    setEditMode(false);
  }

  function sendChatMessage() {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `extra_${Date.now()}`,
      sender: "employer",
      senderName: "You (TechNova)",
      text: chatInput.trim(),
      sentAt: "Just now",
      channel: "careerluhh",
    };
    setExtraMessages((prev) => ({
      ...prev,
      [selected]: [...(prev[selected] ?? []), newMsg],
    }));
    setChatInput("");
  }

  const thread = [
    ...(MOCK_REPLY[selected] ?? []),
    ...(extraMessages[selected] ?? []),
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-blue">The Diplomat · ReEngagementAgent</p>
      <h1 className="text-heading mb-2">
        The Warmlist<span className="text-yellow">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        The best hire is often someone you already said no to — for reasons that
        no longer apply. The Diplomat tracks them and drafts the re-opener.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* Warmlist */}
        <div className="space-y-4">
          {warmlist.map((w) => (
            <button
              key={w.id}
              onClick={() => { setSelected(w.id); setEditMode(false); }}
              className={`card-sm w-full text-left transition-all ${
                selected === w.id ? "bg-yellow" : "card-hover bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-black uppercase">{w.name}</p>
                  <p className="text-sm font-bold text-blue">{w.lastRole}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {sentIds.has(w.id) && (
                    <span className="agent-badge-complete text-[9px]"><Check size={9} /> Sent</span>
                  )}
                  {w.priority === "high" && !sentIds.has(w.id) && (
                    <span className="agent-badge-alert">High</span>
                  )}
                </div>
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-ink/50">
                <Clock size={11} className="mr-1 inline" />
                Last contact {w.lastContact} · {w.rejectionReason}
              </p>
              <p className="mt-1 border-l-4 border-red pl-2 text-xs font-semibold">
                Matches: {w.matchedOpening}
              </p>
            </button>
          ))}
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Draft card */}
          <AgentCard
            agentName="The Diplomat"
            codeName={isSent ? "Message sent" : "Draft ready"}
            status={isSent ? "complete" : "complete"}
            accent="blue"
          >
            <p className="mb-1 text-label text-ink/50">Re-engaging</p>
            <p className="mb-4 text-xl font-black uppercase">{candidate.name}</p>

            {/* Subject */}
            <p className="border-2 border-ink bg-canvas px-4 py-2 text-sm font-black">
              Subject: {reEngagement.subjectLine.replace("[Company]", "TechNova")}
            </p>

            {/* Message body */}
            {editMode ? (
              <div className="mt-4">
                <p className="text-label mb-2 flex items-center gap-1.5 text-blue">
                  <Edit3 size={12} /> Editing draft
                </p>
                <textarea
                  className="input-bauhaus h-40 w-full resize-none text-sm"
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                />
              </div>
            ) : (
              <p className="mt-4 text-sm font-medium leading-relaxed text-ink/70">
                {isSent
                  ? (extraMessages[selected]?.[0]?.text ?? baseDraft)
                  : baseDraft}
              </p>
            )}

            {/* Timing tip */}
            <p className="mt-4 flex items-start gap-1.5 border-l-4 border-yellow pl-2 text-xs font-semibold text-ink/60">
              <Sparkles size={12} className="mt-0.5 shrink-0" /> {reEngagement.sendTiming}
            </p>

            {/* Actions */}
            {!isSent ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {editMode ? (
                  <>
                    <button
                      onClick={sendMessage}
                      className="flex items-center gap-1.5 border-2 border-ink bg-blue px-4 py-2 text-xs font-black uppercase text-white hover:bg-blue/80"
                    >
                      <Send size={13} /> Send via CareerLuhh
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex items-center gap-1.5 border-2 border-ink px-4 py-2 text-xs font-black uppercase hover:bg-canvas"
                    >
                      <X size={13} /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={sendMessage}
                      className="flex items-center gap-1.5 border-2 border-ink bg-blue px-4 py-2 text-xs font-black uppercase text-white hover:bg-blue/80"
                    >
                      <Send size={13} /> Send (demo)
                    </button>
                    <button
                      onClick={initDraft}
                      className="flex items-center gap-1.5 border-2 border-ink bg-white px-4 py-2 text-xs font-black uppercase hover:bg-canvas"
                    >
                      <Edit3 size={13} /> Edit draft
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 border-2 border-blue bg-blue/5 px-4 py-2.5">
                  <Bell size={14} className="text-blue" />
                  <p className="text-xs font-semibold text-blue">
                    Sent via CareerLuhh — {candidate.name.split(" ")[0]} has been notified to check their inbox.
                  </p>
                </div>
                <div className="flex items-center gap-2 border-2 border-ink/20 bg-canvas px-4 py-2.5">
                  <Mail size={14} className="text-ink/50" />
                  <p className="text-xs font-semibold text-ink/50">
                    Email notification also sent: <span className="text-ink/70">"TechNova has sent you a message on CareerLuhh. Check your inbox."</span>
                  </p>
                </div>
              </div>
            )}
          </AgentCard>

          {/* Chatbox — shows after sending */}
          {isSent && thread.length > 0 && (
            <div className="border-4 border-ink bg-white">
              <div className="flex items-center gap-2 border-b-4 border-ink bg-ink px-4 py-3">
                <MessageSquare size={14} className="text-yellow" />
                <p className="text-xs font-black uppercase text-white tracking-wider">
                  CareerLuhh Inbox · {candidate.name}
                </p>
              </div>

              <div className="max-h-72 overflow-y-auto p-4 space-y-3">
                {thread.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "employer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] border-2 border-ink p-3 text-sm ${
                        msg.sender === "employer"
                          ? "bg-blue text-white"
                          : "bg-canvas text-ink"
                      }`}
                    >
                      <p className={`text-[10px] font-black uppercase mb-1 ${msg.sender === "employer" ? "text-white/60" : "text-ink/50"}`}>
                        {msg.senderName} · {msg.sentAt}
                      </p>
                      <p className="font-medium leading-snug">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 border-t-2 border-ink p-3">
                <input
                  className="input-bauhaus flex-1 py-2 text-sm"
                  placeholder="Type a reply…"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                />
                <button
                  onClick={sendChatMessage}
                  className="border-2 border-ink bg-blue px-4 py-2 text-xs font-black uppercase text-white hover:bg-blue/80"
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
