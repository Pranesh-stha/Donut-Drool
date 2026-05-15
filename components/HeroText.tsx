"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Phase } from "./HeroSection";

export default function HeroText({
  phase,
  isFirstVisit,
}: {
  phase: Phase;
  isFirstVisit: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.set(
        [
          tagRef.current,
          titleLine1Ref.current,
          titleLine2Ref.current,
          subRef.current,
          ctaRef.current,
        ],
        { opacity: 0, y: 40, scale: 0.85 }
      );

      if (!isFirstVisit && phase === "settled") {
        gsap.to(
          [
            tagRef.current,
            titleLine1Ref.current,
            titleLine2Ref.current,
            subRef.current,
            ctaRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
        return;
      }

      if (phase === "blast" || phase === "settled") {
        const tl = gsap.timeline();
        tl.to(tagRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
        })
          .to(
            titleLine1Ref.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "back.out(1.4)",
            },
            "-=0.3"
          )
          .to(
            titleLine2Ref.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "back.out(1.4)",
            },
            "-=0.7"
          )
          .to(
            subRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(
            ctaRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.6)",
            },
            "-=0.3"
          );
      }
    },
    { dependencies: [phase, isFirstVisit] }
  );

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
    >
      <span
        ref={tagRef}
        className="mb-5 rounded-full bg-donut-red/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-donut-red"
      >
        Eggless · Freshly Baked
      </span>

      <h1
        ref={titleRef}
        className="font-display leading-[0.82] text-donut-dark"
      >
        <span
          ref={titleLine1Ref}
          className="block text-7xl md:text-9xl lg:text-[10rem]"
        >
          Freaking
        </span>
        <span
          ref={titleLine2Ref}
          className="block text-7xl text-donut-red md:text-9xl lg:text-[10rem]"
        >
          Delicious
        </span>
      </h1>

      <p
        ref={subRef}
        className="mt-7 max-w-md text-sm leading-relaxed text-donut-dark/70 md:text-base"
      >
        We will make you smile a little more with our eggless donuts.
      </p>

      <button
        ref={ctaRef}
        className="pointer-events-auto mt-7 rounded-full bg-donut-red px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-donut-red/30 transition-transform hover:scale-105"
      >
        Drool a Donut
      </button>
    </div>
  );
}
