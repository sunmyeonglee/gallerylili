'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  ko: {
    sections: [
      {
        title: '갤러리 소개',
        body: `갤러리 릴리는 '움직임'을 중심으로 작동하는 예술을 다룹니다.

키네틱 아트와 오토마타를 기반으로,
움직임이 만들어내는 물성, 구조, 시간성을 하나의 언어로 탐구하는 작업들을 선별해 소개합니다.

국내에서는 아직 체계적으로 다루어지지 않은 이 장르에 주목하며,
작품이 단순히 전시되는 것을 넘어 실제 공간 속에서 작동하고 경험될 수 있도록 연결하는 역할을 지향합니다.`,
      },
      {
        title: '비전',
        body: `움직임은 단순한 효과가 아니라,
시간과 구조, 물성을 드러내는 하나의 언어입니다.

갤러리 릴리는 움직이는 조형 예술이 일시적인 전시를 넘어
독립적인 예술 장르로 인식될 수 있는 기반을 만들어가고자 합니다.

작품과 기록, 그리고 경험이 축적되는 구조를 통해
이 분야가 지속적으로 확장될 수 있는 환경을 구축합니다.`,
      },
      {
        title: '사업 방향',
        body: `갤러리 릴리는 큐레이션을 기반으로 한 작품 소개와 함께,
키네틱 작품의 특성을 고려한 판매와 대여를 병행합니다.

전시, 공간 연출, 컬렉션, 장기 설치 등 다양한 방식으로
작품이 실제 환경 속에서 작동할 수 있는 기회를 제안하며,

작가, 작품, 공간이 유기적으로 연결되는
지속 가능한 유통 구조를 구축해 나갑니다.`,
      },
    ],
  },
  en: {
    sections: [
      {
        title: 'About',
        body: `Gallery Lili focuses on art that operates through movement.

Rooted in kinetic art and automata,
we present works that explore materiality, structure, and time
as a language shaped by motion.

In a field that remains relatively underrepresented,
we are committed to connecting works with real environments
so that they can be experienced as active systems,
not simply displayed as objects.`,
      },
      {
        title: 'Vision',
        body: `Movement is not a visual effect,
but a language that reveals time, structure, and material.

Gallery Lili aims to establish moving sculpture
as an independent artistic discipline
beyond the context of temporary exhibitions.

By building a framework where works, records, and experiences accumulate,
we seek to create conditions for sustainable growth in this field.`,
      },
      {
        title: 'Direction',
        body: `Gallery Lili combines curatorial practice with
sales and rental strategies tailored to kinetic works.

Through exhibitions, spatial design, collections, and long-term installations,
we create opportunities for works to operate within real environments.

Our goal is to build a sustainable system
that connects artists, works, and spaces in an integrated way.`,
      },
    ],
  },
}

export default function AboutContent() {
  const { lang } = useLanguage()
  const { sections } = content[lang]

  return (
    <main className="pt-32 md:pt-40 pb-24 px-5 md:px-8 max-w-2xl mx-auto">
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
            <p className="text-sm text-zinc-700 leading-8">
              {section.body}
            </p>
          </section>
        ))}

        {/* Contact */}
        <section>
          <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-5">
            {lang === 'ko' ? '문의' : 'Contact'}
          </h2>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:lili@gallerylili.com"
              className="text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              lili@gallerylili.com
            </a>
            <a
              href="tel:+821052786053"
              className="text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              +82-10-5278-6053
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
