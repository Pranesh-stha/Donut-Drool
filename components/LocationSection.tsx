"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Location = {
  num: string;
  name: string;
  address: string;
  hours: string;
  mapsUrl: string;
};

const LOCATIONS: Location[] = [
  {
    num: "01",
    name: "Jhamsikhel",
    address: "Pulchowk, Lalitpur",
    hours: "9:00 AM - 9:00 PM",
    mapsUrl: "https://maps.app.goo.gl/xovcC4Acc9qDgWRD8",
  },
  {
    num: "03",
    name: "Dhapasi",
    address: "Dhapasi, Kathmandu",
    hours: "9:00 AM - 9:00 PM",
    mapsUrl: "https://maps.app.goo.gl/qhNSTHFhhgtXmPRaA",
  },
  {
    num: "02",
    name: "Budhanilkantha",
    address: "Rudreshwor Chowk, Kathmandu",
    hours: "9:00 AM - 9:00 PM",
    mapsUrl: "https://maps.app.goo.gl/cSKFouxQULZqxyC66",
  },
];

function MapBackground() {
  return (
    <img
      src="/map2.png"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain opacity-90"
      draggable={false}
    />
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden="true">
      <path
        d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 20 12 20s12-11.6 12-20C24 5.4 18.6 0 12 0z"
        fill="#e3242b"
      />
      <circle cx="12" cy="12" r="4.5" fill="#fef6ec" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <circle
        cx="10"
        cy="10"
        r="8.5"
        fill="none"
        stroke="#e3242b"
        strokeWidth="1.6"
      />
      <path
        d="M10 5.5V10l3 2"
        stroke="#e3242b"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function MiniPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 20" className={className} aria-hidden="true">
      <path
        d="M8 0C3.6 0 0 3.6 0 8c0 5.6 8 12 8 12s8-6.4 8-12c0-4.4-3.6-8-8-8z"
        fill="#e3242b"
      />
      <circle cx="8" cy="8" r="3" fill="#fef6ec" />
    </svg>
  );
}

const MARKER_POS = [
  { left: "44%", top: "26%" },
  { left: "72%", top: "47%" },
  { left: "40%", top: "60%" },
];

type CardPos = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

const CARD_POS: CardPos[] = [
  { left: "63%", top: "10%" },
  { left: "81%", top: "53%" },
  { left: "8%", top: "70%" },
];

// On narrow viewports the desktop left:81% etc. push cards off-screen.
// Anchor right-side cards with `right:` and pull positions inward; the
// bottom card is anchored with `bottom:` so its content grows upward
// within the map bounds instead of being clipped by the section.
const CARD_POS_MOBILE: CardPos[] = [
  { right: "2%", top: "4%" },
  { right: "2%", top: "54%" },
  { left: "2%", bottom: "2%" },
];

