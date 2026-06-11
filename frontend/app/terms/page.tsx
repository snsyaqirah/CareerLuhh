import Link from "next/link";
import { LogoWordmark } from "@/components/bauhaus/GeometricLogo";
import { FileText } from "lucide-react";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="mb-3 border-b-4 border-ink pb-2 text-lg font-black uppercase">{title}</h2>
      <div className="space-y-3 text-sm font-medium leading-relaxed text-ink/80">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b-4 border-ink bg-white px-5 py-4 md:px-10">
        <Link href="/"><LogoWordmark /></Link>
        <Link href="/register" className="btn-blue px-4 py-2 text-xs">Get Started</Link>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-12 md:px-10">
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-ink bg-ink px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white">
            <FileText size={14} /> Terms &amp; Conditions
          </div>
          <h1 className="text-heading mb-3">Terms &amp; Conditions</h1>
          <p className="text-sm font-medium text-ink/60">
            Last updated: 11 June 2026 · By using CareerLuhh you agree to these terms. Please read them.
          </p>
        </div>

        <Section id="about" title="1. About CareerLuhh">
          <p>
            CareerLuhh (&ldquo;the Platform&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a career co-pilot platform developed as a Stage 1 prototype for the Talentbank First Cohort Tech Hackathon 2026. It is operated by the CareerLuhh team based in Malaysia.
          </p>
          <p>
            <strong>Stage 1 status:</strong> The platform currently uses mock/demo data only. No real job placements, real salary data, or binding employment arrangements arise from using this platform at this stage.
          </p>
        </Section>

        <Section id="acceptance" title="2. Acceptance of Terms">
          <p>
            By registering, logging in, or using any feature of CareerLuhh, you agree to be bound by these Terms &amp; Conditions and our{" "}
            <Link href="/privacy" className="font-bold text-blue underline underline-offset-2">Privacy Policy</Link>.
            If you do not agree, do not use the platform.
          </p>
        </Section>

        <Section id="eligibility" title="3. Eligibility">
          <p>You must be at least 13 years old to use CareerLuhh. By creating an account, you confirm you meet this requirement.</p>
          <p>If you are using the platform on behalf of an organisation (Employer portal), you confirm you are authorised to bind that organisation to these terms.</p>
        </Section>

        <Section id="accounts" title="4. Accounts & Security">
          <p>You are responsible for maintaining the security of your account credentials. Do not share your password with others.</p>
          <p>CareerLuhh demo accounts (student@demo.com, candidate@demo.com, employer@demo.com) are provided for testing purposes only and should not be used to store real personal information.</p>
          <p>We reserve the right to suspend or terminate accounts that violate these terms or are used for abuse.</p>
        </Section>

        <Section id="platform-use" title="5. Acceptable Use">
          <p>You agree NOT to:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Scrape, crawl, or data-mine the platform without written permission</li>
            <li>Attempt to reverse-engineer, hack, or exploit the platform&apos;s systems</li>
            <li>Post false job listings, fabricate credentials, or misrepresent your identity</li>
            <li>Use the platform for spam, phishing, or any illegal purpose</li>
            <li>Harass other users on the platform</li>
          </ul>
          <p>Violations may result in immediate account termination and reporting to relevant authorities.</p>
        </Section>

        <Section id="content" title="6. Your Content">
          <p>
            Content you submit (portfolio items, project descriptions, transcripts) remains yours. By submitting it, you grant CareerLuhh a limited, non-exclusive licence to process and display it within the platform for the purposes of providing the service.
          </p>
          <p>You confirm that content you submit does not infringe third-party intellectual property rights and is accurate to the best of your knowledge.</p>
        </Section>

        <Section id="ai" title="7. AI Agent Outputs">
          <p>
            CareerLuhh uses AI agents to generate career path suggestions, salary benchmarks, job match scores, and other recommendations. These outputs are <strong>informational only</strong> and do not constitute professional career counselling, legal, or financial advice.
          </p>
          <p>
            AI outputs may be inaccurate. Always verify important career decisions through additional research or qualified professionals.
          </p>
          <p>
            <strong>Stage 1:</strong> All AI outputs are mock/simulated. No real Gemini API calls are made in Stage 1.
          </p>
        </Section>

        <Section id="jobs" title="8. Job Listings">
          <p>
            Job listings on the platform in Stage 1 are dummy data for demonstration purposes. Employer logos and company names used are for illustrative purposes only and do not imply endorsement by those companies.
          </p>
          <p>
            Stage 2 will introduce real employer job postings. Employers posting jobs are solely responsible for the accuracy and legality of their listings. CareerLuhh does not guarantee job placements or hiring outcomes.
          </p>
        </Section>

        <Section id="data" title="9. Data & Privacy">
          <p>
            Our collection and use of personal data is governed by our{" "}
            <Link href="/privacy" className="font-bold text-blue underline underline-offset-2">Privacy Policy</Link>,
            which forms part of these terms. We comply with Malaysia&apos;s Personal Data Protection Act 2010 (PDPA).
          </p>
        </Section>

        <Section id="ip" title="10. Intellectual Property">
          <p>
            The CareerLuhh name, logo, design system, and platform code are the intellectual property of the CareerLuhh team. You may not reproduce, distribute, or create derivative works without written permission.
          </p>
        </Section>

        <Section id="liability" title="11. Limitation of Liability">
          <p>
            To the maximum extent permitted by Malaysian law, CareerLuhh is not liable for:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Loss of data (Stage 1 stores data in browser localStorage — we recommend not storing sensitive real data)</li>
            <li>Employment outcomes or career decisions made based on AI agent recommendations</li>
            <li>Inaccuracies in AI-generated salary benchmarks, job matches, or career paths</li>
            <li>Service downtime or interruptions</li>
          </ul>
        </Section>

        <Section id="changes" title="12. Changes to Terms">
          <p>
            We may update these terms at any time. Material changes will be communicated via email or an in-platform notice. Continued use of the platform after changes constitutes acceptance of the updated terms.
          </p>
        </Section>

        <Section id="governing-law" title="13. Governing Law">
          <p>
            These terms are governed by the laws of Malaysia. Any disputes arising from the use of the platform shall be subject to the jurisdiction of Malaysian courts.
          </p>
        </Section>

        <Section id="contact" title="14. Contact">
          <p>
            Questions about these terms:{" "}
            <a href="mailto:privacy@careerluhh.my" className="font-bold text-blue underline underline-offset-2">
              privacy@careerluhh.my
            </a>
          </p>
        </Section>

        <div className="border-t-4 border-ink pt-8 flex flex-wrap gap-4 text-sm font-bold">
          <Link href="/" className="text-blue hover:underline">← Back to Home</Link>
          <Link href="/privacy" className="text-blue hover:underline">Privacy Policy</Link>
          <Link href="/register" className="text-blue hover:underline">Create Account</Link>
        </div>
      </div>

      <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t-4 border-ink bg-ink px-5 py-8 text-white md:flex-row md:px-10">
        <LogoWordmark light />
        <p className="text-xs font-medium text-white/50">
          CareerLuhh · Governed by Malaysian law · PDPA 2010 Compliant
        </p>
      </footer>
    </main>
  );
}
