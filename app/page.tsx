// app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">AI Career Quest</h1>
        <p className="text-gray-300 max-w-md mx-auto">
          Jawab kuisioner, tingkatkan stat dirimu, dan biarkan AI menentukan
          kelas karier yang cocok buatmu.
        </p>

        <Link
          href="/quiz"
          className="px-6 py-3 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors"
        >
          Mulai Petualangan
        </Link>
      </div>
    </main>
  );
}
