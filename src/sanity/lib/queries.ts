import { defineQuery } from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    "heroImageUrl": heroImage.asset->url,
    "landingImages": [
      landingImageWorks.asset->url,
      landingImageMedia.asset->url,
      landingImageAbout.asset->url
    ]
  }
`)

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
  *[_type == "pressArticle"] | order(date desc) {
    _id,
    "publication": { "ko": publication.ko, "en": publication.en },
    title,
    url,
    date,
    "slug": slug.current
  }
`)

export const PRESS_DETAIL_QUERY = defineQuery(`
  *[_type == "pressArticle" && slug.current == $slug][0] {
    _id,
    "publication": { "ko": publication.ko, "en": publication.en },
    title,
    date,
    "images": images[].asset->url,
    body
  }
`)

export const VIDEOS_QUERY = defineQuery(`
  *[_type == "videoItem"] | order(date desc) {
    _id,
    title,
    youtubeUrl,
    date
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

export const CONCEPT_PROJECTS_QUERY = defineQuery(`
  *[_type == "conceptProject"] | order(date desc) {
    _id,
    title,
    concept,
    date,
    "images": images[].asset->url
  }
`)

export const LANDING_IMAGES_QUERY = defineQuery(`
  *[_type == "artwork"] | order(year desc)[0...3] {
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
    docentFile { asset-> },
    docentUrl,
    "artist": artist->{ name }
  }
`)
