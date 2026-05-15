"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Flavor = {
  name: string;
  price: string;
  cardBg: string;
  ringBg: string;
  ringHole: string;
  glaze: string;
  sprinkles: string[];
  textColor: string;
  accent: string;
};

const FLAVORS: Flavor[] = [
  {
    name: "Classic Glaze",
    price: "Rs. 120",
    cardBg: "#ffe9c4",
    ringBg: "#d9a566",
    ringHole: "#ffe9c4",
    glaze: "#fff4dc",
    sprinkles: ["#e3242b", "#3a1f17", "#ff8aa8", "#5a3526"],
    textColor: "#3a1f17",
    accent: "#e3242b",
  },
  {
    name: "Choco Drizzle",
    price: "Rs. 150",
    cardBg: "#3a1f17",
    ringBg: "#7a4a32",
    ringHole: "#3a1f17",
    glaze: "#2a140e",
    sprinkles: ["#fde4b8", "#ff8aa8", "#ffd166", "#ffffff"],
    textColor: "#fef6ec",
    accent: "#ffd166",
  },
  {
    name: "Strawberry Cream",
    price: "Rs. 140",
    cardBg: "#ffd2dd",
    ringBg: "#c98a72",
    ringHole: "#ffd2dd",
    glaze: "#ff7aa1",
    sprinkles: ["#ffffff", "#3a1f17", "#ffd166", "#e3242b"],
    textColor: "#3a1f17",
    accent: "#e3242b",
  },
  {
    name: "Matcha Swirl",
    price: "Rs. 160",
    cardBg: "#dfeccd",
    ringBg: "#c69a6b",
    ringHole: "#dfeccd",
    glaze: "#9bc17a",
    sprinkles: ["#3a1f17", "#ffffff", "#e3242b", "#ffd166"],
    textColor: "#2e3d22",
    accent: "#3a1f17",
  },
  {
    name: "Caramel Crunch",
    price: "Rs. 155",
    cardBg: "#f3c98a",
    ringBg: "#a4612a",
    ringHole: "#f3c98a",
    glaze: "#d68945",
    sprinkles: ["#3a1f17", "#fef6ec", "#7a4a32", "#ff8aa8"],
    textColor: "#3a1f17",
    accent: "#7a2c0e",
  },
  {
    name: "Blueberry Burst",
    price: "Rs. 145",
    cardBg: "#cdd7f0",
    ringBg: "#c69a6b",
    ringHole: "#cdd7f0",
    glaze: "#7a8fd1",
    sprinkles: ["#ffffff", "#3a1f17", "#ffd166", "#e3242b"],
    textColor: "#1f2a4d",
    accent: "#3a1f17",
  },
  {
    name: "Sprinkle Party",
    price: "Rs. 165",
    cardBg: "#fef6ec",
    ringBg: "#d9a566",
    ringHole: "#fef6ec",
    glaze: "#ffffff",
    sprinkles: ["#e3242b", "#3a1f17", "#ff8aa8", "#ffd166", "#7a8fd1", "#9bc17a"],
    textColor: "#3a1f17",
    accent: "#e3242b",
  },
];

