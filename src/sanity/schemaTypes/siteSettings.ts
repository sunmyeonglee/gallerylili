import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "사이트 설정",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "히어로 이미지",
      type: "image",
      options: { hotspot: true },
      description: "메인 페이지 배경 이미지",
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "사이트 설정" };
    },
  },
});
