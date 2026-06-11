import Link from "next/link";
import { Megaphone, ArrowRight } from "lucide-react";

const URGENCY_STYLE = {
  low: "bg-soft text-ink",
  medium: "bg-yellow text-ink",
  high: "bg-red text-white",
};

export function CoachAlert({
  message,
  urgency,
  actionLabel,
  actionUrl,
}: {
  message: string;
  urgency: "low" | "medium" | "high";
  actionLabel: string;
  actionUrl: string;
}) {
  return (
    <div className={`relative border-4 border-ink p-6 shadow-hard-lg ${URGENCY_STYLE[urgency]}`}>
      <div className="mb-3 flex items-center justify-between">
        <span className="agent-badge bg-white text-ink">
          <Megaphone size={13} /> The Advisor · CoachAgent
        </span>
        <span className="text-label opacity-70">urgency: {urgency}</span>
      </div>
      <p className="mb-5 max-w-2xl text-lg font-semibold leading-snug">{message}</p>
      <Link href={actionUrl} className="btn-white inline-flex">
        {actionLabel} <ArrowRight size={15} />
      </Link>
    </div>
  );
}
