import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import { client, draftClient } from '@/sanity/lib/client'
import { PRESS_DETAIL_QUERY } from '@/sanity/lib/queries'
import PressDetailContent from '@/components/PressDetailContent'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export default async function PressDetailPage({ params }: Props) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const article = await (isEnabled ? draftClient : client).fetch(PRESS_DETAIL_QUERY, { slug })

  if (!article) notFound()

  return <PressDetailContent article={article} />
}
