import { defineField, defineType } from "sanity";

export const pressArticle = defineType({
  name: "pressArticle",
  title: "보도자료",
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
      type: "object",
      fields: [
        defineField({ name: "ko", title: "한글", type: "string" }),
        defineField({ name: "en", title: "English", type: "string" }),
      ],
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
  ],

  orderings: [
    {
      title: "발행일 최신순",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title.ko",
      subtitle: "publication",
    },
  },
});

export const videoItem = defineType({
  name: "videoItem",
  title: "영상",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "영상 제목",
      type: "object",
      fields: [
        defineField({ name: "ko", title: "한글", type: "string" }),
        defineField({ name: "en", title: "English", type: "string" }),
      ],
    }),

    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "예: https://www.youtube.com/watch?v=xxxxx",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "date",
      title: "발행일",
      type: "date",
    }),
  ],

  orderings: [
    {
      title: "발행일 최신순",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title.ko",
      subtitle: "youtubeUrl",
    },
  },
});
