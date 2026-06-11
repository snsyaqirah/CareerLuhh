"use client";

// Plays an orchestration Pipeline as a timed sequence: each agent goes
// idle → running → complete, merging its writes into the shared Career Profile
// as it finishes. This is the client-side "engine" behind the Agent Console.

import { useCallback, useEffect, useRef, useState } from "react";
import type { CareerProfile, Pipeline } from "./orchestration";

export type StepStatus = "idle" | "running" | "complete";

export interface OrchestrationState {
  status: Record<string, StepStatus>;
  profile: CareerProfile;
  activeId: string | null;
  running: boolean;
  done: boolean;
  run: () => void;
}

export function useOrchestration(pipeline: Pipeline): OrchestrationState {
  const idle = () =>
    Object.fromEntries(pipeline.steps.map((s) => [s.id, "idle" as StepStatus]));

  const [status, setStatus] = useState<Record<string, StepStatus>>(idle);
  const [profile, setProfile] = useState<CareerProfile>(pipeline.seed);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = useCallback(() => {
    clearTimers();
    setStatus(idle());
    setProfile(pipeline.seed);
    setActiveId(null);
    setDone(false);
    setRunning(true);

    let acc: CareerProfile = { ...pipeline.seed };
    let delay = 300;

    pipeline.steps.forEach((step, i) => {
      timers.current.push(
        setTimeout(() => {
          setActiveId(step.id);
          setStatus((p) => ({ ...p, [step.id]: "running" }));
        }, delay)
      );
      delay += step.durationMs;

      timers.current.push(
        setTimeout(() => {
          acc = { ...acc, ...step.writes };
          setProfile({ ...acc });
          setStatus((p) => ({ ...p, [step.id]: "complete" }));
          if (i === pipeline.steps.length - 1) {
            setRunning(false);
            setDone(true);
            setActiveId(null);
          }
        }, delay)
      );
      delay += 200;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipeline]);

  // auto-run once on mount so judges see motion immediately
  useEffect(() => {
    const t = setTimeout(run, 500);
    return () => {
      clearTimeout(t);
      clearTimers();
    };
  }, [run]);

  return { status, profile, activeId, running, done, run };
}
