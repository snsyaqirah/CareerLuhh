import { RoadmapTree } from "@/components/roadmap-tree/RoadmapTree";
import { careerPaths } from "@/lib/mock-data/student";

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-label mb-1 text-blue">The Navigator · PathfinderAgent</p>
      <h1 className="text-heading mb-2">
        Your Career Roadmap<span className="text-red">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        3 realistic paths generated from your programme, results, and interests —
        Malaysian market salary ranges, not aspirational fantasy. Click any node
        for details.
      </p>
      <RoadmapTree paths={careerPaths} />
    </div>
  );
}
