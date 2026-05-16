"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Flavor = {
  name: string;
  price: string;
  image: string;
  cardBg: string;
  textColor: string;
  accent: string;
  // Some donut PNGs sit inside a larger transparent canvas; scale up to
  // match the visual size of the others.
  imageScale?: number;
  // Defaults to true. A handful of speciality flavours contain egg.
  eggless?: boolean;
};

const FLAVORS: Flavor[] = [
  {
    name: "Glazed",
    price: "Rs. 55",
    image: "/menu/glazed55.png",
    cardBg: "#ffe9c4",
    textColor: "#3a1f17",
    accent: "#e3242b",
  },
  {
    name: "Oreo",
    price: "Rs. 165",
    image: "/menu/oreo165.png",
    cardBg: "#2a2a2a",
    textColor: "#fef6ec",
    accent: "#ffffff",
  },
  {
    name: "Custard",
    price: "Rs. 165",
    image: "/menu/custard165.png",
    cardBg: "#fde4b8",
    textColor: "#3a1f17",
    accent: "#a4612a",
  },
  {
    name: "Dark Chocolate",
    price: "Rs. 135",
    image: "/menu/Darkchocolate135.png",
    cardBg: "#3a1f17",
    textColor: "#fef6ec",
    accent: "#ffd166",
  },
  {
    name: "White Chocolate",
    price: "Rs. 135",
    image: "/menu/whitechocolate135.png",
    cardBg: "#fef6ec",
    textColor: "#3a1f17",
    accent: "#e3242b",
  },
  {
    name: "Strawberry",
    price: "Rs. 135",
    image: "/menu/Sreawberry135.png",
    cardBg: "#ffd2dd",
    textColor: "#3a1f17",
    accent: "#e3242b",
  },
  {
    name: "Mango",
    price: "Rs. 135",
    image: "/menu/Mango135.png",
    cardBg: "#ffd97a",
    textColor: "#3a1f17",
    accent: "#e3242b",
  },
  {
    name: "Blueberry",
    price: "Rs. 135",
    image: "/menu/blueberry135.png",
    cardBg: "#c8c5e8",
    textColor: "#3a1f17",
    accent: "#4a2b1f",
  },
  {
    name: "Dark Choco Chip",
    price: "Rs. 155",
    image: "/menu/Darkchocochip155.png",
    cardBg: "#e8d4c0",
    textColor: "#3a1f17",
    accent: "#3a1f17",
  },
  {
    name: "Mocha",
    price: "Rs. 175",
    image: "/menu/Mocha175.png",
    cardBg: "#4a2b1f",
    textColor: "#fef6ec",
    accent: "#ffd166",
  },
  {
    name: "Cinnamon",
    price: "Rs. 75",
    image: "/menu/Cinnamon75.png",
    cardBg: "#e8c89a",
    textColor: "#3a1f17",
    accent: "#7a4a32",
  },
  {
    name: "Chocolate Brownie",
    price: "Rs. 285",
    image: "/menu/chocolateBrownie285.png",
    cardBg: "#5a3526",
    textColor: "#fef6ec",
    accent: "#ffd166",
    eggless: false,
  },
  {
    name: "DD's Cream Cheese",
    price: "Rs. 285",
    image: "/menu/DDsCreamecheese285.png",
    cardBg: "#fff4dc",
    textColor: "#3a1f17",
    accent: "#e3242b",
    eggless: false,
  },
  {
    name: "Salted Caramel",
    price: "Rs. 255",
    image: "/menu/SaltedCaremal255.png",
    cardBg: "#d9a45b",
    textColor: "#3a1f17",
    accent: "#3a1f17",
  },
  {
    name: "Dora Cake",
    price: "Rs. 175",
    image: "/menu/DoraCake175.png",
    cardBg: "#f0e6d2",
    textColor: "#3a1f17",
    accent: "#7a4a32",
  },
  {
    name: "Tiramisu",
    price: "Rs. 285",
    image: "/menu/TiramisuDonut285.png",
    cardBg: "#7a4a32",
    textColor: "#fef6ec",
    accent: "#ffd166",
    eggless: false,
  },
  {
    name: "Kunafa",
    price: "Rs. 345",
    image: "/menu/kunafa345.png",
    cardBg: "#f3c98a",
    textColor: "#3a1f17",
    accent: "#7a2c0e",
  },
];

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
      // The reveal animations only run on >= md, since on mobile we hide the
      // heading entirely. Skip work to keep the carousel scroll smooth.
      if (!window.matchMedia("(min-width: 768px)").matches) return;

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
      // Touch/pen scrolling is handled natively by the browser — smoother
      // momentum + scroll-snap than JS drag. JS drag is mouse-only.
      if (e.pointerType !== "mouse") return;
      if (e.button !== 0) return;
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
      <div className="grid grid-cols-1 md:min-h-screen md:grid-cols-[42%_58%]">
        <div className="flex items-center px-6 pt-16 pb-6 md:sticky md:top-0 md:h-screen md:px-14 md:py-0 md:pb-10 md:pt-20 lg:px-20">
          <div className="max-w-xl">
            <span className="mb-5 inline-block rounded-full bg-[#3a1f17] px-4 py-1.5 font-sans text-xs uppercase tracking-[0.25em] text-cream md:mb-6">
              Our Donut
            </span>
            <h2
              ref={headingRef}
              className="hidden font-display uppercase leading-[0.95] tracking-tight text-[#3a1f17] md:block md:text-6xl lg:text-7xl xl:text-8xl"
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

            <div className="mt-7 flex items-center gap-3 md:mt-10">
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
          <div className="grid auto-cols-max grid-flow-col grid-rows-2 gap-4 px-6 pb-12 pt-2 md:flex md:gap-8 md:px-12 md:py-0 md:pr-32">
            {FLAVORS.map((flavor, i) => (
              <article
                key={flavor.name}
                data-flavor-card
                className="relative flex h-[42vh] max-h-[320px] min-h-[240px] w-[70vw] max-w-[280px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-[1.75rem] p-4 shadow-[0_20px_40px_-20px_rgba(58,31,23,0.4)] md:h-[70vh] md:max-h-[560px] md:min-h-[420px] md:w-[26vw] md:min-w-[320px] md:rounded-[2.25rem] md:p-7"
                style={{ backgroundColor: flavor.cardBg }}
              >
                <div
                  className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.25em]"
                  style={{ color: flavor.textColor }}
                >
                  <span>
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(FLAVORS.length).padStart(2, "0")}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[10px]"
                    style={{
                      backgroundColor: flavor.accent,
                      color: flavor.cardBg,
                    }}
                  >
                    {flavor.eggless === false ? "Contains Egg" : "Eggless"}
                  </span>
                </div>

                <div className="my-1 flex min-h-0 flex-1 items-center justify-center md:my-4">
                  <div
                    className="pointer-events-none relative aspect-square w-[70%] drop-shadow-[0_18px_30px_rgba(58,31,23,0.25)] md:w-[88%]"
                    style={
                      flavor.imageScale
                        ? { transform: `scale(${flavor.imageScale})` }
                        : undefined
                    }
                  >
                    <Image
                      src={flavor.image}
                      alt={`${flavor.name} ${flavor.eggless === false ? "" : "eggless "}donut from Donut Drool — fresh in Kathmandu and Lalitpur`}
                      fill
                      sizes="(max-width: 768px) 70vw, 26vw"
                      className="object-contain"
                      draggable={false}
                    />
                  </div>
                </div>

                <div>
                  <h3
                    className="font-display text-xl uppercase leading-none md:text-4xl"
                    style={{ color: flavor.textColor }}
                  >
                    {flavor.name}
                  </h3>
                  <div className="mt-2 md:mt-4">
                    <span
                      className="font-display text-lg md:text-2xl"
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
