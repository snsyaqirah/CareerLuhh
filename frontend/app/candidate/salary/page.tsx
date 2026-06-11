"use client";

import { Quote, CalendarClock } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { payBenchmark } from "@/lib/mock-data/candidate";

// Simple horizontal benchmark bar — custom SVG, no chart lib
function BenchmarkBar() {
  const { currentSalary, benchmarkMin, benchmarkMax } = payBenchmark;
  const min = 3000;
  const max = 8500;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="mt-4">
      <div className="relative h-12 border-2 border-ink bg-soft">
        {/* market range */}
        <div
          className="absolute inset-y-0 border-x-2 border-ink bg-blue/20"
          style={{
            left: `${pct(benchmarkMin)}%`,
            width: `${pct(benchmarkMax) - pct(benchmarkMin)}%`,
          }}
        />
        {/* you marker */}
        <div
          className="absolute inset-y-0 w-1.5 bg-red"
          style={{ left: `${pct(currentSalary)}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs font-bold">
        <span>RM{min.toLocaleString()}</span>
        <span className="text-red">▲ You: RM{currentSalary.toLocaleString()}</span>
        <span className="text-blue">
          Market: RM{benchmarkMin.toLocaleString()} – RM{benchmarkMax.toLocaleString()}
        </span>
        <span>RM{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function SalaryPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-label mb-1 text-red">The Analyst · PayBenchmarkAgent</p>
      <h1 className="text-heading mb-2">
        Salary Benchmark<span className="text-blue">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        Where you sit vs the Malaysian market for your role and experience — and
        exactly what to say about it.
      </p>

      <AgentCard agentName="The Analyst" codeName="PayBenchmarkAgent" status="alert" accent="red">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-label text-ink/50">Verdict</p>
            <p className="text-5xl font-black uppercase text-red">{payBenchmark.verdict}</p>
          </div>
          <div className="text-right">
            <p className="text-label text-ink/50">Gap to market floor</p>
            <p className="text-3xl font-black">RM{payBenchmark.gap}/mo</p>
          </div>
        </div>
        <BenchmarkBar />
        <p className="mt-4 border-2 border-ink bg-canvas px-4 py-2 text-sm font-bold">
          {payBenchmark.percentilePosition}
        </p>
      </AgentCard>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <AgentCard agentName="Negotiation script" codeName="The Analyst" accent="yellow">
          <Quote size={20} className="mb-2 text-blue" />
          <p className="text-sm font-semibold leading-relaxed">
            {payBenchmark.negotiationTip}
          </p>
        </AgentCard>
        <AgentCard agentName="Best timing" codeName="The Analyst" accent="blue">
          <CalendarClock size={20} className="mb-2 text-red" />
          <p className="text-sm font-semibold leading-relaxed">{payBenchmark.bestTiming}</p>
        </AgentCard>
      </div>
    </div>
  );
}
