# CareerLuhh 🧭

> **"Career First, Everything Else Later"** — Asia's Career Co-Pilot
> Talentbank First Cohort Tech Hackathon 2026 · Stage 1 Prototype

A multi-agent AI career platform that guides users from student life through
active employment. Unlike job portals that match by keyword, CareerLuhh matches
by **trajectory** — where you're heading, not just where you've been.

🎓 **Student Portal** · 💼 **Candidate Portal** · 🏢 **Employer Portal** — three
portals, one living Career Profile, 16 specialised AI agents.

Full spec: [`CareerLuhh_System_Plan_v2.md`](CareerLuhh_System_Plan_v2.md)

---

## ⚠️ Stage 1 = Clickable prototype, dummy data only

No real database, no real LLM calls, mock login. All agent responses are
hardcoded JSON in `frontend/lib/mock-data/`. Real Neon DB + Gemini agents land
in Stage 2 (build phase).

## Repo structure

```
CareerLuhh/
├── frontend/   ← Next.js 14 app (the entire Stage 1 prototype)
└── backend/    ← Stage 2 blueprint: Prisma schema, Gemini client, agent specs
```

## Run locally

```bash
cd frontend
npm install
npm run dev      # → http://localhost:3000
```

## Demo accounts (password: `demo123`)

| Role | Email | Lands on |
|---|---|---|
| 🎓 Student | `student@demo.com` | `/student/dashboard` |
| 💼 Candidate | `candidate@demo.com` | `/candidate/dashboard` |
| 🏢 Employer | `employer@demo.com` | `/employer/dashboard` |

Or use the one-click demo buttons on `/login`. Register also works — it creates
a throwaway local session for whichever role you pick.

## Deploy to Vercel

1. Push this repo to GitHub
2. Vercel → **Add New Project** → import the repo
3. **Set "Root Directory" to `frontend`** ← the only setting that matters
4. Framework preset auto-detects Next.js → Deploy

No environment variables needed for Stage 1.

## Built pages (Stage 1) — all 26 routes live

- `/` — Bauhaus landing page · `/login` + `/register` — mock auth with role selection
- **Student:** dashboard · roadmap (custom SVG career tree) · internships ·
  portfolio · qualifications (SkorAlign) · lokal route · onboarding wizard
- **Candidate:** dashboard · jobs · salary · next-move · gig bridge ·
  portfolio · lokal route · resume upload (The Clerk demo)
- **Employer:** dashboard · talent search · workforce · saved shortlist ·
  re-engage warmlist · onboarding tracker · internship listings

## Design system

Bauhaus × Career: Outfit font, hard offset shadows (no blur), 2–4px ink
borders, square corners, and a strict palette — `#1040C0` blue, `#D02020` red,
`#F0C020` yellow on `#F5F4F0` canvas.

## SDG alignment

SDG 4 (Quality Education) · SDG 8 (Decent Work) · SDG 10 (Reduced
Inequalities) · SDG 17 (Partnerships)
