"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { coreQuestions } from "@/data/coreQuestions";
import { professionalQuestions } from "@/data/professionalQuestions";
import { mentalQuestions } from "@/data/mentalQuestions";
import { skillQuestions } from "@/data/skillQuestions";
import StatSection from "@/components/StatSection";

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // kalau semua kategori udah selesai, arahkan ke halaman hasil
      router.push("/result");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center">
      {step === 0 && (
        <StatSection
          title="Core Stats"
          category="core"
          questions={coreQuestions}
          onNext={handleNext}
        />
      )}
      {step === 1 && (
        <StatSection
          title="Professional Stats"
          category="professional"
          questions={professionalQuestions}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <StatSection
          title="Mental Stats"
          category="mental"
          questions={mentalQuestions}
          onNext={handleNext}
        />
      )}
      {step === 3 && (
        <StatSection
          title="Skill Stats"
          category="skills"
          questions={skillQuestions}
          onNext={handleNext}
        />
      )}
    </main>
  );
}
