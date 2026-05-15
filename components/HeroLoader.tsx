"use client";

import Image from "next/image";

export default function HeroLoader({ exiting }: { exiting: boolean }) {
  return (
    <div
      aria-hidden={exiting}
      className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-cream transition-opacity duration-500 ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="loader-donut-spin relative h-24 w-24 md:h-32 md:w-32">
        <Image
          src="/donut1.svg"
          alt=""
          fill
          priority
          className="object-contain drop-shadow-[0_12px_24px_rgba(58,31,23,0.18)]"
        />
      </div>
      <p className="mt-7 font-display text-base uppercase tracking-[0.3em] text-donut-red md:text-lg">
        Whipping up donuts
        <span className="ml-1 inline-flex">
          <span className="[animation:loader-dot_1.2s_ease-in-out_infinite]">.</span>
          <span className="[animation:loader-dot_1.2s_ease-in-out_0.2s_infinite]">.</span>
          <span className="[animation:loader-dot_1.2s_ease-in-out_0.4s_infinite]">.</span>
        </span>
      </p>
    </div>
  );
}
