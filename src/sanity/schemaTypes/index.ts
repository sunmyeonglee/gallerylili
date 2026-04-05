import { type SchemaTypeDefinition } from 'sanity'
import { artist } from './artist'
import { artwork } from './artwork'
import { pressArticle, videoItem } from './mediaItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artist, artwork, pressArticle, videoItem],
}
