import { defineField, defineType } from "sanity";

export const pressArticle = defineType({
  name: "pressArticle",
  title: "Press",
  type: "document",
  fields: [
    defineField({
      name: "publication",
      title: "매체명",
      type: "string",
      description: "예: 조선일보, Dezeen",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "title",
      title: "기사 제목",
      type: "string",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "url",
      title: "기사 링크",
      type: "url",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "date",
      title: "발행일",
      type: "date",
    }),

    defineField({
      name: "logo",
      title: "매체 로고",
      type: "image",
    }),

    defineField({
      name: "order",
      title: "표시 순서",
      type: "number",
    }),
  ],

  orderings: [
    {
      title: "표시 순서",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "publication",
      media: "logo",
    },
  },
});

export const videoItem = defineType({
  name: "videoItem",
  title: "Videos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "영상 제목",
      type: "string",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "예: https://www.youtube.com/watch?v=xxxxx",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "order",
      title: "표시 순서",
      type: "number",
    }),
  ],

  orderings: [
    {
      title: "표시 순서",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "youtubeUrl",
    },
  },
});
