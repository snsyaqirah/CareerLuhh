// Reusable card frame that credits which AI agent produced its content.

export function AgentCard({
  agentName,
  codeName,
  status = "complete",
  accent = "blue",
  children,
  className = "",
}: {
  agentName: string;
  codeName: string;
  status?: "idle" | "running" | "complete" | "alert";
  accent?: "blue" | "red" | "yellow";
  children: React.ReactNode;
  className?: string;
}) {
  const dot = { blue: "bg-blue", red: "bg-red", yellow: "bg-yellow" }[accent];
  const badge = {
    idle: "agent-badge-idle",
    running: "agent-badge-running",
    complete: "agent-badge-complete",
    alert: "agent-badge-alert",
  }[status];
  return (
    <div className={`card ${className}`}>
      <span className={`absolute right-4 top-4 h-3 w-3 ${dot} border-2 border-ink`} />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className={badge}>{agentName}</span>
        <span className="text-label text-ink/40">{codeName}</span>
      </div>
      {children}
    </div>
  );
}
