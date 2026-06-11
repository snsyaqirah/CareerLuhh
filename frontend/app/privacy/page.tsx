import Link from "next/link";
import { LogoWordmark } from "@/components/bauhaus/GeometricLogo";
import { Shield, Database, Users, Mail, Trash2, Eye, Lock, AlertTriangle } from "lucide-react";

function Section({ id, title, icon, children }: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <div className="mb-4 flex items-center gap-3 border-b-4 border-ink pb-3">
        <span className="border-2 border-ink bg-blue p-2 text-white">{icon}</span>
        <h2 className="text-xl font-black uppercase">{title}</h2>
      </div>
      <div className="space-y-3 text-sm font-medium leading-relaxed text-ink/80">
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid border-b border-ink/10 py-2 sm:grid-cols-[180px_1fr]">
      <span className="font-bold text-ink/60 text-xs uppercase tracking-wide">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b-4 border-ink bg-white px-5 py-4 md:px-10">
        <Link href="/"><LogoWordmark /></Link>
        <Link href="/register" className="btn-blue px-4 py-2 text-xs">Get Started</Link>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-12 md:px-10">
        {/* Title */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-ink bg-blue px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white">
            <Shield size={14} /> PDPA Compliant
          </div>
          <h1 className="text-heading mb-3">Privacy Policy</h1>
          <p className="text-sm font-medium text-ink/60">
            Last updated: 12 June 2026 · CareerLuhh is committed to protecting your personal data
            in accordance with Malaysia&apos;s <strong>Personal Data Protection Act 2010 (PDPA)</strong>.
          </p>
          <p className="mt-3 text-sm font-medium text-ink/60">
            This policy is written in plain language. If you have questions, contact us at{" "}
            <a href="mailto:privacy@careerluhh.my" className="font-bold text-blue underline underline-offset-2">
              privacy@careerluhh.my
            </a>.
          </p>
        </div>

        {/* Quick nav */}
        <div className="mb-12 border-2 border-ink bg-white p-5">
          <p className="text-label mb-3">Jump to section</p>
          <div className="grid gap-1 text-sm font-bold sm:grid-cols-2">
            {[
              ["#data-collected", "1. What data we collect"],
              ["#why-collected", "2. Why we collect it"],
              ["#how-long", "3. How long we keep it"],
              ["#third-parties", "4. Third parties"],
              ["#your-rights", "5. Your rights"],
              ["#security", "6. How we protect your data"],
              ["#consent", "7. Consent & withdrawal"],
              ["#contact", "8. Contact us"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-blue hover:underline underline-offset-2">
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* 1. What data */}
        <Section id="data-collected" title="What Personal Data We Collect" icon={<Database size={16} />}>
          <p>When you use CareerLuhh, we may collect the following types of personal data:</p>
          <div className="mt-4 space-y-1 border-2 border-ink bg-white p-4">
            <Row label="Identity" value="Full name, display name" />
            <Row label="Contact" value="Email address" />
            <Row label="Account" value="Password (hashed with bcrypt — never stored in plain text in Stage 2)" />
            <Row label="Professional" value="Current/last job title, years of experience, employment status, employer name, industry" />
            <Row label="Academic" value="University, programme, field of study, CGPA, subject grades (transcript)" />
            <Row label="Portfolio" value="Project descriptions, GitHub profile URL, certifications, tech skills, certificate IDs" />
            <Row label="Location" value="City/state of residence, willingness to relocate — not GPS coordinates" />
            <Row label="Usage" value="Pages visited, features used, application history — no advertising profiling" />
            <Row label="Platform activity (staff, with consent)" value="If you are a staff member invited by your employer and give explicit consent, your CareerLuhh activity (profile updates, job listing views, salary benchmark searches) is shared with your linked employer account. You can revoke this consent at any time in Settings." />
            <Row label="In-platform messages" value="Messages sent or received through CareerLuhh's in-platform messaging system (e.g. employer re-engagement messages). These are stored on our servers and visible to both parties in the conversation." />
          </div>
          <p className="mt-3 flex items-start gap-2 border-l-4 border-yellow pl-3 text-xs">
            <AlertTriangle size={13} className="mt-0.5 shrink-0" />
            <span><strong>Stage 1 (current):</strong> All data is stored in your browser&apos;s localStorage only. No server database exists yet. Data is cleared when you clear browser storage. Stage 2 will use an encrypted PostgreSQL database on Neon.</span>
          </p>
        </Section>

        {/* 2. Why */}
        <Section id="why-collected" title="Why We Collect Your Data" icon={<Eye size={16} />}>
          <p>We collect your personal data only for the following purposes:</p>
          <ul className="mt-2 space-y-2">
            {[
              ["Account creation & authentication", "To create your account, verify your identity, and keep your session secure."],
              ["Career profile building", "To generate your Career Profile used by our AI agents to surface relevant paths, jobs, and salary benchmarks."],
              ["Job matching", "To match your profile to relevant job listings based on your trajectory, skills, and preferences."],
              ["AI agent personalisation", "To provide trajectory-based recommendations (PathfinderAgent, JobMatchAgent, etc.) that are accurate to your situation."],
              ["Platform improvement", "To understand how users interact with the platform and improve features — aggregated and anonymised."],
              ["Employer retention signals (staff, opt-in only)", "If you join CareerLuhh via an employer's invite code and explicitly consent, selected platform activity signals (profile updates, job browsing frequency, salary benchmark searches) are shared with that employer to support workforce retention conversations. This is never done silently — you must consent, and you can revoke at any time."],
              ["In-platform messaging", "To deliver messages between employers and candidates through the CareerLuhh inbox. Message content is only accessible to the sender and recipient."],
              ["Communications (opt-in)", "If you consent, to send career updates, job alerts, or platform announcements. You can unsubscribe at any time."],
            ].map(([title, desc]) => (
              <li key={title as string} className="border-l-4 border-blue pl-3">
                <span className="font-bold">{title}:</span> {desc}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> sell your personal data to third parties. We do <strong>not</strong> use your data for advertising profiling.
          </p>
        </Section>

        {/* 3. How long */}
        <Section id="how-long" title="How Long We Keep Your Data" icon={<AlertTriangle size={16} />}>
          <div className="border-2 border-ink bg-white p-4 space-y-1">
            <Row label="Active account" value="Retained while your account is active" />
            <Row label="Deleted account" value="Anonymised or deleted within 30 days of your deletion request" />
            <Row label="Application history" value="Retained for 12 months after job closure, then anonymised" />
            <Row label="Usage logs" value="Rolling 90-day window, then deleted" />
            <Row label="Employer-posted jobs" value="Retained for 2 years after posting closure for audit purposes" />
          </div>
          <p className="mt-3">
            You may request early deletion at any time — see <a href="#your-rights" className="font-bold text-blue underline underline-offset-2">Your Rights</a>.
          </p>
        </Section>

        {/* 4. Third parties */}
        <Section id="third-parties" title="Third Parties Who Receive Your Data" icon={<Users size={16} />}>
          <div className="border-2 border-ink bg-white p-4 space-y-1">
            <Row label="Vercel (hosting)" value="Serves the application. Processes server logs including IP addresses. Data may be stored in US/EU. Privacy: vercel.com/legal/privacy-policy" />
            <Row label="Neon (database, Stage 2)" value="Stores your career profile data in PostgreSQL. AWS us-east-1 by default. Privacy: neon.tech/privacy" />
            <Row label="Google Gemini AI (Stage 2)" value="Processes career profile data to generate agent recommendations. Not stored by Google for training per API terms. Privacy: ai.google.dev/terms" />
            <Row label="Uploadthing (Stage 2)" value="Handles resume PDF uploads. Files stored in AWS S3. Privacy: uploadthing.com/privacy" />
            <Row label="Employers on platform" value="If you apply for a job, your name, email, and cover note are visible to that employer. Your full profile is only shared with explicit consent." />
          </div>
          <p className="mt-4 flex items-start gap-2 border-l-4 border-red pl-3 text-xs">
            <AlertTriangle size={13} className="mt-0.5 shrink-0 text-red" />
            <span>
              <strong>Employer–staff data sharing (The Watcher feature):</strong> If your employer uses CareerLuhh and invites you to join their company account, they may request access to your platform activity signals. This sharing only happens after your <strong>explicit, separate consent</strong> — it is not automatic. You can revoke this consent at any time in Settings without losing access to your personal CareerLuhh account. Your employer will not see the content of messages you send to other parties, salary details you have not shared, or any data outside the consented activity signals.
            </span>
          </p>
          <p className="mt-3">
            All third-party vendors are assessed for PDPA compliance. Data transfers outside Malaysia comply with PDPA Section 129 — transfers are only made to countries with adequate data protection laws or with your explicit consent.
          </p>
        </Section>

        {/* 5. Your rights */}
        <Section id="your-rights" title="Your Rights Under PDPA" icon={<Shield size={16} />}>
          <p>Under Malaysia&apos;s PDPA 2010, you have the following rights:</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ["Access", "Request a copy of all personal data we hold about you."],
              ["Correction", "Request that incorrect or outdated data be corrected."],
              ["Deletion", "Request that your account and all associated personal data be deleted (right to erasure)."],
              ["Withdraw Consent", "Withdraw consent to data processing at any time. This will not affect data processed before withdrawal."],
              ["Restrict Processing", "Request that we stop using your data for specific purposes (e.g. marketing)."],
              ["Data Portability", "Request your data in a machine-readable format (JSON or CSV)."],
            ].map(([right, desc]) => (
              <div key={right as string} className="border-2 border-ink p-3">
                <p className="mb-1 font-black uppercase text-xs tracking-wide">{right}</p>
                <p className="text-xs">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 border-2 border-ink bg-yellow/10 p-4">
            <Trash2 size={16} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-black uppercase text-sm">Delete Your Account</p>
              <p className="mt-1 text-xs">
                Go to <strong>Settings → Delete Account</strong> in your portal. You must type &ldquo;DELETE&rdquo; to confirm — this removes all locally stored data immediately (Stage 1). Stage 2: deletion propagates to the database within 30 days. You can also email{" "}
                <a href="mailto:privacy@careerluhh.my" className="font-bold text-blue underline underline-offset-2">privacy@careerluhh.my</a>.
              </p>
            </div>
          </div>
          <p className="mt-3">
            To exercise any of these rights, email{" "}
            <a href="mailto:privacy@careerluhh.my" className="font-bold text-blue underline underline-offset-2">
              privacy@careerluhh.my
            </a>{" "}
            with your request. We will respond within <strong>21 days</strong> as required by PDPA.
          </p>
        </Section>

        {/* 6. Security */}
        <Section id="security" title="How We Protect Your Data" icon={<Lock size={16} />}>
          <div className="space-y-2">
            {[
              ["HTTPS everywhere", "All data transmitted between your browser and our servers is encrypted using TLS 1.2+. Enforced by Vercel."],
              ["Password hashing", "Stage 2: passwords are hashed with bcrypt (cost factor 12) before storage. Plaintext passwords are never stored."],
              ["Database encryption", "Stage 2: Neon PostgreSQL encrypts data at rest using AES-256."],
              ["Access control", "Stage 2: database access is restricted by role — only your own data is accessible via API routes."],
              ["Security headers", "All responses include: HSTS, X-Content-Type-Options, X-Frame-Options, Content-Security-Policy, Referrer-Policy, Permissions-Policy."],
              ["No debug routes in production", "Admin and debug endpoints are blocked in production. Error responses show generic messages only."],
            ].map(([title, desc]) => (
              <div key={title as string} className="flex items-start gap-3 border-l-4 border-blue pl-3">
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="text-xs text-ink/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 7. Consent */}
        <Section id="consent" title="Consent & How to Withdraw It" icon={<Shield size={16} />}>
          <p>
            We collect your personal data only after you give explicit consent during registration. Your consent is recorded with a timestamp when you check the consent box and create your account.
          </p>
          <p className="mt-2">
            <strong>You can withdraw consent at any time</strong> by deleting your account or by emailing us. Withdrawal of consent does not affect the lawfulness of processing based on consent before withdrawal.
          </p>
          <p className="mt-2">
            Consent to receive marketing communications (job alerts, platform news) is separate and optional. You can opt out at any time via the unsubscribe link in any email.
          </p>
        </Section>

        {/* 8. Contact */}
        <Section id="contact" title="Contact for Privacy Requests" icon={<Mail size={16} />}>
          <div className="border-2 border-ink bg-white p-5">
            <p className="font-black uppercase mb-1">Data Controller</p>
            <p>CareerLuhh · Talentbank First Cohort 2026</p>
            <p className="mt-3 font-black uppercase mb-1">Privacy Contact</p>
            <a href="mailto:privacy@careerluhh.my" className="font-bold text-blue underline underline-offset-2">
              privacy@careerluhh.my
            </a>
            <p className="mt-3 text-xs text-ink/60">
              Response time: within 21 days as required by PDPA 2010.
            </p>
          </div>
          <p className="mt-4 text-xs text-ink/50">
            This privacy policy may be updated periodically. Material changes will be communicated via email or a notice on the platform. The date at the top of this page reflects the most recent update.
          </p>
        </Section>

        {/* Footer nav */}
        <div className="border-t-4 border-ink pt-8 flex flex-wrap gap-4 text-sm font-bold">
          <Link href="/" className="text-blue hover:underline">← Back to Home</Link>
          <Link href="/register" className="text-blue hover:underline">Create Account</Link>
          <Link href="/login" className="text-blue hover:underline">Log In</Link>
        </div>
      </div>

      <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t-4 border-ink bg-ink px-5 py-8 text-white md:flex-row md:px-10">
        <LogoWordmark light />
        <p className="text-xs font-medium text-white/50">
          CareerLuhh · PDPA 2010 Compliant · privacy@careerluhh.my
        </p>
      </footer>
    </main>
  );
}
