'use client'

import { usePathname } from 'next/navigation'

type Props = {
  isEnabled: boolean
  secret: string
}

export default function DraftModeBanner({ isEnabled, secret }: Props) {
  const pathname = usePathname()

  if (pathname?.startsWith('/studio')) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-100 flex items-center justify-between bg-zinc-900 px-5 py-3 text-xs text-white">
      <span className="opacity-60">{isEnabled ? 'Draft Mode 활성화됨' : 'Draft Mode 비활성화됨'}</span>
      {isEnabled ? (
        <a href="/api/draft/disable" className="underline hover:opacity-60 transition-opacity">
          Exit Draft Mode
        </a>
      ) : (
        <a href={`/api/draft/enable?secret=${secret}&redirect=${encodeURIComponent('/')}`} className="underline hover:opacity-60 transition-opacity">
          Enable Draft Mode
        </a>
      )}
    </div>
  )
}
