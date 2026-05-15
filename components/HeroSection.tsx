"use client";

import dynamic from "next/dynamic";

const DonutCanvas = dynamic(() => import("./DonutCanvas"), { ssr: false });

export type Phase = "idle" | "intro" | "blast" | "settled";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full">
      <div className="absolute inset-0 z-0">
        <DonutCanvas />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 flex translate-y-6 flex-col items-center justify-center px-6 text-center md:translate-y-10">
        <div className="relative">
          <span
            aria-hidden="true"
            className="hero-sparkle hero-sparkle-left absolute -left-5 top-1 text-xl text-donut-red md:-left-8 md:top-2 md:text-3xl"
          >
            ✦
          </span>
          <span
            aria-hidden="true"
            className="hero-sparkle hero-sparkle-right absolute -right-5 top-1 text-xl text-donut-red md:-right-8 md:top-2 md:text-3xl"
          >
            ✦
          </span>
          <h1 className="hero-headline font-display text-5xl uppercase leading-[0.9] tracking-tight text-donut-red md:text-7xl lg:text-[6rem]">
            Freaking Delicious
          </h1>
        </div>
        <div className="hero-smile-banner mt-4 inline-block rounded-sm bg-donut-red px-6 py-2 font-display text-3xl uppercase leading-none tracking-wide text-white shadow-xl shadow-donut-red/25 md:mt-5 md:px-8 md:py-3 md:text-5xl lg:text-[3.75rem]">
          Every Bite Is A Treat
        </div>
        <p className="hero-support-copy mt-8 max-w-xl text-base font-medium leading-7 text-donut-dark/80 md:mt-10 md:text-lg md:leading-8">
          We will make you smile a little more with our eggless donuts. The best
          Nepali donuts you&apos;ll try. <span aria-hidden="true">😍</span>
        </p>
        <a
          href="#menu"
          className="hero-menu-button pointer-events-auto mt-7 inline-flex items-center gap-2.5 rounded-full bg-donut-red px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl shadow-donut-red/30 transition-transform hover:scale-105 md:mt-9 md:px-11 md:py-4 md:text-base"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2.5A5.5 5.5 0 0 0 4.5 8c0 4.1 5.5 9.5 5.5 9.5S15.5 12.1 15.5 8A5.5 5.5 0 0 0 10 2.5Zm0 7.6A2.1 2.1 0 1 1 10 5.9a2.1 2.1 0 0 1 0 4.2Z" />
          </svg>
          Grab A Donut
        </a>
      </div>
    </section>
  );
}
