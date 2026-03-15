import { defineField, defineType } from "sanity";

export const artwork = defineType({
  name: "artwork",
  title: "작품",
  type: "document",
  fields: [
    // ── 제목 ──────────────────────────────────────────────
    defineField({
      name: "title",
      title: "작품명",
      type: "object",
      fields: [
        defineField({
          name: "ko",
          title: "한글",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({ name: "en", title: "영문", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.ko" },
      validation: (r) => r.required(),
    }),

    // ── 작가 ──────────────────────────────────────────────
    defineField({
      name: "artist",
      title: "작가",
      type: "reference",
      to: [{ type: "artist" }],
      validation: (r) => r.required(),
    }),

    // ── 제작 정보 ─────────────────────────────────────────
    defineField({
      name: "year",
      title: "제작연도",
      type: "string",
      placeholder: "예: 1997 또는 1997-1998",
      validation: (r) =>
        r
          .required()
          .regex(/^\d{4}(-\d{4})?$/, { name: "연도 형식", invert: false }),
    }),

    defineField({
      name: "medium",
      title: "재료",
      type: "object",
      fields: [
        defineField({ name: "ko", title: "한글", type: "string" }),
        defineField({ name: "en", title: "영문", type: "string" }),
      ],
    }),

    defineField({
      name: "dimensions",
      title: "크기",
      type: "object",
      fields: [
        defineField({
          name: "ko",
          title: "한글",
          type: "string",
          description: "예: 120 × 80 × 40 cm, 가변 크기",
        }),
        defineField({
          name: "en",
          title: "영문",
          type: "string",
          description: "예: 120 × 80 × 40 cm, Variable size",
        }),
      ],
    }),

    // ── 설명 ──────────────────────────────────────────────
    defineField({
      name: "description",
      title: "작품 설명",
      type: "object",
      fields: [
        defineField({ name: "ko", title: "한글", type: "text", rows: 6 }),
        defineField({ name: "en", title: "영문", type: "text", rows: 6 }),
      ],
    }),

    // ── 이미지 ────────────────────────────────────────────
    defineField({
      name: "images",
      title: "이미지",
      type: "array",
      options: { layout: "grid" },
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "group",
              title: "그룹",
              type: "string",
              description:
                "이미지가 많을 때 선택적으로 구분 (예: 제작 과정, 제작 완료, 현장 설치)",
            }),
            defineField({ name: "caption", title: "캡션", type: "string" }),
          ],
        },
      ],
      validation: (r) => r.required().min(1),
    }),

    // ── 설치 장소 ─────────────────────────────────────────
    defineField({
      name: "location",
      title: "설치 장소",
      type: "object",
      fields: [
        defineField({
          name: "ko",
          title: "한글",
          type: "string",
          description: "예: 바이엘 본사, 레버쿠젠, 독일",
        }),
        defineField({
          name: "en",
          title: "영문",
          type: "string",
          description: "예: Bayer Headquarters, Leverkusen, Germany",
        }),
      ],
    }),

    // ── 영상 ──────────────────────────────────────────────
    defineField({
      name: "videoFile",
      title: "영상 파일",
      type: "file",
      options: { accept: "video/*" },
      description:
        "파일 업로드 시 URL보다 우선 표시됩니다. (mp4 파일 형식만 가능)",
    }),

    defineField({
      name: "videoUrl",
      title: "영상 URL",
      type: "url",
      description: "YouTube / Vimeo 링크 (영상 파일이 없을 때 사용)",
    }),
  ],

  preview: {
    select: {
      title: "title.ko",
      subtitle: "artist.name.ko",
      media: "images.0",
    },
  },
});
