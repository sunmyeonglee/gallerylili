"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { pickLang } from "@/lib/translations";

type VideoItem = {
  _id: string;
  title: { ko?: string; en?: string } | null;
  youtubeUrl: string;
  date: string | null;
};

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

type ActiveVideo =
  | { type: "youtube"; id: string }
  | { type: "direct"; url: string };

export default function VideosSection({ videos }: { videos: VideoItem[] }) {
  const { lang } = useLanguage();
  const [active, setActive] = useState<ActiveVideo | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = (video: ActiveVideo) => {
    setActive(video);
    requestAnimationFrame(() => setOverlayVisible(true));
  };

  const close = () => {
    setOverlayVisible(false);
    setTimeout(() => setActive(null), 300);
  };

  if (videos.length === 0) return null;

  return (
    <>
      <section>
        <h1 className="text-xs tracking-widest uppercase text-zinc-400 mb-8">
          Videos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 items-start">
          {videos.map((video) => {
            const youtubeId = getYouTubeId(video.youtubeUrl);
            const direct = !youtubeId && isDirectVideo(video.youtubeUrl);
            if (!youtubeId && !direct) return null;

            const title = pickLang(video.title?.ko, video.title?.en, lang);

            return (
              <button
                key={video._id}
                onClick={() =>
                  open(
                    youtubeId
                      ? { type: "youtube", id: youtubeId }
                      : { type: "direct", url: video.youtubeUrl },
                  )
                }
                className="text-left group cursor-pointer w-full"
              >
                <div className="relative aspect-video bg-zinc-100 overflow-hidden">
                  {youtubeId ? (
                    <>
                      <Image
                        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                        alt={title}
                        fill
                        className="object-cover md:grayscale transition-all duration-500 md:group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <circle cx="20" cy="20" r="20" fill="rgba(0,0,0,0.3)" />
                          <polygon points="16,13 30,20 16,27" fill="white" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    /* 직접 영상 URL — 첫 프레임을 썸네일로 표시 */
                    <>
                      <video
                        src={`${video.youtubeUrl}#t=10`}
                        preload="metadata"
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover md:grayscale transition-all duration-500 md:group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="20"
                            fill="rgba(0,0,0,0.3)"
                          />
                          <polygon points="16,13 30,20 16,27" fill="white" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-3 space-y-0.5">
                  <p className="text-sm font-medium text-zinc-900">{title}</p>
                  {video.date && <p className="text-sm text-zinc-400">{video.date}</p>}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {mounted &&
        active &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(0,0,0,0.9)",
              opacity: overlayVisible ? 1 : 0,
              transition: "opacity 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={close}
          >
            <div
              style={{ width: "90vw", maxWidth: 960 }}
              onClick={(e) => e.stopPropagation()}
            >
              {active.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=1`}
                  style={{ width: "100%", aspectRatio: "16/9", border: "none" }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video
                  src={active.url}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: "100%", maxHeight: "80vh", display: "block" }}
                />
              )}
            </div>
            <button
              onClick={close}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "rgba(255,255,255,0.7)",
                fontSize: 24,
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
