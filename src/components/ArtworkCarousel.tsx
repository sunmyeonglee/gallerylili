'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

type ArtworkImage = {
  _key: string
  asset: SanityImageSource
  group?: string
  caption?: string
}

type Props = {
  images: ArtworkImage[]
  alt: string
}

export default function ArtworkCarousel({ images, alt }: Props) {
  const [index, setIndex] = useState(0)

  if (!images.length) return null

  const current = images[index]

  return (
    <div className="flex flex-col gap-4">
      {/* 메인 이미지 */}
      <div className="relative w-full aspect-[4/3] bg-zinc-100 overflow-hidden">
        <Image
          key={index}
          src={urlFor(current.asset).width(1600).height(1200).fit('max').url()}
          alt={current.caption ?? alt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-contain"
          priority={index === 0}
        />

        {/* 이전 / 다음 버튼 */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white transition-colors text-zinc-800"
              aria-label="이전 이미지"
            >
              ‹
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white transition-colors text-zinc-800"
              aria-label="다음 이미지"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* 캡션 / 그룹 */}
      {(current.caption || current.group) && (
        <p className="text-xs text-zinc-400 text-center">
          {current.group && <span className="mr-2 text-zinc-500">{current.group}</span>}
          {current.caption}
        </p>
      )}

      {/* 썸네일 도트 */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 flex-wrap">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? 'bg-zinc-800' : 'bg-zinc-300'
              }`}
              aria-label={`이미지 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
