import { client } from '@/sanity/lib/client'
import { ARTWORKS_LIST_QUERY } from '@/sanity/lib/queries'
import WorksGrid from '@/components/WorksGrid'

export const revalidate = 60

export default async function WorksPage() {
  const artworks = await client.fetch(ARTWORKS_LIST_QUERY)

  return (
    <main className="pt-32 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <WorksGrid artworks={artworks} />
    </main>
  )
}
