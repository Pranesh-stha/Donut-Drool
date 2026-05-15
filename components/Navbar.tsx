"use client";

import { useEffect, useRef, useState } from "react";
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
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const links = linksRef.current?.querySelectorAll("li") ?? [];
      const targets = [logoRef.current, burgerRef.current, ...Array.from(links)];
      gsap.set(targets, { opacity: 0, y: -16 });

      if (!isFirstVisit && phase === "settled") {
        gsap.to(targets, {
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
        tl.to([logoRef.current, burgerRef.current], {
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

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const items = panel.querySelectorAll<HTMLLIElement>("li");

      if (open) {
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: -12 },
          { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          items,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.06,
            delay: 0.08,
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(panel, {
          autoAlpha: 0,
          y: -12,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [open] }
  );

  const close = () => setOpen(false);

  return (
    <nav
      ref={navRef}
      className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-4 md:px-12 md:py-6"
    >
      <div ref={logoRef} className="flex items-center">
        <Image
          src="/logo.png"
          alt="Donut Drool"
          width={2471}
          height={1312}
          priority
          className="h-9 w-auto md:h-12"
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

      <button
        ref={burgerRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto relative z-40 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-cream/80 text-donut-dark shadow-[0_8px_24px_-12px_rgba(58,31,23,0.35)] backdrop-blur-md md:hidden"
      >
        <span
          className={`block h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full bg-current transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      <div
        ref={panelRef}
        aria-hidden={!open}
        className="pointer-events-none fixed inset-0 z-20 flex flex-col items-center justify-center bg-cream/95 px-8 opacity-0 backdrop-blur-md md:hidden"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <ul className="flex flex-col items-center gap-7 text-center font-display text-4xl uppercase tracking-tight text-donut-dark">
          {LINKS.map((link) => {
            if (!link.target) {
              return (
                <li key={link.label} className="text-donut-dark/40">
                  {link.label}
                </li>
              );
            }
            return (
              <li key={link.label}>
                <a
                  href={`#${link.target}`}
                  onClick={close}
                  className="block px-2 py-1 transition-colors hover:text-donut-red"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-donut-dark/50">
          <span className="block h-1 w-6 rounded-full bg-donut-red" />
          <span>Eggless · Made Fresh Daily</span>
          <span className="block h-1 w-6 rounded-full bg-donut-red" />
        </div>
      </div>
    </nav>
  );
}
