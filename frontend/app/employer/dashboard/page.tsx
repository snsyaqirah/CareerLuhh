import Link from "next/link";
import { ArrowRight, Radar, Eye, MailOpen, UserPlus } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import {
  employerProfile,
  talentRadar,
  retentionAlerts,
  reEngagement,
  onboardingCheck,
} from "@/lib/mock-data/employer";

export default function EmployerDashboard() {
  const alert = retentionAlerts[0];
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-label mb-1 text-yellow">Employer Dashboard</p>
      <h1 className="text-heading mb-2">
        {employerProfile.companyName}<span className="text-red">.</span>
      </h1>
      <p className="mb-8 text-sm font-medium text-ink/60">
        {employerProfile.industry} · {employerProfile.size}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Talent radar digest */}
        <AgentCard agentName="The Scout" codeName="TalentRadarAgent" accent="blue">
          <p className="mb-4 flex items-center gap-2 font-black uppercase">
            <Radar size={16} /> Weekly talent digest
          </p>
          <div className="space-y-4">
            {talentRadar.weeklyDigest.map((t) => (
              <div key={t.candidateId} className="border-2 border-ink bg-canvas p-4">
                <p className="font-black uppercase">{t.name}</p>
                <p className="mt-1 text-sm font-medium text-ink/70">{t.highlight}</p>
                <p className="mt-2 border-l-4 border-yellow pl-2 text-xs font-bold uppercase tracking-wide text-ink/60">
                  {t.whyFlag}
                </p>
              </div>
            ))}
          </div>
          <Link href="/employer/search" className="btn-blue mt-5 px-4 py-2 text-xs">
            Search by trajectory <ArrowRight size={14} />
          </Link>
        </AgentCard>

        <div className="flex flex-col gap-8">
          {/* Retention alert */}
          <AgentCard agentName="The Watcher" codeName="RetentionSignalAgent" status="alert" accent="red">
            <p className="mb-2 flex items-center gap-2 font-black uppercase">
              <Eye size={16} /> Retention alert ·{" "}
              <span className="text-red">{alert.riskLevel} risk</span>
            </p>
            <p className="font-black">{alert.name}</p>
            <ul className="mt-2 space-y-1 text-sm font-medium text-ink/70">
              {alert.signals.map((s) => (
                <li key={s} className="border-l-4 border-red pl-2">{s}</li>
              ))}
            </ul>
            <p className="mt-3 border-2 border-ink bg-yellow/40 p-3 text-sm font-semibold">
              {alert.recommendedAction}
            </p>
          </AgentCard>

          {/* Onboarding pulse */}
          <AgentCard agentName="The Buddy" codeName="OnboardingAgent" accent="yellow">
            <p className="mb-2 flex items-center gap-2 font-black uppercase">
              <UserPlus size={16} /> Day-{onboardingCheck.checkInDay} check-in
            </p>
            <p className="text-sm font-medium text-ink/70">
              <span className="font-black text-ink">{onboardingCheck.name}</span> · risk
              score {onboardingCheck.riskScore}/100 — {onboardingCheck.managerAction}
            </p>
          </AgentCard>
        </div>
      </div>

      {/* Re-engagement draft */}
      <div className="mt-8">
        <AgentCard agentName="The Diplomat" codeName="ReEngagementAgent" accent="blue">
          <p className="mb-3 flex items-center gap-2 font-black uppercase">
            <MailOpen size={16} /> Warmlist draft ready
          </p>
          <p className="border-2 border-ink bg-canvas px-4 py-2 text-sm font-black">
            Subject: {reEngagement.subjectLine}
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-ink/70">
            {reEngagement.messageDraft}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wide">
            <span className="agent-badge-running">{reEngagement.sendTiming}</span>
            <span className="agent-badge-idle">{reEngagement.notes}</span>
          </div>
        </AgentCard>
      </div>
    </div>
  );
}
