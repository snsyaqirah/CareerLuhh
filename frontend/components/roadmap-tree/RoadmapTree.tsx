"use client";

// Custom React SVG career path tree (The Navigator / PathfinderAgent).
// Horizontal flow, one path per row. No chart library — hand-rolled per spec.

import { useState } from "react";
import { X } from "lucide-react";
import type { CareerPath, RoadmapNode } from "@/lib/mock-data/student";

const NODE_W = 168;
const NODE_H = 52;
const GAP_X = 64;
const PAD = 16;

const NODE_STYLE: Record<
  RoadmapNode["type"],
  { fill: string; text: string; stroke: string }
> = {
  milestone: { fill: "#1040C0", text: "#FFFFFF", stroke: "#121212" },
  skill: { fill: "#F0C020", text: "#121212", stroke: "#121212" },
  action: { fill: "#FFFFFF", text: "#121212", stroke: "#121212" },
  role: { fill: "#D02020", text: "#FFFFFF", stroke: "#121212" },
};

const TYPE_LABEL: Record<RoadmapNode["type"], string> = {
  milestone: "Milestone",
  skill: "Skill to learn",
  action: "Action to take",
  role: "Target role",
};

function PathRow({ path }: { path: CareerPath }) {
  const [selected, setSelected] = useState<RoadmapNode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const cols = Math.max(...path.nodes.map((n) => n.x)) + 1;
  const width = cols * NODE_W + (cols - 1) * GAP_X + PAD * 2;
  const height = NODE_H + PAD * 2;

  const nodeX = (n: RoadmapNode) => PAD + n.x * (NODE_W + GAP_X);
  const nodeY = () => PAD;

  return (
    <div className="card mb-8 overflow-hidden p-0">
      {/* Path header */}
      <div
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-4 border-ink px-5 py-4"
        style={{ background: path.color }}
      >
        <div className="flex items-center gap-3">
          <span
            className={`text-lg font-black uppercase tracking-tight ${
              path.color === "#F0C020" ? "text-ink" : "text-white"
            }`}
          >
            {path.title}
          </span>
          <span className="agent-badge bg-white text-ink">{path.matchScore}% match</span>
        </div>
        <div
          className={`flex gap-4 text-xs font-bold uppercase tracking-wider ${
            path.color === "#F0C020" ? "text-ink" : "text-white"
          }`}
        >
          <span>⏱ {path.timeline}</span>
          <span>💰 {path.salaryRange}</span>
        </div>
      </div>

      {/* Tree */}
      <div className="overflow-x-auto bg-white px-5 py-6 hover:bg-yellow/10 transition-colors">
        <svg width={width} height={height} className="block" style={{ minWidth: width }}>
          <defs>
            <marker
              id={`arrow-${path.id}`}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill="#121212" />
            </marker>
          </defs>

          {path.edges.map((e) => {
            const from = path.nodes.find((n) => n.id === e.from)!;
            const to = path.nodes.find((n) => n.id === e.to)!;
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={nodeX(from) + NODE_W}
                y1={nodeY() + NODE_H / 2}
                x2={nodeX(to) - 4}
                y2={nodeY() + NODE_H / 2}
                stroke="#121212"
                strokeWidth="2"
                markerEnd={`url(#arrow-${path.id})`}
              />
            );
          })}

          {path.nodes.map((n) => {
            const s = NODE_STYLE[n.type];
            const hov = hovered === n.id;
            return (
              <g
                key={n.id}
                transform={`translate(${nodeX(n)}, ${nodeY()})`}
                onClick={() => setSelected(n)}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {hov && (
                  <rect x={5} y={5} width={NODE_W} height={NODE_H} fill="#121212" />
                )}
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  fill={s.fill}
                  stroke={s.stroke}
                  strokeWidth={hov ? 3 : 2}
                />
                <text
                  x={NODE_W / 2}
                  y={NODE_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={s.text}
                  style={{ pointerEvents: "none", textTransform: "uppercase" }}
                >
                  {n.label.length > 24 ? n.label.slice(0, 23) + "…" : n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="flex flex-wrap items-start justify-between gap-4 border-t-4 border-ink bg-canvas px-5 py-4">
          <div>
            <span
              className="agent-badge mb-2"
              style={{
                background: NODE_STYLE[selected.type].fill,
                color: NODE_STYLE[selected.type].text,
              }}
            >
              {TYPE_LABEL[selected.type]}
            </span>
            <p className="text-lg font-black uppercase">{selected.label}</p>
            <p className="mt-1 max-w-xl text-sm font-medium text-ink/60">
              Step {selected.x + 1} of {path.nodes.length} on the {path.title} path · The
              Navigator estimates this path takes {path.timeline} and lands at{" "}
              {path.salaryRange}.
            </p>
          </div>
          <button
            onClick={() => setSelected(null)}
            className="border-2 border-ink p-1.5 hover:bg-red hover:text-white"
            aria-label="Close details"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export function RoadmapTree({ paths }: { paths: CareerPath[] }) {
  return (
    <div>
      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-3">
        {(Object.keys(NODE_STYLE) as RoadmapNode["type"][]).map((t) => (
          <span key={t} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <span
              className="inline-block h-4 w-4 border-2 border-ink"
              style={{ background: NODE_STYLE[t].fill }}
            />
            {TYPE_LABEL[t]}
          </span>
        ))}
      </div>
      {paths.map((p) => (
        <PathRow key={p.id} path={p} />
      ))}
    </div>
  );
}
