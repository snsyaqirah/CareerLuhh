# The 16-Agent System

Full specs (system prompts + mock outputs) live in
[`CareerLuhh_System_Plan_v2.md`](../../CareerLuhh_System_Plan_v2.md) §5.
Each agent becomes a `POST /api/agents/<route>` handler in Stage 2.

| Agent | Persona | Portal | Route | Job |
|---|---|---|---|---|
| PathfinderAgent | The Navigator | Student | `/api/agents/pathfinder` | Generates realistic career path trees |
| ReadinessAgent | The Auditor | Student | `/api/agents/readiness` | Scores hireability right now |
| InternMatchAgent | The Recruiter | Student | `/api/agents/intern-match` | Matches internships w/ absorption rates |
| SkorAlignAgent | The Translator | Student | `/api/agents/skor-align` | MUET/SKM/STPM → global equivalents |
| LokalRouteAgent | The Planner | Student + Candidate | `/api/agents/lokal-route` | City vs salary trade-off maths |
| CoachAgent | The Advisor | Student + Candidate | `/api/agents/coach` | Proactive nudges with urgency levels |
| ResumeOCRAgent | The Clerk | Candidate | `/api/agents/resume-ocr` | Parses resume PDF → structured profile |
| NextMoveAgent | The Navigator | Candidate | `/api/agents/next-move` | Safe / growth / bold next-role options |
| PayBenchmarkAgent | The Analyst | Candidate | `/api/agents/pay-benchmark` | Salary benchmark + negotiation script |
| JobMatchAgent | The Broker | Candidate | `/api/agents/job-match` | Trajectory-based job matching |
| GigBridgeAgent | The Converter | Candidate | `/api/agents/gig-bridge` | Gig work → professional credentials |
| TrajectoryMatchAgent | The Headhunter | Employer | `/api/agents/trajectory-match` | Search talent by growth curve |
| TalentRadarAgent | The Scout | Employer | `/api/agents/talent-radar` | Weekly digest of overlooked talent |
| RetentionSignalAgent | The Watcher | Employer | `/api/agents/retention-signal` | Flight-risk signals + actions |
| ReEngagementAgent | The Diplomat | Employer | `/api/agents/re-engagement` | Warmlist re-engagement drafts |
| OnboardingAgent | The Buddy | Employer | `/api/agents/onboarding` | New-hire check-in pulse |
| WorkforceAgent | The Strategist | Employer | `/api/agents/workforce` | Automation risk + hiring plan |

**Rules:** one agent = one job · all read/write the shared Career Profile ·
every call logged to `agent_logs` · output is always strict JSON.
