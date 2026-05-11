import { defineField, defineType } from "sanity";

export const conceptProject = defineType({
  name: "conceptProject",
  title: "컨셉 프로젝트",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "제목",
      type: "object",
      fields: [
        defineField({ name: "ko", title: "한글", type: "string", validation: (r) => r.required() }),
        defineField({ name: "en", title: "영문", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "concept",
      title: "컨셉 문장 (1~2줄)",
      type: "object",
      description: "경험 중심의 짧은 설명. 기술 설명 없이 아이디어만.",
      fields: [
        defineField({ name: "ko", title: "한글", type: "text", rows: 2 }),
        defineField({ name: "en", title: "영문", type: "text", rows: 2 }),
      ],
    }),

    defineField({
      name: "images",
      title: "이미지",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.required().min(1),
    }),

    defineField({
      name: "date",
      title: "날짜",
      type: "date",
      validation: (r) => r.required(),
    }),
  ],

  orderings: [
    {
      title: "날짜 최신순",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title.ko",
      media: "images.0",
    },
  },
});
