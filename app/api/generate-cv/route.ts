import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { stats, career, userPrompt } = await req.json();

    // fallback kalau userPrompt kosong
    const prompt = `
${userPrompt || `Kamu adalah asisten profesional yang membantu membuat CV.
Berdasarkan data berikut, hasilkan template CV ringkas dan realistis.`}

STATISTIK PENGGUNA:
${JSON.stringify(stats, null, 2)}

KARIER YANG DIREKOMENDASIKAN:
${JSON.stringify(career, null, 2)}

Format output JSON:
{
  "summary": "Ringkasan profil singkat (2-3 kalimat)",
  "skills": ["skill1", "skill2", "skill3"],
  "strengths": ["kelebihan1", "kelebihan2"],
  "career_goal": "Tujuan karier atau aspirasi utama"
}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-.5-flash" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { summary: "Gagal memuat CV" };

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat CV" }, { status: 500 });
  }
}
