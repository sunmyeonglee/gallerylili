import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { PRESS_DETAIL_QUERY } from '@/sanity/lib/queries'
import PressDetailContent from '@/components/PressDetailContent'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export default async function PressDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await client.fetch(PRESS_DETAIL_QUERY, { slug })

  if (!article) notFound()

  return <PressDetailContent article={article} />
}
