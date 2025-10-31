type StatCategory = Record<string, number>

interface Stats {
  core: StatCategory
  professional: StatCategory
  mental: StatCategory
  skills: StatCategory
}

export function generateCareer(stats: Stats) {
  // Gabung semua nilai
  const merged = {
    ...stats.core,
    ...stats.professional,
    ...stats.mental,
    ...stats.skills,
  }

  // Hitung dimensi besar
  const creativity = (merged.creativity ?? 0) + (merged.art_design ?? 0)
  const logic = (merged.logic ?? 0) + (merged.tech_logic ?? 0)
  const leadership = (merged.leadership ?? 0) + (merged.business_strategy ?? 0)
  const empathy = (merged.teamwork ?? 0) + (merged.people_society ?? 0)
  const resilience = (merged.persistence ?? 0) + (merged.stress_resistance ?? 0)

  // Cari nilai tertinggi
  const dominant = [
    { key: 'creativity', value: creativity },
    { key: 'logic', value: logic },
    { key: 'leadership', value: leadership },
    { key: 'empathy', value: empathy },
    { key: 'resilience', value: resilience },
  ].sort((a, b) => b.value - a.value)[0].key

  // Cocokkan dengan “class”
  const classMap: Record<string, { name: string; desc: string }> = {
    creativity: {
      name: 'Creative Innovator',
      desc: 'Kamu cocok di pekerjaan yang butuh imajinasi tinggi dan fleksibilitas berpikir — seperti designer, writer, atau content strategist.',
    },
    logic: {
      name: 'Analytical Builder',
      desc: 'Kamu cenderung berpikir sistematis dan cocok di ranah teknologi, engineering, atau analisis data.',
    },
    leadership: {
      name: 'Strategic Leader',
      desc: 'Kamu punya naluri mengarahkan dan mengorganisir. Cocok di manajemen, bisnis, atau entrepreneurship.',
    },
    empathy: {
      name: 'Human Connector',
      desc: 'Kamu berorientasi pada orang dan makna sosial. Cocok di HR, edukasi, atau komunikasi publik.',
    },
    resilience: {
      name: 'Endurance Achiever',
      desc: 'Kamu tahan banting dan fokus jangka panjang. Cocok di riset, proyek kompleks, atau bidang yang butuh konsistensi tinggi.',
    },
  }

  return classMap[dominant]
}
