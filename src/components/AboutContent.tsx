'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  ko: {
    sections: [
      {
        title: '갤러리 소개',
        body: `갤러리 릴리는 키네틱 아트, 오토마타, 움직이는 조형물을 중심으로 한 작품을 전문적으로 다루는 갤러리입니다.
국내에서는 아직 체계적으로 소개되고 유통된 사례가 드문 이 장르에 주목하여, 움직임이 만들어내는 물성, 구조, 시간성을 하나의 예술 언어로 탐구하는 작업들을 선별해 소개합니다.
갤러리 릴리는 작품을 단순히 전시하는 공간을 넘어, 작동하고 경험되는 예술이 실제 환경 속에서 살아 움직일 수 있도록 연결하는 역할을 지향합니다.`,
      },
      {
        title: '비전',
        body: `갤러리 릴리는 움직이는 조형 예술이 일시적인 전시를 넘어 독립적인 예술 장르로 인식될 수 있는 기반을 만들어가고자 합니다.
국내에서 아직 충분히 다뤄지지 않은 키네틱 아트와 오토마타 영역의 출발점으로서, 작품과 기록, 경험이 축적되는 지속 가능한 플랫폼을 지향합니다.`,
      },
      {
        title: '사업 방향',
        body: `갤러리 릴리는 큐레이션을 기반으로 한 작품 소개와 함께, 키네틱 작품의 특성을 고려한 판매 및 대여를 병행합니다.
전시, 공간 연출, 컬렉션, 장기 설치 등 다양한 방식으로 작품이 실제 공간에서 작동될 수 있는 기회를 제안하며, 작가와 작품, 그리고 공간을 유기적으로 연결하는 유통 구조를 구축해 나가고자 합니다.`,
      },
    ],
  },
  en: {
    sections: [
      {
        title: 'About the Gallery',
        body: `Gallery Lili is a gallery dedicated to kinetic art, automata, and moving sculptural works.
Focusing on a field that remains largely unexplored within the Korean art landscape, the gallery presents works that investigate motion as material, structure, and temporal experience.
Beyond exhibition, Gallery Lili aims to create a context in which moving artworks can be encountered as living, functioning presences within real spaces.`,
      },
      {
        title: 'Vision',
        body: `Gallery Lili seeks to establish a foundation where kinetic and moving sculptural art can be recognized as an independent and enduring artistic field.
Positioning itself as a point of departure, the gallery aspires to build a sustainable platform where works, documentation, and experiential value accumulate over time.`,
      },
      {
        title: 'Business Direction',
        body: `Through a curatorial approach, Gallery Lili introduces selected works while supporting both sales and rental programs tailored to kinetic art.
By exploring exhibitions, spatial installations, collections, and long-term placements, the gallery facilitates ways for moving artworks to operate within diverse environments, fostering a dynamic relationship between artists, works, and spaces.`,
      },
    ],
  },
}

export default function AboutContent() {
  const { lang } = useLanguage()
  const { sections } = content[lang]

  return (
    <main className="pt-32 pb-24 px-5 md:px-8 max-w-2xl mx-auto">
      <div className="flex flex-col gap-16">
        {sections.map((section, i) => (
          <section key={section.title}>
            {i === 0 ? (
              <h1 className="text-xs tracking-widest uppercase text-zinc-400 mb-5">
                {section.title}
              </h1>
            ) : (
              <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-5">
                {section.title}
              </h2>
            )}
            <p className="text-sm text-zinc-700 leading-8 whitespace-pre-line">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </main>
  )
}
