// app/api/generate-career/route.ts

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { stats, userPrompt } = await req.json();

    // Gunakan userPrompt jika ada, fallback ke template default career prompt
    const prompt = `
${userPrompt || `Kamu adalah asisten karier profesional.
Berdasarkan statistik pengguna berikut, tentukan pekerjaan paling cocok, berikan nama "class", dan jelaskan alasannya.
Balas dalam format JSON:
{
  "name": "Nama Class",
  "desc": "Deskripsi singkat mengapa cocok",
  "recommended_fields": ["Bidang 1", "Bidang 2", "Bidang 3"]
}`}

Statistik pengguna:
${JSON.stringify(stats, null, 2)}
    `;

    // Gunakan model Gemini terbaru
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text();

    // Parsing JSON hasil AI
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : {
          name: "Undefined",
          desc: "AI gagal menentukan karier yang cocok.",
          recommended_fields: [],
        };

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Error di /api/generate-career:", err);
    return NextResponse.json(
      { error: "Gagal memproses karier, coba lagi nanti." },
      { status: 500 }
    );
  }
}

// Tolak method selain POST
export async function GET() {
  return NextResponse.json(
    { error: "Gunakan POST, bukan GET." },
    { status: 405 }
  );
}
