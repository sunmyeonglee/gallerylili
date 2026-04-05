import { defineQuery } from 'next-sanity'

export const INSTALLATIONS_QUERY = defineQuery(`
  *[_type == "artwork" && featured == true] | order(year desc) {
    _id,
    title,
    year,
    location,
    "slug": slug.current,
    "image": images[0].asset->url
  }
`)

export const PRESS_QUERY = defineQuery(`
  *[_type == "pressArticle"] | order(order asc) {
    _id,
    publication,
    title,
    url,
    date,
    "logo": logo.asset->url
  }
`)

export const VIDEOS_QUERY = defineQuery(`
  *[_type == "videoItem"] | order(order asc) {
    _id,
    title,
    youtubeUrl
  }
`)

export const ARTWORKS_LIST_QUERY = defineQuery(`
  *[_type == "artwork"] | order(year desc) {
    _id,
    "slug": slug.current,
    title,
    year,
    location,
    "image": images[0]
  }
`)

export const ARTWORK_SLUGS_QUERY = defineQuery(`
  *[_type == "artwork" && defined(slug.current)]{ "slug": slug.current }
`)

export const ARTWORK_META_QUERY = defineQuery(`
  *[_type == "artwork" && slug.current == $slug][0] {
    title,
    "description": description.ko,
    "image": images[0].asset->url
  }
`)

export const ARTWORK_DETAIL_QUERY = defineQuery(`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    year,
    medium,
    dimensions,
    location,
    description,
    images[]{ ..., asset-> },
    videoFile { asset-> },
    videoUrl,
    "artist": artist->{ name }
  }
`)
