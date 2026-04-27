"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CompassToolIcon, HandshakeIcon } from "@phosphor-icons/react";

export default function SystemContent() {
  const { lang } = useLanguage();
  const isKo = lang === "ko";
  const [tab, setTab] = useState<"commission" | "rental">("commission");

  const commissionItems = isKo
    ? [
        "공간 맞춤 설계",
        "작가 매칭",
        "엔지니어링 설계",
        "제작 및 설치",
        "유지관리 포함",
      ]
    : [
        "Spatial & concept design",
        "Artist matching",
        "Engineering design",
        "Production & installation",
        "Maintenance included",
      ];

  const steps = isKo
    ? [
        {
          num: "01",
          title: "문의 / 상담",
          desc: "공간 목적, 예산, 요구사항 파악",
          deliverable: "상담 기록",
        },
        {
          num: "02",
          title: "공간 분석 / 제안",
          desc: "공간 실측 및 분석, 작품 컨셉 제안",
          deliverable: "공간 분석 리포트 · 컨셉 제안서",
        },
        {
          num: "03",
          title: "작가 매칭",
          desc: "공간과 목적에 적합한 작품 및 작가 매칭",
          deliverable: "작품 제안서 · 작가 포트폴리오",
        },
        {
          num: "04",
          title: "계약",
          desc: "제작 조건 및 일정 협의",
          deliverable: "계약서 · 프로젝트 일정표",
        },
        {
          num: "05",
          title: "제작",
          desc: "엔지니어링 설계, 프로토타입 테스트, 작품 제작",
          deliverable: "설계도면 · 테스트 리포트",
        },
        {
          num: "06",
          title: "설치",
          desc: "현장 설치, 시스템 세팅, 시운전 및 최종 검수",
          deliverable: "설치 완료 보고서 · 시운전 체크리스트",
        },
        {
          num: "07",
          title: "유지관리",
          desc: "정기 점검, 운영 지원, 안정적 성능 유지",
          deliverable: "유지관리 리포트 · 운영 지원 기록",
        },
      ]
    : [
        {
          num: "01",
          title: "Inquiry",
          desc: "Understand goals, budget and requirements",
          deliverable: "Consultation Record",
        },
        {
          num: "02",
          title: "Space Analysis",
          desc: "Analyze space, propose concept and artwork",
          deliverable: "Analysis Report & Concept Proposal",
        },
        {
          num: "03",
          title: "Artist Matching",
          desc: "Match the right artist and develop a concept",
          deliverable: "Artist Portfolio & Concept Proposal",
        },
        {
          num: "04",
          title: "Contract",
          desc: "Agree on scope, conditions and schedule",
          deliverable: "Signed Contract & Project Schedule",
        },
        {
          num: "05",
          title: "Production",
          desc: "Engineering design, prototyping and production",
          deliverable: "Design Report & Test Report",
        },
        {
          num: "06",
          title: "Installation",
          desc: "On-site installation, tuning and final inspection",
          deliverable: "Installation Report & Check List",
        },
        {
          num: "07",
          title: "Maintenance",
          desc: "Ongoing maintenance and operational support",
          deliverable: "Maintenance Report & Support Log",
        },
      ];

  const rentalItems = isKo
    ? [
        "단기 / 중기 / 장기 렌탈",
        "전시 / 공간 연출 / 이벤트 맞춤",
        "설치 및 회수 포함",
        "유지관리 포함",
      ]
    : [
        "Short / Mid / Long-term rental",
        "Exhibition / Space / Event",
        "Installation & return included",
        "Maintenance included",
      ];

  const rentalSteps = isKo
    ? [
        { num: "01", title: "렌탈 문의", desc: "기간, 목적, 예산 상담" },
        {
          num: "02",
          title: "작품 제안",
          desc: "공간 및 목적에 맞는 작품 제안",
        },
        { num: "03", title: "렌탈 계약", desc: "기간, 비용, 설치 조건 협의" },
        { num: "04", title: "설치 및 세팅", desc: "현장 설치 및 시운전" },
        { num: "05", title: "운영 지원", desc: "렌탈 기간 중 기술 지원" },
        { num: "06", title: "회수 및 관리", desc: "계약 종료 후 안전한 회수" },
      ]
    : [
        {
          num: "01",
          title: "Rental Inquiry",
          desc: "Period, purpose, budget consultation",
        },
        {
          num: "02",
          title: "Artwork Proposal",
          desc: "Propose artworks for your space",
        },
        {
          num: "03",
          title: "Rental Agreement",
          desc: "Period, fee, installation conditions",
        },
        {
          num: "04",
          title: "Installation & Setup",
          desc: "On-site installation and orientation",
        },
        {
          num: "05",
          title: "Operation Support",
          desc: "Technical support during rental",
        },
        {
          num: "06",
          title: "Return & Management",
          desc: "Safe return and inspection",
        },
      ];

  const rentalOptions = isKo
    ? [
        { term: "단기 렌탈", period: "1주 ~ 3개월", use: "전시 / 이벤트" },
        { term: "중기 렌탈", period: "3개월 ~ 1년", use: "공간 연출" },
        { term: "장기 렌탈", period: "1년 이상", use: "상설 전시" },
        { term: "맞춤 플랜", period: "기업 / 기관", use: "맞춤 기간 설정" },
      ]
    : [
        {
          term: "Short-term",
          period: "1 week – 3 months",
          use: "Exhibition / Event",
        },
        {
          term: "Mid-term",
          period: "3 months – 1 year",
          use: "Space enhancement",
        },
        {
          term: "Long-term",
          period: "1 year or more",
          use: "Permanent display",
        },
        { term: "Flexible", period: "Custom period", use: "Tailored plan" },
      ];

  const plans = [
    {
      name: "Basic",
      visit: isKo ? "연 2회 방문 점검" : "2 site visits per year",
      support: isKo ? "원격 기술 지원" : "Basic technical support",
      rate: "~10%",
    },
    {
      name: "Standard",
      visit: isKo ? "연 4회 방문 점검" : "4 site visits per year",
      support: isKo ? "소모품 교체 포함" : "Parts replacement included",
      rate: "~20%",
    },
    {
      name: "Premium",
      visit: isKo ? "연 12회 방문 점검" : "12 site visits per year",
      support: isKo ? "긴급 대응 포함" : "Priority & emergency support",
      rate: "~30%",
    },
  ];

  const serviceIncludes = isKo
    ? [
        "작동 상태 점검 및 성능 테스트",
        "기계 및 구동부 테스트",
        "전기 / 전자 시스템 점검",
        "조명 및 전기 시스템 점검",
        "소모품 교체 (Plan에 따라 상이)",
        "원격 모니터링 및 지원",
      ]
    : [
        "Operational inspection",
        "Mechanical & drive system test",
        "Electrical / electronic system test",
        "Lighting & power system test",
        "Parts replacement (as needed)",
        "Remote monitoring & support",
      ];

  return (
    <div className="space-y-20 md:space-y-28">
      {/* ── 탭 섹션 ── */}
      <section>
        {/* 탭 버튼 */}
        <div className="flex gap-8 border-b border-zinc-300 mb-12">
          {(["commission", "rental"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 text-base tracking-widest uppercase transition-colors -mb-px cursor-pointer ${
                tab === t
                  ? "border-b-2 border-zinc-900 text-zinc-900 font-medium"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {t === "commission"
                ? isKo
                  ? "작품 제작"
                  : "Commission"
                : isKo
                  ? "작품 렌탈"
                  : "Rental"}
            </button>
          ))}
        </div>

        {/* Commission */}
        {tab === "commission" && (
          <div>
            <div className="flex items-start gap-8 mb-12">
              <div className="text-zinc-400 shrink-0">
                <CompassToolIcon size={48} weight="thin" />
              </div>
              <div>
                <h2 className="text-base font-medium text-zinc-900 mb-2">
                  {isKo ? "작품 제작 (Commission)" : "Art Commission"}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4 break-keep">
                  {isKo
                    ? "공간 분석과 컨셉에 기반한 맞춤형 키네틱 아트 제작. 문의부터 설치, 유지관리까지 전 과정을 함께합니다."
                    : "Custom kinetic art creation tailored to your space and concept. We support the full process from inquiry to installation and maintenance."}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                  {commissionItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-xs text-zinc-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-10">
              <p className="text-xs tracking-widest uppercase text-zinc-400 mb-8">
                {isKo ? "진행 프로세스" : "Process"}
              </p>

              {/* 모바일: 수직 타임라인 */}
              <div className="md:hidden relative pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-200" />
                {steps.map((step) => (
                  <div key={step.num} className="relative mb-8 last:mb-0">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full border border-zinc-300 bg-white flex items-center justify-center">
                      <span className="text-[9px] text-zinc-400">
                        {step.num}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-zinc-900 mb-1 break-keep">
                      {step.title}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-2 break-keep">
                      {step.desc}
                    </p>
                    <p className="text-[10px] tracking-widest uppercase text-zinc-500 mb-0.5">
                      {isKo ? "산출물" : "Deliverable"}
                    </p>
                    <p className="text-xs text-zinc-600">{step.deliverable}</p>
                  </div>
                ))}
              </div>

              {/* 데스크탑: 2행 grid */}
              <div className="hidden md:block">
                <div className="grid grid-cols-7 gap-3 mb-6">
                  {steps.map((step) => (
                    <div key={step.num}>
                      <div className="w-7 h-7 rounded-full border border-zinc-300 flex items-center justify-center mb-3">
                        <span className="text-[10px] text-zinc-400">
                          {step.num}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-zinc-900 mb-1 leading-snug break-keep">
                        {step.title}
                      </p>
                      <p className="text-xs text-zinc-400 leading-relaxed break-keep">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-3 border-t border-zinc-200 pt-4">
                  {steps.map((step) => (
                    <div key={step.num}>
                      <p className="text-[10px] tracking-widest uppercase text-zinc-500 mb-1">
                        {isKo ? "산출물" : "Deliverable"}
                      </p>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {step.deliverable}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rental */}
        {tab === "rental" && (
          <div>
            <div className="flex items-start gap-8 mb-12">
              <div className="text-zinc-400 shrink-0">
                <HandshakeIcon size={48} weight="thin" />
              </div>
              <div>
                <h2 className="text-base font-medium text-zinc-900 mb-2">
                  {isKo ? "작품 렌탈 (Rental)" : "Art Rental"}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4 break-keep">
                  {isKo
                    ? "유연한 기간 동안 예술 경험을 제공하는 렌탈 서비스. 설치부터 회수, 운영 지원, 유지관리까지 포함됩니다."
                    : "Flexible art rental for a defined period. Includes installation, return, operational support, and maintenance."}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                  {rentalItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-xs text-zinc-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-10">
              <p className="text-xs tracking-widest uppercase text-zinc-400 mb-8">
                {isKo ? "진행 프로세스" : "Process"}
              </p>

              {/* 모바일: 수직 타임라인 */}
              <div className="md:hidden relative pl-8 mb-12">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-200" />
                {rentalSteps.map((step) => (
                  <div key={step.num} className="relative mb-8 last:mb-0">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full border border-zinc-300 bg-white flex items-center justify-center">
                      <span className="text-[9px] text-zinc-400">
                        {step.num}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-zinc-900 mb-1 break-keep">
                      {step.title}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed break-keep">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* 데스크탑: 2행 grid */}
              <div className="hidden md:block mb-12">
                <div className="grid grid-cols-6 gap-3">
                  {rentalSteps.map((step) => (
                    <div key={step.num}>
                      <div className="w-7 h-7 rounded-full border border-zinc-300 flex items-center justify-center mb-3">
                        <span className="text-[10px] text-zinc-400">
                          {step.num}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-zinc-900 mb-1 leading-snug break-keep">
                        {step.title}
                      </p>
                      <p className="text-xs text-zinc-400 leading-relaxed break-keep">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 렌탈 옵션 */}
              <div className="border-t border-zinc-200 pt-10">
                <p className="text-xs tracking-widest uppercase text-zinc-400 mb-6">
                  {isKo ? "렌탈 옵션" : "Rental Options"}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200">
                  {rentalOptions.map((opt) => (
                    <div key={opt.term} className="bg-white p-5">
                      <p className="text-xs font-medium text-zinc-900 mb-1">
                        {opt.term}
                      </p>
                      <p className="text-xs text-zinc-400 mb-0.5">
                        {opt.period}
                      </p>
                      <p className="text-xs text-zinc-400">{opt.use}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Maintenance (공통) ── */}
      <section>
        <div className="flex items-center gap-4 mb-10 pb-5 border-b border-zinc-300">
          <span className="text-base tracking-widest uppercase text-zinc-900 font-medium">
            {isKo ? "유지관리" : "Maintenance"}
          </span>
        </div>

        <div className="p-6 bg-zinc-50 border-l-2 border-zinc-900 mb-12">
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-3">
            {isKo ? "왜 유지관리가 중요한가?" : "Why Maintenance Is Essential"}
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed break-keep">
            {isKo
              ? "키네틱 아트는 전자·기계 구조로 결합된 작품입니다. 시간이 지남에 따라 마모, 정렬 오차, 환경 영향이 발생하며 정기적인 점검 없이는 안정적인 운영이 불가능합니다. 전문 유지관리를 통해 작품의 수명을 연장하고 항상 최상의 상태를 유지합니다."
              : "Kinetic art involves moving parts, electronics and environmental factors. Without regular maintenance, stable operation is not guaranteed. Professional care extends the lifespan of the work and ensures it always performs at its best."}
          </p>
        </div>

        {/* 플랜 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`p-8 border-t-2 ${
                i === 0
                  ? "border-zinc-300 bg-zinc-50"
                  : i === 1
                    ? "border-zinc-500 bg-zinc-100"
                    : "border-zinc-900 bg-zinc-900"
              }`}
            >
              <p className="text-xs tracking-widest uppercase text-zinc-400 mb-1">
                {plan.name}
              </p>
              <p
                className={`text-sm font-medium mb-2 ${i === 2 ? "text-white" : "text-zinc-900"}`}
              >
                {plan.visit}
              </p>
              <p
                className={`text-xs mb-8 ${i === 2 ? "text-zinc-400" : "text-zinc-500"}`}
              >
                {plan.support}
              </p>
              <div
                className={`border-t pt-6 ${i === 2 ? "border-zinc-700" : "border-zinc-100"}`}
              >
                <span
                  className={`text-2xl font-medium ${i === 2 ? "text-white" : "text-zinc-900"}`}
                >
                  {plan.rate}
                </span>
                <span className="text-xs text-zinc-400 ml-2">
                  {isKo ? "작품 금액 / 년" : "of artwork value / year"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 서비스 포함 항목 */}
        <div>
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-6">
            {isKo ? "서비스 포함 항목" : "Service Includes"}
          </p>
          <ul className="space-y-3 mb-10">
            {serviceIncludes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-zinc-600"
              >
                <span className="mt-2 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-zinc-500 leading-relaxed break-keep">
            {isKo
              ? "각 프로젝트의 비용은 설치 환경, 작품의 난이도, 규모에 따라 협의됩니다."
              : "Project budgets are determined based on installation conditions, complexity, and scale."}
          </p>
        </div>
      </section>

      {/* ── 핵심 메시지 ── */}
      <section className="border-t border-zinc-200 pt-20 text-center">
        <p className="text-lg md:text-2xl font-medium text-zinc-900 leading-tight mb-4 break-keep">
          {isKo
            ? "작품은 설치로 끝나지 않습니다."
            : "The artwork doesn't end with installation."}
        </p>
        <p className="text-base md:text-lg text-zinc-500 leading-relaxed break-keep mb-16">
          {isKo
            ? "Gallery Lili는 작품의 작동과 경험을 지속적으로 관리합니다."
            : "Gallery Lili manages the movement and experience of your artwork, continuously."}
        </p>
      </section>
    </div>
  );
}
