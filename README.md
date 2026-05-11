# Gallery Lili — Official Website

키네틱 아트, 오토마타, 움직이는 조형물을 전문으로 하는 갤러리 릴리의 공식 웹사이트.  
클라이언트의 요청으로 기획부터 배포까지 단독으로 개발한 프로젝트입니다.

🔗 [gallerylili.com](https://www.gallerylili.com)

---

## 주요 구현 사항

### 클라이언트 중심의 콘텐츠 관리
개발자 없이 클라이언트가 직접 작품, 보도자료, 영상 등 모든 콘텐츠를 수정·추가할 수 있도록 **Sanity CMS**를 도입했습니다. 코드 배포 없이 Sanity Studio(웹 기반 관리자 UI)에서 변경사항을 즉시 반영할 수 있습니다.

콘텐츠를 publish하기 전 실제 사이트에서 미리 확인할 수 있도록 **Next.js Draft Mode**를 구현했습니다. 클라이언트가 승인하기 전까지 변경사항이 외부에 노출되지 않습니다.

### 사이트 구조
랜딩 페이지에서 3개 섹션으로 진입하는 구조로 설계했습니다. 버튼별 배경 이미지가 3초마다 자동 순환하며, 호버 시 해당 이미지로 즉시 전환됩니다.

- **Works**: 전체 작품 목록 및 상세 페이지 (이미지 캐러셀 + 라이트박스)
- **Concepts**: 제안 가능한 컨셉 프로젝트 소개
- **System**: 작품 제작(Commission), 렌탈, 유지관리 서비스 구조
- **Media**: 보도자료 + YouTube 영상
- **About**: 갤러리 소개 및 연락처
- **KO/EN 이중 언어**: 헤더 언어 토글로 모든 콘텐츠 언어 전환

### 성능 및 SEO
- Vercel CDN + ISR(점진적 정적 재생성)으로 콘텐츠 갱신과 응답 속도 양립
- Sanity Image CDN으로 WebP 변환, 해상도별 최적화
- JSON-LD 구조화 데이터, OG 이미지, 동적 sitemap 구현
- Google Analytics 4 + Google Tag Manager 연동

### UX
- 랜딩 페이지 3분할 패널 + 이미지 자동 순환 (데스크탑), 풀스크린 이미지 순환 (모바일)
- 이미지/영상 혼합 캐러셀 (터치 스와이프, 라이트박스)
- 세로 이미지는 블러 배경으로 레터박스 처리, 가로 이미지는 fill
- 페이지 전환 애니메이션

---

## 기술 스택

| 분류 | 사용 기술 |
|------|----------|
| Framework | Next.js 16 (App Router) |
| CMS | Sanity.io |
| Styling | Tailwind CSS |
| Icons | Phosphor Icons |
| Fonts | DM Sans, Pretendard |
| Deployment | Vercel |
| Analytics | Google Analytics 4, Google Tag Manager |

---

## 로컬 실행

```bash
npm install
```

`.env.local` 생성:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
DRAFT_MODE_SECRET=your_secret
```

```bash
npm run dev
```

- 사이트: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)
