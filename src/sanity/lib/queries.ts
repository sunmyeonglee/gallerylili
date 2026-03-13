import { defineQuery } from 'next-sanity'

export const ARTWORKS_LIST_QUERY = defineQuery(`
  *[_type == "artwork"] | order(year desc) {
    _id,
    "slug": slug.current,
    title,
    year,
    "image": images[0]
  }
`)

export const ARTWORK_DETAIL_QUERY = defineQuery(`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    year,
    medium,
    dimensions,
    description,
    images,
    videoFile { asset-> },
    videoUrl,
    "artist": artist->{ name }
  }
`)
