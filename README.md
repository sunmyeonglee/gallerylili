# Gallery Lili — Official Website

키네틱 아트, 오토마타, 움직이는 조형물을 전문으로 하는 갤러리 릴리의 공식 웹사이트.  
클라이언트의 요청으로 기획부터 배포까지 단독으로 개발한 프로젝트입니다.

🔗 [gallerylili.com](https://www.gallerylili.com) &nbsp;|&nbsp; [@gal_lerylili](https://www.instagram.com/gal_lerylili/)

---

## 주요 구현 사항

### 클라이언트 중심의 콘텐츠 관리
개발자 없이 클라이언트가 직접 작품, 보도자료, 영상 등 모든 콘텐츠를 수정·추가할 수 있도록 **Sanity CMS**를 도입했습니다. 코드 배포 없이 Sanity Studio(웹 기반 관리자 UI)에서 변경사항을 즉시 반영할 수 있습니다.

유지관리 서비스 요금, 랜딩 이미지 등 마케팅 요소도 Sanity에서 직접 수정할 수 있도록 설계해 운영 의존도를 최소화했습니다.

### 사이트 구조
랜딩 페이지에서 3개 섹션으로 진입하는 구조로 설계했습니다. 버튼별 배경 이미지가 3초마다 자동 순환하며, 호버 시 해당 이미지로 즉시 전환됩니다.

- **Works** — 전체 작품 목록 및 상세 페이지 (이미지 캐러셀 + 라이트박스 + 영상 + 도슨트)
- **Concepts** — 제안 가능한 컨셉 프로젝트 소개
- **System** — 작품 제작(Commission), 렌탈, 유지관리 서비스 구조
- **Media** — 보도자료 + YouTube 영상
- **About** — 갤러리 소개 및 연락처
- **KO / EN 이중 언어** — 헤더 언어 토글로 모든 콘텐츠 즉시 전환

### 인터랙션
- **흑백 → 컬러 전환**: Works·Concepts 그리드 이미지는 기본 흑백으로 표시되며, 데스크탑 호버 / 모바일 터치 시 컬러로 전환됩니다. 모바일에서는 터치 즉시 컬러로 반응한 뒤 페이지로 이동합니다.
- **이미지·영상 캐러셀**: 터치 스와이프, 키보드 방향키, 라이트박스 지원. 세로 이미지는 블러 배경으로 레터박스 처리하고, 가로 이미지는 fill로 꽉 채웁니다.
- **랜딩 이미지 자동 순환**: 3초마다 섹션 버튼과 배경 이미지가 자동 전환되며, 호버 중에는 타이머가 일시정지됩니다.
- **도슨트 분리**: 작품 영상(소리 없음)과 도슨트 오디오를 별도 트리거로 분리해 관람 흐름을 제어합니다.

### 성능 및 SEO
- Vercel CDN + ISR(점진적 정적 재생성)으로 콘텐츠 갱신과 응답 속도 양립
- Sanity Image CDN으로 WebP 변환, 해상도별 최적화 (`sizes` 속성 명세)
- JSON-LD 구조화 데이터, OG 이미지, 동적 sitemap 구현
- Google Analytics 4 + Google Tag Manager 연동

---

## 기술 스택

| 분류 | 사용 기술 |
|------|----------|
| Framework | Next.js 16 (App Router) |
| CMS | Sanity.io |
| Styling | Tailwind CSS v4 |
| Icons | Phosphor Icons |
| Fonts | DM Sans (Latin), Pretendard (Korean) |
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
