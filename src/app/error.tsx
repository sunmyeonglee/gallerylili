'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-8">
      <p className="text-sm text-zinc-400">오류가 발생했습니다.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="text-sm text-zinc-900 underline underline-offset-4 cursor-pointer"
        >
          다시 시도
        </button>
        <Link href="/" className="text-sm text-zinc-400 underline underline-offset-4">
          홈으로
        </Link>
      </div>
    </main>
  )
}
