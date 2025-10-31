"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";

interface CareerResult {
  name: string;
  desc: string;
  recommended_fields?: string[];
}

export default function ResultPage() {
  const stats = useGameStore((s) => s.stats);
  const [career, setCareer] = useState<CareerResult | null>(null);
  const [cvText, setCvText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingCV, setLoadingCV] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate hasil karier berdasarkan stats
  useEffect(() => {
    const generateCareer = async () => {
      try {
        const res = await fetch("/api/generate-career", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stats),
        });
        if (!res.ok) throw new Error("Gagal memuat hasil karier");

        const data: CareerResult = await res.json();
        setCareer(data);
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan saat memproses hasil karier.");
      } finally {
        setLoading(false);
      }
    };
    generateCareer();
  }, [stats]);


  return (
    <div className="max-w-2xl mx-auto text-center py-10">
      <h1 className="text-2xl font-bold mb-4">AI Career Result</h1>

      {loading && <p className="text-gray-500">Menghitung hasil kamu...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && career && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">{career.name}</h2>
          <p className="text-gray-600 mt-2">{career.desc}</p>

          {career.recommended_fields?.length ? (
            <div className="mt-4 text-left">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Rekomendasi bidang:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {career.recommended_fields.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ) : null}

        </div>
      )}

      {cvText && (
        <div className="mt-8 text-left bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            CV Preview
          </h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {cvText}
          </pre>
        </div>
      )}
    </div>
  );
}
