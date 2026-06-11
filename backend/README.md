# CareerLuhh — Backend (Stage 2)

> ⚠️ **Stage 1 note:** The Stage 1 prototype runs entirely on dummy data inside
> `frontend/lib/mock-data/`. Nothing in this folder is deployed yet — it is the
> blueprint for the Stage 2 build phase (29 Jun – 26 Jul 2026).

## Planned stack

| Layer | Choice |
|---|---|
| Runtime | Next.js API Routes (serverless, lives in `frontend/app/api/`) |
| Database | Neon (PostgreSQL, serverless) |
| ORM | Prisma — schema in [`prisma/schema.prisma`](prisma/schema.prisma) |
| Auth | NextAuth.js v5 (credentials + Google OAuth) |
| LLM | Google Gemini 2.0 Flash (free tier) |
| File storage | Uploadthing (resume PDFs) |

## Folder contents

```
backend/
├── prisma/schema.prisma   ← full DB schema (Users, CareerProfile, agents logs, …)
├── agents/_base.ts        ← runAgent() helper — mock-first, Gemini-ready
├── agents/gemini.ts       ← Gemini 2.0 Flash client setup
└── agents/README.md       ← all 16 agent specs (prompts + mock outputs)
```

## The 16-agent system

Each agent does **one job only**, reads/writes the shared Career Profile, and is
exposed as `POST /api/agents/<name>`. In Stage 1 every agent returns the
hardcoded mock JSON documented in `CareerLuhh_System_Plan_v2.md` §5.

**Student:** PathfinderAgent, ReadinessAgent, InternMatchAgent, SkorAlignAgent, LokalRouteAgent, CoachAgent
**Candidate:** ResumeOCRAgent, NextMoveAgent, PayBenchmarkAgent, JobMatchAgent, GigBridgeAgent, CoachAgent
**Employer:** TrajectoryMatchAgent, TalentRadarAgent, RetentionSignalAgent, ReEngagementAgent, OnboardingAgent, WorkforceAgent

## Stage 2 setup (when build phase starts)

1. Create a Neon project → copy `DATABASE_URL` into `frontend/.env.local`
2. `npx prisma migrate dev` using this schema
3. Get a free Gemini key at https://aistudio.google.com → `GEMINI_API_KEY`
4. Flip `useMock = false` in `agents/_base.ts` per agent as each one is wired up
