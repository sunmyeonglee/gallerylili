import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "사이트 설정",
  type: "document",
  fields: [
    defineField({
      name: "heroVideo",
      title: "히어로 영상",
      type: "file",
      options: { accept: "video/*" },
      description: "메인 페이지 배경 영상 (mp4 권장)",
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "사이트 설정" };
    },
  },
});
