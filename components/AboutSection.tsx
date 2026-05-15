"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon({
  className,
  gradient,
}: {
  className?: string;
  gradient?: boolean;
}) {
  const stroke = gradient ? "url(#ig-grad)" : "currentColor";
  const dotFill = gradient ? "url(#ig-grad)" : "currentColor";
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      {gradient && (
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="25%" stopColor="#fa7e1e" />
            <stop offset="50%" stopColor="#d62976" />
            <stop offset="75%" stopColor="#962fbf" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
      )}
      <rect x="3" y="3" width="18" height="18" rx="5" stroke={stroke} />
      <circle cx="12" cy="12" r="4" stroke={stroke} />
      <circle cx="17.5" cy="6.5" r="1" fill={dotFill} stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12a10 10 0 1 0-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v6.9A10 10 0 0 0 22 12z" />
    </svg>
  );
}

const STATS = [
  { value: "2020", label: "Founded" },
  { value: "12+", label: "Flavors" },
  { value: "3", label: "Outlets" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const lines = heading.querySelectorAll<HTMLSpanElement>("[data-line]");

      const trigger = {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      } as const;

      if (lines.length) {
        gsap.fromTo(
          lines,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: trigger,
          }
        );
      }

      const paragraph =
        sectionRef.current?.querySelector<HTMLElement>("[data-paragraph]");
      if (paragraph) {
        gsap.fromTo(
          paragraph,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: trigger,
          }
        );
      }

      const stats =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-stat]") ?? [];
      if (stats.length) {
        gsap.fromTo(
          stats,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: stats[0],
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#fbe2d4]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#ff8aa8] opacity-20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-[#ffd166] opacity-25 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-10 hidden h-56 w-56 rotate-[18deg] md:block lg:-right-8 lg:-top-12 lg:h-72 lg:w-72"
      >
        <Image
          src="/donut1.svg"
          alt=""
          fill
          className="object-contain drop-shadow-[0_18px_30px_rgba(58,31,23,0.18)]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-12 hidden h-48 w-48 -rotate-[14deg] md:block lg:-bottom-20 lg:left-[-3rem] lg:h-64 lg:w-64"
      >
        <Image
          src="/donut2.svg"
          alt=""
          fill
          className="object-contain drop-shadow-[0_18px_30px_rgba(58,31,23,0.18)]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-8 py-24 md:px-14 md:py-28 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="relative flex flex-col">
            <span className="mb-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#3a1f17] px-5 py-2 font-sans text-xs uppercase tracking-[0.32em] text-cream">
              <SparkIcon className="h-3 w-3 text-[#ffd166]" />
              About Us
              <SparkIcon className="h-3 w-3 text-[#ffd166]" />
            </span>

            <h2
              ref={headingRef}
              className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-[#3a1f17] md:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              <span className="block overflow-hidden pb-1">
                <span data-line className="inline-block will-change-transform">
                  Made to Make
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  data-line
                  className="relative inline-flex items-end gap-4 text-[#e3242b] will-change-transform"
                >
                  <span>You Smile</span>
                  <span
                    aria-hidden="true"
                    className="relative inline-block h-10 w-16 shrink-0 md:h-12 md:w-20"
                  >
                    <Image
                      src="/smilyface.svg"
                      alt=""
                      fill
                      className="object-contain [filter:brightness(0)_saturate(100%)_invert(11%)_sepia(38%)_saturate(1800%)_hue-rotate(347deg)_brightness(94%)_contrast(94%)]"
                    />
                    <SparkIcon className="absolute -right-3 -top-3 h-4 w-4 text-[#e3242b]" />
                  </span>
                </span>
              </span>
            </h2>

            <div className="mt-10 flex items-center gap-5">
              <a
                href="https://www.instagram.com/donut_drool/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donut Drool on Instagram"
                className="group relative inline-block text-[#3a1f17] transition-transform hover:-translate-y-0.5"
              >
                <InstagramIcon className="h-7 w-7 transition-opacity group-hover:opacity-0" />
                <InstagramIcon
                  gradient
                  className="absolute inset-0 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </a>
              <a
                href="https://www.facebook.com/DonutDrool.Nepal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donut Drool on Facebook"
                className="text-[#3a1f17] transition-all hover:-translate-y-0.5 hover:text-[#1877F2]"
              >
                <FacebookIcon className="h-7 w-7" />
              </a>
              <span className="ml-1 inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#5a3526]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 24"
                  className="h-4 w-10 text-[#e3242b]"
                  fill="none"
                >
                  <path
                    d="M46 12H4m0 0l6-5m-6 5l6 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Follow Along
              </span>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  data-stat
                  className="flex flex-col items-start border-l-2 pl-4"
                  style={{ borderColor: i % 2 === 0 ? "#e3242b" : "#ffd166" }}
                >
                  <span className="font-display text-4xl leading-none text-[#3a1f17] md:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#5a3526]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-2">
              <span className="block h-1 w-10 rounded-full bg-[#e3242b]" />
              <span className="block h-1 w-3 rounded-full bg-[#ffd166]" />
              <span className="block h-1 w-6 rounded-full bg-[#ff8aa8]" />
              <span className="block h-1 w-2 rounded-full bg-[#3a1f17]" />
              <span className="block h-px flex-1 bg-[#3a1f17]/10" />
              <span className="block h-1 w-2 rounded-full bg-[#ffd166]" />
              <span className="block h-1 w-4 rounded-full bg-[#e3242b]" />
            </div>
          </div>

          <div className="relative flex flex-col lg:pt-12">
            <div className="relative" data-paragraph>
              <span
                aria-hidden="true"
                className="absolute -left-3 -top-8 font-display text-7xl leading-none text-[#e3242b]/30"
              >
                &ldquo;
              </span>
              <p className="relative font-display text-2xl uppercase leading-[1.15] tracking-tight text-[#3a1f17] md:text-3xl lg:text-[2rem]">
                Built on a simple belief — that
                <span className="text-[#e3242b]"> small moments of happiness</span>{" "}
                matter.
              </p>
              <p className="mt-6 font-sans text-base leading-relaxed text-[#5a3526]">
                Every donut is made fresh with care, using thoughtfully crafted
                recipes and quality ingredients. But beyond the products, what
                we truly hope to create is a feeling — a slower moment in a
                busy day, a shared smile, a little softness in everyday life.
              </p>
              <p className="mt-5 font-sans text-base leading-relaxed text-[#5a3526]">
                Proudly built in Nepal, Donut Drool exists to remind people to
                pause, enjoy the little things, and{" "}
                <span className="font-display uppercase tracking-wide text-[#e3242b]">
                  smile a little more
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