function DonutVisual({ flavor }: { flavor: Flavor }) {
  const sprinkleSeed = [
    { x: 28, y: 18, rot: -22 },
    { x: 60, y: 12, rot: 14 },
    { x: 82, y: 34, rot: 48 },
    { x: 86, y: 64, rot: -10 },
    { x: 64, y: 86, rot: 32 },
    { x: 30, y: 84, rot: -38 },
    { x: 12, y: 60, rot: 22 },
    { x: 16, y: 32, rot: 6 },
    { x: 46, y: 22, rot: -14 },
    { x: 72, y: 50, rot: 60 },
    { x: 26, y: 56, rot: -42 },
    { x: 54, y: 78, rot: 18 },
  ];

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full drop-shadow-[0_18px_30px_rgba(58,31,23,0.25)]"
    >
      <defs>
        <radialGradient id={`dough-${flavor.name}`} cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor={flavor.ringBg} stopOpacity="1" />
          <stop offset="100%" stopColor={flavor.ringBg} stopOpacity="0.78" />
        </radialGradient>
        <radialGradient id={`glaze-${flavor.name}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={flavor.glaze} stopOpacity="1" />
          <stop offset="100%" stopColor={flavor.glaze} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="86" fill={`url(#dough-${flavor.name})`} />
      <path
        d="M100,18 a82,82 0 0 1 0,164 a82,82 0 0 1 0,-164 z M100,40 a60,60 0 0 0 0,120 a60,60 0 0 0 0,-120 z"
        fill={`url(#glaze-${flavor.name})`}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <path
        d="M30,72 q14,-22 38,-12 q22,8 44,-6 q22,-14 46,-2 q14,8 22,4"
        fill="none"
        stroke={flavor.glaze}
        strokeOpacity="0.55"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="30" fill={flavor.ringHole} />
      {sprinkleSeed.map((s, i) => (
        <rect
          key={i}
          x={s.x * 2 - 4}
          y={s.y * 2 - 1.4}
          width="8"
          height="2.8"
          rx="1.4"
          fill={flavor.sprinkles[i % flavor.sprinkles.length]}
          transform={`rotate(${s.rot} ${s.x * 2} ${s.y * 2})`}
        />
      ))}
    </svg>
  );
}

export default function FlavorShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const verticalWords = heading.querySelectorAll<HTMLSpanElement>(
        "[data-reveal-y]"
      );
      const slideWord = heading.querySelector<HTMLSpanElement>(
        "[data-reveal-x]"
      );
      const slideHighlight = heading.querySelector<HTMLSpanElement>(
        "[data-reveal-x-bg]"
      );

      const trigger = {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      } as const;

      if (verticalWords.length) {
        gsap.fromTo(
          verticalWords,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.18,
            scrollTrigger: trigger,
          }
        );
      }

      if (slideWord) {
        gsap.fromTo(
          slideWord,
          { xPercent: -120, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: trigger,
          }
        );
      }

      if (slideHighlight) {
        gsap.fromTo(
          slideHighlight,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.35,
            scrollTrigger: trigger,
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-flavor-card]");
    const step = card ? card.offsetWidth + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add("cursor-grabbing");
      el.classList.remove("cursor-grab");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };

    const endDrag = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
      el.classList.remove("cursor-grabbing");
      el.classList.add("cursor-grab");
    };

    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <section id="menu" ref={sectionRef} className="relative w-full overflow-hidden bg-white">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[42%_58%]">
        <div className="flex items-center px-8 pt-20 pb-10 md:sticky md:top-0 md:h-screen md:px-14 md:py-0 lg:px-20">
          <div className="max-w-xl">
            <span className="mb-6 inline-block rounded-full bg-[#3a1f17] px-4 py-1.5 font-sans text-xs uppercase tracking-[0.25em] text-cream">
              Our Donut
            </span>
            <h2
              ref={headingRef}
              className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-[#3a1f17] md:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span className="block overflow-hidden pb-2">
                <span data-reveal-y className="inline-block will-change-transform">
                  We Have
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span
                  data-reveal-x
                  className="relative inline-block will-change-transform"
                >
                  <span className="relative z-10 px-2 text-cream">Amazing</span>
                  <span
                    data-reveal-x-bg
                    aria-hidden="true"
                    className="absolute inset-x-0 inset-y-[8%] -z-0 -rotate-2 rounded-md bg-[#e3242b] will-change-transform"
                  />
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-reveal-y className="inline-block will-change-transform">
                  Donut
                </span>
              </span>
            </h2>

            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous flavour"
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#3a1f17] bg-white text-[#3a1f17] transition-all hover:bg-[#3a1f17] hover:text-cream disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#3a1f17]"
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path
                    d="M17 7H1m0 0l6-6M1 7l6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollRight}
                aria-label="Next flavour"
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#3a1f17] bg-[#3a1f17] text-cream transition-all hover:bg-[#e3242b] hover:border-[#e3242b] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-[#3a1f17] disabled:hover:border-[#3a1f17]"
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path
                    d="M1 7h16m0 0l-6-6m6 6l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="ml-3 font-sans text-xs uppercase tracking-[0.3em] text-[#5a3526]">
                Drag · Arrows
              </span>
            </div>
          </div>
        </div>

        <div
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label="Donut flavours"
          onKeyDown={onKeyDown}
          className="flavor-rail relative flex cursor-grab items-center overflow-x-auto overflow-y-hidden focus:outline-none md:h-screen"
        >
          <div className="flex gap-6 px-6 py-16 md:gap-8 md:px-12 md:py-0 md:pr-32">
            {FLAVORS.map((flavor, i) => (
              <article
                key={flavor.name}
                data-flavor-card
                className="relative flex h-[70vh] max-h-[560px] min-h-[420px] w-[78vw] max-w-[360px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-[2.25rem] p-7 shadow-[0_20px_40px_-20px_rgba(58,31,23,0.4)] md:w-[26vw] md:min-w-[320px]"
                style={{ backgroundColor: flavor.cardBg }}
              >
                <div
                  className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.25em]"
                  style={{ color: flavor.textColor }}
                >
                  <span>
                    0{i + 1} / 0{FLAVORS.length}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[10px]"
                    style={{
                      backgroundColor: flavor.accent,
                      color: flavor.cardBg,
                    }}
                  >
                    Eggless
                  </span>
                </div>

                <div className="my-4 flex flex-1 items-center justify-center">
                  <div className="pointer-events-none aspect-square w-[78%]">
                    <DonutVisual flavor={flavor} />
                  </div>
                </div>

                <div>
                  <h3
                    className="font-display text-3xl uppercase leading-none md:text-4xl"
                    style={{ color: flavor.textColor }}
                  >
                    {flavor.name}
                  </h3>
                  <div className="mt-4">
                    <span
                      className="font-display text-2xl"
                      style={{ color: flavor.textColor }}
                    >
                      {flavor.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
