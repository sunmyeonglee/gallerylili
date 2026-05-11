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
    defineField({
      name: "landingImageWorks",
      title: "랜딩 이미지 — Works",
      type: "image",
      options: { hotspot: true },
      description: "WORKS 버튼 활성화 시 배경 이미지",
    }),
    defineField({
      name: "landingImageMedia",
      title: "랜딩 이미지 — Media",
      type: "image",
      options: { hotspot: true },
      description: "MEDIA 버튼 활성화 시 배경 이미지",
    }),
    defineField({
      name: "landingImageAbout",
      title: "랜딩 이미지 — About",
      type: "image",
      options: { hotspot: true },
      description: "ABOUT 버튼 활성화 시 배경 이미지",
    }),
    defineField({
      name: "maintenanceRateBasic",
      title: "유지관리 요율 — Basic",
      type: "string",
      description: "예: ~10% (비워두면 기본값 사용)",
    }),
    defineField({
      name: "maintenanceRateStandard",
      title: "유지관리 요율 — Standard",
      type: "string",
      description: "예: ~20% (비워두면 기본값 사용)",
    }),
    defineField({
      name: "maintenanceRatePremium",
      title: "유지관리 요율 — Premium",
      type: "string",
      description: "예: ~30% (비워두면 기본값 사용)",
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "사이트 설정" };
    },
  },
});
