"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Plus, TrendingUp, X } from "lucide-react";
import {
  transcriptRecords,
  calcCgpa,
  type SemesterRecord,
  type TranscriptSubject,
} from "@/lib/mock-data/student";

const GRADE_POINTS: Record<string, number> = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, E: 0.0,
};

const GRADE_COLOR: Record<string, string> = {
  A: "text-blue font-black",
  "A-": "text-blue font-black",
  "B+": "text-ink font-bold",
  B: "text-ink font-bold",
  "B-": "text-ink/70 font-bold",
  "C+": "text-ink/60 font-semibold",
  C: "text-ink/60 font-semibold",
  "C-": "text-red/70 font-semibold",
  D: "text-red font-bold",
  E: "text-red font-black",
};

function gpaColor(gpa: number) {
  if (gpa >= 3.5) return "text-blue";
  if (gpa >= 3.0) return "text-ink";
  if (gpa >= 2.5) return "text-yellow";
  return "text-red";
}

function SemesterCard({ record }: { record: SemesterRecord }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card mb-4 p-0 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between border-b-2 border-ink bg-canvas px-5 py-3 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-label text-blue">Semester {record.semester}</span>
          <span className="text-xs font-bold text-ink/50">{record.year}</span>
          <span className={`text-sm font-black ${gpaColor(record.gpa)}`}>
            GPA {record.gpa.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-ink/50">
            {record.subjects.length} subjects ·{" "}
            {record.subjects.reduce((s, x) => s + x.creditHours, 0)} credit hrs
          </span>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {open && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink/10 bg-white">
                <th className="px-5 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-ink/50">
                  Code
                </th>
                <th className="px-5 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-ink/50">
                  Subject
                </th>
                <th className="px-5 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-ink/50">
                  Credit Hrs
                </th>
                <th className="px-5 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-ink/50">
                  Grade
                </th>
                <th className="px-5 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-ink/50">
                  Grade Point
                </th>
              </tr>
            </thead>
            <tbody>
              {record.subjects.map((s, i) => (
                <tr
                  key={s.code}
                  className={`border-b border-ink/5 ${i % 2 === 0 ? "bg-white" : "bg-canvas"}`}
                >
                  <td className="px-5 py-2.5 font-mono text-xs font-bold text-ink/60">{s.code}</td>
                  <td className="px-5 py-2.5 font-semibold">{s.name}</td>
                  <td className="px-5 py-2.5 text-center font-bold">{s.creditHours}</td>
                  <td className={`px-5 py-2.5 text-center ${GRADE_COLOR[s.grade] ?? "font-bold"}`}>
                    {s.grade}
                  </td>
                  <td className="px-5 py-2.5 text-center font-bold">{s.gradePoint.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function TranscriptPage() {
  const [records, setRecords] = useState<SemesterRecord[]>(transcriptRecords);
  const [showForm, setShowForm] = useState(false);

  // Add subject form state
  const [newSemester, setNewSemester] = useState<number>(records.length + 1);
  const [newYear, setNewYear] = useState("");
  const [subjects, setSubjects] = useState<Partial<TranscriptSubject>[]>([
    { code: "", name: "", creditHours: 3, grade: "B", gradePoint: 3.0 },
  ]);

  const cgpa = calcCgpa(records);

  function updateSubject(i: number, field: keyof TranscriptSubject, value: string | number) {
    setSubjects((prev) =>
      prev.map((s, idx) => {
        if (idx !== i) return s;
        if (field === "grade" && typeof value === "string") {
          return { ...s, grade: value, gradePoint: GRADE_POINTS[value] ?? 0 };
        }
        return { ...s, [field]: value };
      })
    );
  }

  function addSubjectRow() {
    setSubjects((p) => [...p, { code: "", name: "", creditHours: 3, grade: "B", gradePoint: 3.0 }]);
  }

  function removeSubjectRow(i: number) {
    setSubjects((p) => p.filter((_, idx) => idx !== i));
  }

  function saveSemester(e: React.FormEvent) {
    e.preventDefault();
    const validSubjects = subjects.filter(
      (s): s is TranscriptSubject => !!s.code && !!s.name && s.creditHours != null && !!s.grade
    );
    if (validSubjects.length === 0) return;

    const total = validSubjects.reduce((s, x) => s + x.gradePoint * x.creditHours, 0);
    const credits = validSubjects.reduce((s, x) => s + x.creditHours, 0);
    const gpa = credits > 0 ? Math.round((total / credits) * 100) / 100 : 0;

    setRecords((prev) => [
      ...prev,
      {
        id: `sem_${Date.now()}`,
        semester: newSemester,
        year: newYear || `${new Date().getFullYear()}`,
        gpa,
        subjects: validSubjects,
      },
    ]);
    setShowForm(false);
    setSubjects([{ code: "", name: "", creditHours: 3, grade: "B", gradePoint: 3.0 }]);
    setNewSemester(records.length + 2);
    setNewYear("");
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label mb-1 text-blue">Academic Records</p>
          <h1 className="text-heading mb-2">
            Mini Transcript<span className="text-red">.</span>
          </h1>
          <p className="max-w-xl text-sm font-medium text-ink/60">
            Your academic history feeds the PathfinderAgent and ReadinessAgent —
            the better the data, the more accurate your career paths.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-yellow px-4 py-2 text-xs">
          {showForm ? <X size={14} /> : <Plus size={14} />}{" "}
          {showForm ? "Cancel" : "Add Semester"}
        </button>
      </div>

      {/* CGPA Summary */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card text-center">
          <p className="text-label mb-1 text-ink/50">Current CGPA</p>
          <p className={`text-4xl font-black ${gpaColor(cgpa)}`}>{cgpa.toFixed(2)}</p>
          <p className="mt-1 text-xs font-bold text-ink/50">out of 4.00</p>
        </div>
        <div className="card text-center">
          <p className="text-label mb-1 text-ink/50">Semesters</p>
          <p className="text-4xl font-black text-ink">{records.length}</p>
          <p className="mt-1 text-xs font-bold text-ink/50">completed</p>
        </div>
        <div className="card text-center">
          <p className="text-label mb-1 text-ink/50">Total Credits</p>
          <p className="text-4xl font-black text-ink">
            {records.flatMap((r) => r.subjects).reduce((s, x) => s + x.creditHours, 0)}
          </p>
          <p className="mt-1 text-xs font-bold text-ink/50">credit hours</p>
        </div>
      </div>

      {/* GPA trend */}
      <div className="card mb-8">
        <p className="text-label mb-3 flex items-center gap-1.5">
          <TrendingUp size={13} /> GPA by Semester
        </p>
        <div className="flex items-end gap-3">
          {records.map((r) => (
            <div key={r.id} className="flex flex-1 flex-col items-center gap-1">
              <span className={`text-xs font-black ${gpaColor(r.gpa)}`}>{r.gpa.toFixed(2)}</span>
              <div
                className="w-full border-2 border-ink"
                style={{
                  height: `${(r.gpa / 4.0) * 80}px`,
                  background: r.gpa >= 3.5 ? "#1040C0" : r.gpa >= 3.0 ? "#121212" : r.gpa >= 2.5 ? "#F0C020" : "#D02020",
                }}
              />
              <span className="text-[10px] font-bold text-ink/50">S{r.semester}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add semester form */}
      {showForm && (
        <form onSubmit={saveSemester} className="card mb-8 space-y-4">
          <p className="font-black uppercase">Add New Semester</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-bauhaus">Semester Number</label>
              <input
                className="input-bauhaus"
                type="number"
                min={1}
                value={newSemester}
                onChange={(e) => setNewSemester(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="label-bauhaus">Academic Year</label>
              <input
                className="input-bauhaus"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="e.g. 2025/26"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="label-bauhaus">Subjects</label>
              <button type="button" onClick={addSubjectRow} className="text-xs font-bold text-blue hover:underline">
                + Add row
              </button>
            </div>
            <div className="space-y-2">
              {subjects.map((s, i) => (
                <div key={i} className="grid items-center gap-2 sm:grid-cols-[1fr_2fr_80px_90px_32px]">
                  <input
                    className="input-bauhaus text-xs"
                    placeholder="Code e.g. CSC101"
                    value={s.code ?? ""}
                    onChange={(e) => updateSubject(i, "code", e.target.value)}
                  />
                  <input
                    className="input-bauhaus text-xs"
                    placeholder="Subject name"
                    value={s.name ?? ""}
                    onChange={(e) => updateSubject(i, "name", e.target.value)}
                  />
                  <input
                    className="input-bauhaus text-xs"
                    type="number"
                    min={1}
                    max={6}
                    placeholder="Cr Hrs"
                    value={s.creditHours ?? 3}
                    onChange={(e) => updateSubject(i, "creditHours", Number(e.target.value))}
                  />
                  <select
                    className="input-bauhaus text-xs"
                    value={s.grade ?? "B"}
                    onChange={(e) => updateSubject(i, "grade", e.target.value)}
                  >
                    {Object.keys(GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeSubjectRow(i)}
                    className="border-2 border-ink p-1 hover:bg-red hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-blue px-5 py-2 text-xs">
            Save Semester <BookOpen size={14} />
          </button>
        </form>
      )}

      {/* Semester cards */}
      {[...records].reverse().map((r) => (
        <SemesterCard key={r.id} record={r} />
      ))}

      <p className="mt-6 border-2 border-ink/20 bg-canvas p-4 text-xs font-semibold text-ink/50">
        Stage 2: this transcript feeds PathfinderAgent (career direction analysis),
        ReadinessAgent (academic score component), and SkorAlignAgent (CGPA ↔ global grading
        equivalence). Keep it up to date for the most accurate path recommendations.
      </p>
    </div>
  );
}
