'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)

  // 메인 캐러셀
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [blurVisible, setBlurVisible] = useState(false)
  const [blurSize, setBlurSize] = useState<{ width: number; height: number } | null>(null)

  // 라이트박스
  const [lightbox, setLightbox] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const [lbVisible, setLbVisible] = useState(false)
  const [lbBlurVisible, setLbBlurVisible] = useState(false)
  const [lbBlurSize, setLbBlurSize] = useState<{ width: number; height: number } | null>(null)
  const [lbOverlay, setLbOverlay] = useState(false)

  // 비디오
  const [videoOpen, setVideoOpen] = useState(false)
  const [videoOverlay, setVideoOverlay] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const goTo = useCallback((next: number) => {
    setVisible(false)
    setBlurVisible(false)
    setBlurSize(null)
    setTimeout(() => setIndex(next), 200)
  }, [])

  const lbGoTo = useCallback((next: number) => {
    setLbVisible(false)
    setLbBlurVisible(false)
    setLbBlurSize(null)
    setTimeout(() => setLbIndex(next), 200)
  }, [])

  const openLightbox = () => {
    setLbIndex(index)
    setLbVisible(false)
    setLbBlurVisible(false)
    setLbBlurSize(null)
    setLbOverlay(false)
    setLightbox(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setLbOverlay(true)))
  }

  const handleLbBlurLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setLbBlurVisible(true)
    const { naturalWidth: nw, naturalHeight: nh } = e.currentTarget
    const scale = Math.min((window.innerWidth * 0.9) / nw, (window.innerHeight * 0.9) / nh)
    setLbBlurSize({ width: nw * scale, height: nh * scale })
  }

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
          ref={containerRef}
          className="relative w-full aspect-4/3 bg-zinc-100 overflow-hidden cursor-zoom-in"
          onClick={openLightbox}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`blur-${index}`}
            src={urlFor(current.asset).width(40).url()}
            alt=""
            aria-hidden="true"
            onLoad={(e) => {
              setBlurVisible(true)
              const { naturalWidth: nw, naturalHeight: nh } = e.currentTarget
              const c = containerRef.current
              if (!c) return
              const scale = Math.min(c.offsetWidth / nw, c.offsetHeight / nh)
              setBlurSize({ width: Math.round(nw * scale), height: Math.round(nh * scale) })
            }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%) scale(1.05)',
              width: blurSize?.width ?? 0,
              height: blurSize?.height ?? 0,
              objectFit: 'fill',
              filter: 'blur(16px)',
              opacity: blurVisible && !visible ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
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
            overflow: 'hidden',
            cursor: 'default',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(false) }}
        >
          {/* 블러 플레이스홀더 */}
          <div
            style={{
              position: 'absolute',
              width: lbBlurSize?.width ?? 0,
              height: lbBlurSize?.height ?? 0,
              overflow: 'hidden',
              opacity: lbBlurVisible && !lbVisible ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={`lb-blur-${lbIndex}`}
              src={urlFor(lbCurrent.asset).width(40).url()}
              alt=""
              aria-hidden="true"
              onLoad={handleLbBlurLoad}
              style={{ width: '100%', height: '100%', objectFit: 'fill', filter: 'blur(20px)', transform: 'scale(1.1)' }}
            />
          </div>

          {/* 메인 이미지 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`lb-${lbIndex}`}
            src={urlFor(lbCurrent.asset).width(2400).fit('max').url()}
            alt={lbCurrent.caption ?? alt}
            onLoad={() => setLbVisible(true)}
            style={{
              width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '90vh',
              cursor: 'default',
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
                onClick={() => lbGoTo((lbIndex - 1 + images.length) % images.length)}
                style={{ position: 'absolute', left: 0, top: 0, width: 64, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 32, cursor: 'pointer', background: 'none', border: 'none' }}
                aria-label="이전 이미지"
              >‹</button>
              <button
                onClick={() => lbGoTo((lbIndex + 1) % images.length)}
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
          {!videoLoaded && isVideoFile && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div className="spinner" />
            </div>
          )}

          <div style={{ width: '90vw', maxWidth: 960, position: 'relative' }}>
            {isVideoFile ? (
              <video
                src={videoSrc}
                controls
                autoPlay
                playsInline
                onCanPlay={() => setVideoLoaded(true)}
                onClick={(e) => e.stopPropagation()}
                style={{ width: 'auto', maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto', opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
              />
            ) : (
              <iframe
                src={videoSrc}
                style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
                allowFullScreen
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
