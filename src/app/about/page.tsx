import type { Metadata } from 'next'
import AboutContent from '@/components/AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description: '갤러리 릴리 소개 — 키네틱 아트, 오토마타, 움직이는 조형 예술을 전문으로 하는 갤러리. Gallery Lili specializes in kinetic art and moving sculptural works.',
  alternates: { canonical: 'https://www.gallerylili.com/about' },
  openGraph: {
    title: 'About — Gallery Lili',
    description: '갤러리 릴리 소개 — 키네틱 아트, 오토마타, 움직이는 조형 예술을 전문으로 하는 갤러리.',
    url: 'https://www.gallerylili.com/about',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
