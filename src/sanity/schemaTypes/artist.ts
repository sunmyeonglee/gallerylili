import { defineField, defineType } from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: '작가',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '작가명',
      type: 'object',
      fields: [
        defineField({ name: 'ko', title: '한글', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'en', title: '영문', type: 'string' }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.ko' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'profileImage',
      title: '프로필 사진',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: '약력',
      type: 'object',
      fields: [
        defineField({ name: 'ko', title: '한글', type: 'text', rows: 5 }),
        defineField({ name: 'en', title: '영문', type: 'text', rows: 5 }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name.ko', subtitle: 'name.en', media: 'profileImage' },
  },
})