const CONNECTOR_DOTS = [
  [
    [44, 26],
    [48, 22.5],
    [53, 19.5],
    [58, 16.5],
  ],
  [
    [72, 47],
    [75, 47.5],
    [78, 50],
  ],
  [
    [40, 60],
    [37, 63],
    [33, 66],
    [29, 69],
  ],
];

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const cardPositions = isMobile ? CARD_POS_MOBILE : CARD_POS;

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const markers = root.querySelectorAll<SVGElement>("[data-marker]");
      const connectorGroups =
        root.querySelectorAll<SVGGElement>("[data-connector]");
      const connectorDots = root.querySelectorAll<SVGCircleElement>(
        "[data-connector-dot]",
      );
      const routePaths = root.querySelectorAll<SVGPathElement>("[data-route]");
      const cards = root.querySelectorAll<HTMLElement>("[data-card]");

      // Below lg we render the map statically — no scroll animation. Just
      // force everything to its end state so it's visible on mount.
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        gsap.set(markers, { autoAlpha: 1, scale: 1 });
        gsap.set(connectorDots, { autoAlpha: 1, scale: 1 });
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(markers, {
        autoAlpha: 0,
        scale: 0.4,
        transformOrigin: "50% 100%",
      });
      gsap.set(connectorDots, {
        autoAlpha: 0,
        scale: 0.45,
        transformOrigin: "50% 50%",
      });
      gsap.set(cards, { autoAlpha: 0, y: 18 });

      routePaths.forEach((path) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          toggleActions: "play none none reset",
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(routePaths, {
        strokeDashoffset: 0,
        duration: 1.15,
        ease: "power2.inOut",
      });

      tl.to(
        markers,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.48,
          ease: "back.out(2)",
        },
        "+=0.05",
      );

      tl.addLabel("connectors", "+=0.08");
      connectorGroups.forEach((group) => {
        tl.to(
          group.querySelectorAll("[data-connector-dot]"),
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.18,
            stagger: 0.07,
            ease: "power2.out",
          },
          "connectors",
        );
      });

      tl.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
        },
        "connectors+=0.42",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FDF4ED]"
    >
      <div className="px-6 pt-14 pb-2 md:px-14 md:pt-20 md:pb-4 lg:hidden">
        <div className="mb-4 flex items-center gap-2">
          <MiniPinIcon className="h-4 w-4" />
          <span className="font-sans text-xs uppercase tracking-[0.32em] text-[#3a1f17]">
            Locations
          </span>
        </div>
        <p className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.28em] text-[#e3242b]">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5"
            fill="none"
          >
            <path
              d="M10 2.5v3M10 14.5v3M2.5 10h3M14.5 10h3M4.7 4.7l2.1 2.1M13.2 13.2l2.1 2.1M4.7 15.3l2.1-2.1M13.2 6.8l2.1-2.1"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="10" cy="10" r="2.4" fill="currentColor" />
          </svg>
          <span>Tap a pin or card to open in Google Maps</span>
        </p>
      </div>

      <div className="relative grid grid-cols-1 lg:min-h-screen lg:grid-cols-[65%_35%]">
        <div className="hidden items-center px-6 pt-16 pb-10 md:px-14 md:pt-20 md:pb-16 lg:order-2 lg:flex lg:px-16 lg:py-0 xl:px-20">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-2 md:mb-8">
              <MiniPinIcon className="h-4 w-4" />
              <span className="font-sans text-xs uppercase tracking-[0.32em] text-[#3a1f17]">
                Locations
              </span>
            </div>
            <h2 className="font-display text-4xl uppercase leading-[0.92] text-[#3a1f17] sm:text-5xl md:text-6xl xl:text-7xl">
              Sweet Stops
              <br />
              <span className="text-[#e3242b]">Around</span>
              <br />
              <span className="inline-flex flex-wrap items-baseline gap-x-3 md:gap-x-4">
                <span>The</span>
                <span className="relative inline-block -rotate-2 align-baseline">
                  <span className="relative z-10 inline-block font-display text-4xl uppercase leading-none text-[#ff8aa8] [text-shadow:3px_3px_0_#e3242b] sm:text-5xl md:text-6xl xl:text-7xl">
                    Valley
                  </span>
                  <span className="absolute -right-3 top-1 h-3 w-3 rounded-full bg-[#e3242b]" />
                  <span className="absolute -right-1 top-6 h-1.5 w-1.5 rounded-full bg-[#3a1f17]" />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 220 16"
                    preserveAspectRatio="none"
                    className="absolute -bottom-3 left-1 h-3 w-[94%]"
                  >
                    <path
                      d="M2 8 C 34 2, 60 14, 92 7 S 146 3, 178 8 S 204 13, 218 7"
                      stroke="#e3242b"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </span>
            </h2>
            <p className="mt-8 max-w-sm font-sans text-base leading-relaxed text-[#5a3526] md:mt-10">
              Three cozy locations serving fresh eggless donuts every day. Drop
              by for a warm box and a sweet little break.
            </p>
            <p className="mt-5 hidden items-center gap-2 font-sans text-xs uppercase tracking-[0.28em] text-[#e3242b] lg:inline-flex">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5"
                fill="none"
              >
                <path
                  d="M10 2.5v3M10 14.5v3M2.5 10h3M14.5 10h3M4.7 4.7l2.1 2.1M13.2 13.2l2.1 2.1M4.7 15.3l2.1-2.1M13.2 6.8l2.1-2.1"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="10" r="2.4" fill="currentColor" />
              </svg>
              <span>Tap a pin or location to open in Google Maps</span>
            </p>

          </div>
        </div>

        <div className="relative aspect-[1370/1148] w-full lg:order-1 lg:aspect-auto lg:h-screen">
          <div className="absolute inset-x-[4%] inset-y-[4%] lg:inset-x-[6%] lg:inset-y-[8%]">
            <MapBackground />

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                data-route
                d="M44,26 C 47,34 55,32 58,40 C 61,49 48,53 40,60 C 49,62 58,54 65,49 C 68,47 70,47 72,47"
                stroke="#2b160f"
                strokeWidth="4.6"
                vectorEffect="non-scaling-stroke"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                data-route
                d="M44,26 C 47,34 55,32 58,40 C 61,49 48,53 40,60 C 49,62 58,54 65,49 C 68,47 70,47 72,47"
                stroke="#5a2c1f"
                strokeWidth="2.4"
                vectorEffect="non-scaling-stroke"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {CONNECTOR_DOTS.map((dots, connectorIndex) => (
                <g key={`connector-${connectorIndex}`} data-connector>
                  {dots.map(([cx, cy], dotIndex) => (
                    <circle
                      key={`${connectorIndex}-${dotIndex}`}
                      data-connector-dot
                      cx={cx}
                      cy={cy}
                      r="0.34"
                      fill="#2b160f"
                    />
                  ))}
                </g>
              ))}
            </svg>

            {MARKER_POS.map((pos, i) => {
              const loc = LOCATIONS[i];
              const isActive = hoveredIdx === i;
              return (
                <a
                  key={`marker-${i}`}
                  data-marker
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${loc.name} on Google Maps`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(i)}
                  onBlur={() => setHoveredIdx(null)}
                  className="absolute z-10 cursor-pointer"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    transform: "translate(-50%, -100%)",
                    opacity: 0,
                  }}
                >
                  <PinIcon
                    className={`h-12 w-9 origin-bottom drop-shadow-[0_5px_5px_rgba(58,31,23,0.18)] transition-transform duration-300 ease-out ${
                      isActive ? "-translate-y-1 scale-125" : ""
                    }`}
                  />
                </a>
              );
            })}

            {cardPositions.map((pos, i) => {
              const loc = LOCATIONS[i];
              const mapsHref = loc.mapsUrl;
              const isActive = hoveredIdx === i;

              return (
                <a
                  key={`card-${loc.num}`}
                  data-card
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${loc.name} on Google Maps`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(i)}
                  onBlur={() => setHoveredIdx(null)}
                  className={`absolute z-30 block max-w-[160px] cursor-pointer transition-transform duration-300 ease-out lg:max-w-[255px] ${
                    isActive ? "-translate-y-1" : ""
                  }`}
                  style={{
                    left: pos.left,
                    right: pos.right,
                    top: pos.top,
                    bottom: pos.bottom,
                    opacity: 0,
                  }}
                >
                  <div className="flex items-baseline gap-2 leading-none lg:gap-3">
                    <span
                      className={`font-display text-3xl text-[#e3242b] origin-left transition-transform duration-300 ease-out lg:text-5xl ${
                        isActive ? "scale-110" : ""
                      }`}
                    >
                      {loc.num}
                    </span>
                    <span
                      className={`font-display text-xl uppercase transition-colors duration-300 lg:text-3xl ${
                        isActive ? "text-[#e3242b]" : "text-[#3a1f17]"
                      }`}
                    >
                      {loc.name}
                    </span>
                  </div>
                  <div
                    className={`mt-2 flex items-start gap-1.5 font-sans text-[11px] font-medium leading-tight transition-colors duration-300 lg:mt-4 lg:items-center lg:gap-2 lg:text-sm ${
                      isActive ? "text-[#e3242b]" : "text-[#3a1f17]"
                    }`}
                  >
                    <MiniPinIcon className="mt-0.5 h-3 w-3 flex-shrink-0 lg:mt-0 lg:h-4 lg:w-4" />
                    <span
                      className={`underline-offset-4 ${isActive ? "underline" : ""}`}
                    >
                      {loc.address}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 font-sans text-[11px] font-medium text-[#3a1f17] lg:mt-2 lg:gap-2 lg:text-sm">
                    <ClockIcon className="h-3 w-3 flex-shrink-0 lg:h-4 lg:w-4" />
                    <span>{loc.hours}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
