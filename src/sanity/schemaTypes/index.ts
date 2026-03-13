import { type SchemaTypeDefinition } from 'sanity'
import { artist } from './artist'
import { artwork } from './artwork'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artist, artwork],
}
