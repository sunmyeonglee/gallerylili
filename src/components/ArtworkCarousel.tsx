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
  videoSrc?: string | null
  isVideoFile?: boolean
}

export default function ArtworkCarousel({ images, alt, videoSrc, isVideoFile }: Props) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const [lbVisible, setLbVisible] = useState(false)
  const [lbBlurVisible, setLbBlurVisible] = useState(false)
  const [lbBlurSize, setLbBlurSize] = useState<{ width: number; height: number } | null>(null)
  const [lbOverlay, setLbOverlay] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [videoOverlay, setVideoOverlay] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // 메인 캐러셀 이동
  const goTo = useCallback((next: number) => {
    setVisible(false)
    setTimeout(() => setIndex(next), 200)
  }, [])

  // 라이트박스 이동
  const lbGoTo = useCallback((next: number) => {
    setLbVisible(false)
    setLbBlurVisible(false)
    setLbBlurSize(null)
    setTimeout(() => setLbIndex(next), 200)
  }, [])

  // 라이트박스 열 때 현재 메인 index로 동기화
  const openLightbox = () => {
    setLbIndex(index)
    setLbVisible(false)
    setLbBlurVisible(false)
    setLbBlurSize(null)
    setLbOverlay(false)
    setLightbox(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setLbOverlay(true)))
  }

  // 블러 이미지 로드 시 실제 렌더링 크기 계산
  const handleBlurLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setLbBlurVisible(true)
    const { naturalWidth: nw, naturalHeight: nh } = e.currentTarget
    const maxW = window.innerWidth * 0.9
    const maxH = window.innerHeight * 0.9
    const scale = Math.min(maxW / nw, maxH / nh)
    setLbBlurSize({ width: nw * scale, height: nh * scale })
  }

  // ESC / 방향키
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightbox(false); setVideoOpen(false) }
      if (!lightbox) return
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

          {/* 영상 버튼 */}
          {videoSrc && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setVideoOverlay(false)
                setVideoLoaded(false)
                setVideoOpen(true)
                requestAnimationFrame(() => requestAnimationFrame(() => setVideoOverlay(true)))
              }}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-white/80 hover:bg-white transition-colors text-zinc-800 text-xs cursor-pointer"
              aria-label="영상 재생"
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <path d="M0 0L10 6L0 12V0Z"/>
              </svg>
              Video
            </button>
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
          <div
            style={{
              position: 'absolute',
              width: lbBlurSize?.width ?? 0,
              height: lbBlurSize?.height ?? 0,
              overflow: 'hidden',
              opacity: lbBlurVisible && !lbVisible ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={`lb-blur-${lbIndex}`}
              src={urlFor(lbCurrent.asset).width(40).url()}
              alt=""
              aria-hidden="true"
              onLoad={handleBlurLoad}
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
              }}
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`lb-${lbIndex}`}
            src={urlFor(lbCurrent.asset).width(2400).fit('max').url()}
            alt={lbCurrent.caption ?? alt}
            onClick={(e) => e.stopPropagation()}
            onLoad={() => setLbVisible(true)}
            style={{
              width: '90vw', height: '90vh',
              objectFit: 'contain', cursor: 'default',
              opacity: lbVisible ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          <button
            onClick={() => setLightbox(false)}
            style={{ position: 'absolute', top: 16, right: 16, zIndex: 1, color: 'rgba(255,255,255,0.7)', fontSize: 24, cursor: 'pointer', background: 'none', border: 'none' }}
            aria-label="닫기"
          >✕</button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); lbGoTo((lbIndex - 1 + images.length) % images.length) }}
                style={{ position: 'absolute', left: 0, top: 0, width: 64, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 32, cursor: 'pointer', background: 'none', border: 'none' }}
                aria-label="이전 이미지"
              >‹</button>
              <button
                onClick={(e) => { e.stopPropagation(); lbGoTo((lbIndex + 1) % images.length) }}
                style={{ position: 'absolute', right: 0, top: 0, width: 64, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 32, cursor: 'pointer', background: 'none', border: 'none' }}
                aria-label="다음 이미지"
              >›</button>
            </>
          )}
        </div>,
        document.body
      )}
      {videoOpen && videoSrc && createPortal(
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.9)',
            opacity: videoOverlay ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setVideoOpen(false)}
        >
          <div
            style={{ width: '90vw', maxWidth: 960, position: 'relative' }}
          >
            {isVideoFile ? (
              <>
                {!videoLoaded && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.2)',
                      borderTopColor: 'rgba(255,255,255,0.8)',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                  </div>
                )}
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  playsInline
                  onCanPlay={() => setVideoLoaded(true)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: 'auto', maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto', opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
                />
              </>
            ) : (
              <iframe
                src={videoSrc}
                style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
                allowFullScreen
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>

          <button
            onClick={() => setVideoOpen(false)}
            style={{ position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.7)', fontSize: 24, cursor: 'pointer', background: 'none', border: 'none' }}
            aria-label="닫기"
          >✕</button>
        </div>,
        document.body
      )}
    </>
  )
}
