'use client'

import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  const [visible, setVisible] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const [lbVisible, setLbVisible] = useState(false)
  const [lbOverlay, setLbOverlay] = useState(false)

  // 메인 캐러셀 이동
  const goTo = useCallback((next: number) => {
    setVisible(false)
    setTimeout(() => setIndex(next), 200)
  }, [])

  // 라이트박스 이동
  const lbGoTo = useCallback((next: number) => {
    setLbVisible(false)
    setTimeout(() => setLbIndex(next), 200)
  }, [])

  // 라이트박스 열 때 현재 메인 index로 동기화
  const openLightbox = () => {
    setLbIndex(index)
    setLbVisible(false)
    setLbOverlay(false)
    setLightbox(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setLbOverlay(true)))
  }

  // ESC / 방향키
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') lbGoTo((lbIndex + 1) % images.length)
      if (e.key === 'ArrowLeft') lbGoTo((lbIndex - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, lbIndex, images.length, lbGoTo])

  if (!images.length) return null

  const current = images[index]
  const lbCurrent = images[lbIndex]

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* 메인 이미지 */}
        <div
          className="relative w-full aspect-4/3 bg-zinc-100 overflow-hidden cursor-zoom-in"
          onClick={openLightbox}
        >
          <Image
            key={index}
            src={urlFor(current.asset).width(1600).height(1200).fit('max').url()}
            alt={current.caption ?? alt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain"
            priority={index === 0}
            onLoad={() => setVisible(true)}
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goTo((index - 1 + images.length) % images.length) }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white transition-colors text-zinc-800 cursor-pointer"
                aria-label="이전 이미지"
              >‹</button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo((index + 1) % images.length) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white transition-colors text-zinc-800 cursor-pointer"
                aria-label="다음 이미지"
              >›</button>
            </>
          )}
        </div>

        {(current.caption || current.group) && (
          <p className="text-xs text-zinc-400 text-center">
            {current.group && <span className="mr-2 text-zinc-500">{current.group}</span>}
            {current.caption}
          </p>
        )}

        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 flex-wrap">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${i === index ? 'bg-zinc-800' : 'bg-zinc-300'}`}
                aria-label={`이미지 ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {lightbox && createPortal(
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.8)',
            opacity: lbOverlay ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
          }}
          onClick={() => setLightbox(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`lb-${lbIndex}`}
            src={urlFor(lbCurrent.asset).width(2400).fit('max').url()}
            alt={lbCurrent.caption ?? alt}
            onClick={(e) => e.stopPropagation()}
            onLoad={() => setLbVisible(true)}
            style={{
              maxWidth: '90vw', maxHeight: '90vh',
              objectFit: 'contain', cursor: 'default',
              opacity: lbVisible ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          <button
            onClick={() => setLightbox(false)}
            style={{ position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.7)', fontSize: 24, cursor: 'pointer', background: 'none', border: 'none' }}
            aria-label="닫기"
          >✕</button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); lbGoTo((lbIndex - 1 + images.length) % images.length) }}
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.7)', fontSize: 32, cursor: 'pointer', background: 'none', border: 'none' }}
                aria-label="이전 이미지"
              >‹</button>
              <button
                onClick={(e) => { e.stopPropagation(); lbGoTo((lbIndex + 1) % images.length) }}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.7)', fontSize: 32, cursor: 'pointer', background: 'none', border: 'none' }}
                aria-label="다음 이미지"
              >›</button>
            </>
          )}
        </div>,
        document.body
      )}
    </>
  )
}
