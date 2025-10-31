'use client'

import { useState } from 'react'
import { useGameStore } from '@/store/useGameStore'

export default function StatSection({
  title,
  category,
  questions,
  onNext
}: {
  title: string
  category: 'core' | 'professional' | 'mental' | 'skills'
  questions: { id: string; label: string }[]
  onNext: () => void
}) {
  const { setStat } = useGameStore()
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const handleChange = (id: string, value: number) => {
    setAnswers(prev => ({ ...prev, [id]: value }))
    setStat(category, id, value)
  }

  const isComplete = questions.every(q => answers[q.id] !== undefined)

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>

      {questions.map(q => (
        <div key={q.id} className="space-y-2">
          <p className="font-medium">{q.label}</p>
          <input
            type="range"
            min={1}
            max={10}
            value={answers[q.id] ?? 5}
            onChange={e => handleChange(q.id, Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
          <p className="text-sm text-gray-500 text-right">Nilai: {answers[q.id] ?? 5}</p>
        </div>
      ))}

      <button
        onClick={onNext}
        disabled={!isComplete}
        className={`w-full py-2 mt-6 rounded-lg text-white ${isComplete ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Lanjut
      </button>
    </div>
  )
}
