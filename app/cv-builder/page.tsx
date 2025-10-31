"use client";

import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";

interface CVResult {
  summary: string;
  skills: string[];
  strengths: string[];
  career_goal: string;
}

export default function CVBuilderPage() {
  const stats = useGameStore((s) => s.stats);
  const career = useGameStore((s) => s.career);
  const [cv, setCV] = useState<CVResult | null>(null);
  const [loading, setLoading] = useState(false);

  const generateCV = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats, career }),
      });

      if (!res.ok) throw new Error("Gagal memuat CV");
      const data: CVResult = await res.json();
      setCV(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">AI CV Generator</h1>
      {!cv ? (
        <button
          onClick={generateCV}
          disabled={loading}
          className={`w-full px-4 py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Menyusun CV..." : "Generate CV"}
        </button>
      ) : (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Ringkasan</h2>
          <p className="text-gray-700 mb-4">{cv.summary}</p>

          <h3 className="font-medium mb-1">Skill Utama</h3>
          <ul className="list-disc list-inside mb-4">
            {cv.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h3 className="font-medium mb-1">Kekuatan Personal</h3>
          <ul className="list-disc list-inside mb-4">
            {cv.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h3 className="font-medium mb-1">Tujuan Karier</h3>
          <p className="text-gray-700">{cv.career_goal}</p>
        </div>
      )}
    </div>
  );
}
