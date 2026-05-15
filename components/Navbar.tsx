"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Phase } from "./HeroSection";

type NavLink = { label: string; target: string | null };

const LINKS: NavLink[] = [
  { label: "Home", target: "home" },
  { label: "Menu", target: "menu" },
  { label: "Locations", target: "locations" },
  { label: "About", target: "about" },
];

export default function Navbar({
  phase,
  isFirstVisit,
}: {
  phase: Phase;
  isFirstVisit: boolean;
}) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const links = linksRef.current?.querySelectorAll("li") ?? [];
      gsap.set([logoRef.current, ...Array.from(links)], {
        opacity: 0,
        y: -16,
      });

      if (!isFirstVisit && phase === "settled") {
        gsap.to([logoRef.current, ...Array.from(links)], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        });
        return;
      }

      if (phase === "settled") {
        const tl = gsap.timeline();
        tl.to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }).to(
          Array.from(links),
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    },
    { dependencies: [phase, isFirstVisit] }
  );

  return (
    <nav
      ref={navRef}
      className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-12 md:py-6"
    >
      <div ref={logoRef} className="flex items-center">
        <Image
          src="/logo.png"
          alt="Donut Drool"
          width={2471}
          height={1312}
          priority
          className="h-10 w-auto md:h-12"
        />
      </div>

      <ul
        ref={linksRef}
        className="hidden items-center gap-8 rounded-full bg-cream/70 px-6 py-3 text-sm font-medium uppercase tracking-widest text-donut-dark shadow-[0_8px_24px_-12px_rgba(58,31,23,0.25)] backdrop-blur-md md:flex"
      >
        {LINKS.map((link) => {
          if (!link.target) {
            return (
              <li
                key={link.label}
                className="cursor-default text-donut-dark/40"
              >
                {link.label}
              </li>
            );
          }
          return (
            <li key={link.label}>
              <a
                href={`#${link.target}`}
                className="cursor-pointer transition-colors hover:text-donut-red"
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
