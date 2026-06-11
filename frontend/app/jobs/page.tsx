import Link from "next/link";
import { MapPin, Banknote, Search, ArrowRight } from "lucide-react";
import { LogoWordmark } from "@/components/bauhaus/GeometricLogo";
import { jobListings } from "@/lib/mock-data/jobs";
import { DemoGuide } from "@/components/shared/DemoGuide";

function fmtSalary(min: number, max: number) {
  return `RM${(min / 1000).toFixed(0)}k – RM${(max / 1000).toFixed(0)}k`;
}

const MODE_COLOR: Record<string, string> = {
  remote: "bg-yellow text-ink",
  hybrid: "bg-canvas text-ink border-ink",
  onsite: "bg-blue text-white",
};

export default function PublicJobsPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <DemoGuide pathname="/jobs" />
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b-4 border-ink bg-white px-5 py-4 md:px-10">
        <Link href="/"><LogoWordmark /></Link>
        <nav className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm font-bold uppercase tracking-wider hover:underline sm:block">Log In</Link>
          <Link href="/register" className="btn-red px-4 py-2 text-xs">Get Started</Link>
        </nav>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-12 md:px-10">
        {/* Hero */}
        <div className="mb-10">
          <p className="text-label mb-2 text-blue">{jobListings.length} open roles</p>
          <h1 className="text-heading mb-4">Browse Jobs<span className="text-red">.</span></h1>
          <p className="mb-6 max-w-2xl text-sm font-medium text-ink/60">
            Real roles from top Malaysian companies. Log in to see your AI match score, skills gap, and interview tips for each role — or apply directly.
          </p>

          {/* Search hint */}
          <div className="flex items-center gap-3 border-2 border-ink bg-white px-4 py-3 max-w-lg">
            <Search size={16} className="shrink-0 text-ink/40" />
            <span className="text-sm font-medium text-ink/40">Search by title, company, or skill…</span>
            <Link href="/login" className="ml-auto shrink-0 border-2 border-blue bg-blue px-3 py-1 text-xs font-black uppercase text-white">
              Log in to search
            </Link>
          </div>
        </div>

        {/* Job grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {jobListings.map((job) => (
            <div key={job.id} className="card border-2 border-ink hover:shadow-hard transition-shadow">
              {/* Top */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-black uppercase leading-tight">{job.title}</h2>
                  <p className="text-sm font-bold text-blue">{job.company}</p>
                </div>
                <span className={`shrink-0 border-2 border-ink px-2 py-0.5 text-[10px] font-black uppercase ${MODE_COLOR[job.mode] ?? "bg-canvas text-ink"}`}>
                  {job.mode}
                </span>
              </div>

              {/* Meta */}
              <div className="mb-3 flex flex-wrap gap-3 text-xs font-bold text-ink/50">
                <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                <span className="flex items-center gap-1"><Banknote size={11} /> {fmtSalary(job.salaryMin, job.salaryMax)}</span>
                <span className="border border-ink/20 px-1.5 py-0.5 text-[10px] uppercase">{job.category}</span>
              </div>

              {/* Description */}
              <p className="mb-3 text-xs font-medium leading-relaxed text-ink/60 line-clamp-2">
                {job.description}
              </p>

              {/* Skills */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {job.skills.slice(0, 4).map((s) => (
                  <span key={s} className="border border-ink/20 px-1.5 py-0.5 text-[10px] font-bold uppercase">
                    {s}
                  </span>
                ))}
                {job.skills.length > 4 && (
                  <span className="text-[10px] font-bold text-ink/40">+{job.skills.length - 4} more</span>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between border-t border-ink/10 pt-3">
                <span className="text-[10px] font-medium text-ink/40">Posted {job.postedAt}</span>
                <Link href="/register" className="flex items-center gap-1.5 border-2 border-ink bg-blue px-3 py-1.5 text-xs font-black uppercase text-white hover:bg-blue/80">
                  Apply <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Login upsell */}
        <div className="mt-12 border-4 border-ink bg-blue p-8 text-white">
          <p className="text-label mb-2 text-yellow">Get more when you sign in</p>
          <h2 className="text-heading mb-4 max-w-xl">
            See your match score, skills gap, and interview tips for every role.
          </h2>
          <div className="grid gap-3 sm:grid-cols-3 mb-6">
            {[
              ["AI Match Score", "% match based on your skills + trajectory"],
              ["Skills Gap", "Exactly which skills you're missing for each role"],
              ["Interview Tips", "Company-specific prep — not generic advice"],
            ].map(([title, desc]) => (
              <div key={title as string} className="border-2 border-white/30 p-3">
                <p className="font-black uppercase text-sm mb-1">{title}</p>
                <p className="text-xs font-medium text-white/70">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/register" className="flex items-center gap-2 border-2 border-white bg-white px-5 py-2.5 text-sm font-black uppercase text-ink hover:bg-yellow">
              Create Free Account <ArrowRight size={15} />
            </Link>
            <Link href="/login" className="flex items-center gap-2 border-2 border-white px-5 py-2.5 text-sm font-black uppercase text-white hover:bg-white/10">
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t-4 border-ink bg-ink px-5 py-8 text-white md:flex-row md:px-10">
        <LogoWordmark light />
        <div className="flex gap-6 text-xs font-bold text-white/50">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/" className="hover:text-white">Home</Link>
        </div>
      </footer>
    </main>
  );
}
