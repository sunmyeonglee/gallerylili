import { defineField, defineType } from "sanity";

export const pressArticle = defineType({
  name: "pressArticle",
  title: "보도자료",
  type: "document",
  fields: [
    defineField({
      name: "publication",
      title: "매체명",
      type: "object",
      fields: [
        defineField({ name: "ko", title: "한글", type: "string" }),
        defineField({ name: "en", title: "English", type: "string" }),
      ],
      description: "예: 조선일보 / The Korea Herald",
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
      name: "slug",
      title: "Slug (상세 페이지용)",
      type: "slug",
      description: "상세 페이지가 필요한 경우에만 입력 (URL이 없는 저널, 사진+텍스트 자료 등)",
      options: { source: "title.en", maxLength: 96 },
    }),

    defineField({
      name: "url",
      title: "기사 링크",
      type: "url",
      description: "외부 링크가 있는 경우 입력. slug와 url 중 하나만 사용.",
    }),

    defineField({
      name: "date",
      title: "발행일",
      type: "date",
    }),

    defineField({
      name: "images",
      title: "이미지",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "상세 페이지용 이미지 (slug 사용 시)",
    }),

    defineField({
      name: "body",
      title: "본문",
      type: "object",
      description: "상세 페이지용 텍스트 (slug 사용 시)",
      fields: [
        defineField({ name: "ko", title: "한글", type: "text", rows: 10 }),
        defineField({ name: "en", title: "English", type: "text", rows: 10 }),
      ],
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
      subtitle: "publication.ko",
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
