"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COPY =
  "Hand-rolled in small batches, our eggless donuts are pillowy, golden, and glazed with love — every bite a warm Nepali hug dusted in sprinkles of pure delight.";

export default function ScrollRevealText() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (!words.length) return;

      gsap.to(words, {
        color: "#fef6ec",
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
    },
    { scope: sectionRef }
  );

  const words = COPY.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center bg-[#3a1f17] px-6 pb-56 pt-40 md:pb-72 md:pt-56"
    >
      <p className="max-w-5xl text-center font-display text-3xl uppercase leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            ref={(el) => {
              wordsRef.current[i] = el;
            }}
            className="mr-3 inline-block text-[#5a3526]"
          >
            {word}
          </span>
        ))}
      </p>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-0 hidden h-32 w-full md:block md:h-48"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L1440,0 L1440,32 C1370,32 1300,42 1220,42 C1140,42 1070,30 990,30 C910,30 850,44 770,44 C690,44 620,30 540,30 C460,30 400,42 320,42 C240,42 180,30 100,30 C60,30 30,32 0,32 Z"
          fill="#fef6ec"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-0 block h-28 w-full md:hidden"
        viewBox="0 0 480 140"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L480,0 L480,30 C420,30 380,40 320,40 C260,40 220,28 160,28 C110,28 60,36 0,34 Z"
          fill="#fef6ec"
        />
      </svg>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px left-0 hidden h-32 w-full md:block md:h-48"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,28 C25,28 50,42 65,55 C75,66 92,66 102,55 C118,40 145,30 175,32 C210,34 230,90 240,160 C246,188 262,196 272,196 C282,196 298,188 304,160 C314,90 335,32 375,30 C415,30 445,46 465,60 C480,70 498,70 514,60 C530,46 560,30 595,30 C635,32 660,95 670,170 C677,192 692,198 702,198 C712,198 727,192 734,170 C744,95 770,32 810,30 C850,30 880,48 900,62 C918,72 938,72 956,62 C975,48 1005,30 1040,32 C1080,34 1105,85 1115,150 C1122,180 1138,190 1148,190 C1158,190 1174,180 1180,150 C1190,85 1215,34 1255,30 C1295,28 1322,42 1338,55 C1352,66 1370,66 1384,55 C1400,42 1422,30 1440,30 L1440,200 L0,200 Z"
          fill="#ffffff"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px left-0 block h-28 w-full md:hidden"
        viewBox="0 0 480 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 C18,30 36,42 48,54 C58,64 74,64 84,54 C96,42 114,30 138,32 C162,34 178,82 188,138 C194,156 206,156 212,138 C222,82 238,30 262,32 C286,34 300,80 310,134 C316,152 328,152 334,134 C344,80 360,30 386,32 C408,34 426,44 438,56 C448,66 462,66 472,56 C476,52 480,48 480,48 L480,160 L0,160 Z"
          fill="#ffffff"
        />
      </svg>
    </section>
  );
}
