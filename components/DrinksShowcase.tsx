"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DRINKS_COLD,
  DRINKS_HOT,
  type DrinkCategory,
} from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

type Drink = {
  name: string;
  price: string;
  image: string;
  description: string;
  category: DrinkCategory;
};

type Filter = "all" | DrinkCategory;

const ALL_DRINKS: readonly Drink[] = [...DRINKS_COLD, ...DRINKS_HOT];

// Visual identity per category. The cards bleed these colours into the page —
// no framed board, just coloured "pools" of drinks on the cream background.
const CATEGORY_META: Record<
  DrinkCategory,
  {
    label: string;
    subtitle: string;
    bg: string;
    title: string;
    accent: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  smoothie: {
    label: "Smoothies",
    subtitle: "Fruity, refreshing & full of flavor",
    bg: "#fff1c8",
    title: "#e3242b",
    accent: "#e3242b",
    iconBg: "#fde4b8",
    iconColor: "#e3242b",
  },
  iced: {
    label: "Iced Drinks",
    subtitle: "Chill, sip & refresh",
    bg: "#dceffd",
    title: "#2563eb",
    accent: "#2563eb",
    iconBg: "#bfdcfb",
    iconColor: "#1d4ed8",
  },
  shake: {
    label: "Shakes",
    subtitle: "Thick, creamy & indulgent",
    bg: "#fde1d0",
    title: "#e3242b",
    accent: "#e3242b",
    iconBg: "#fbcdb3",
    iconColor: "#b91c1c",
  },
  hot: {
    label: "Hot Drinks",
    subtitle: "Warm, cozy & comforting",
    bg: "#d8ead4",
    title: "#16803d",
    accent: "#16803d",
    iconBg: "#bcdcb4",
    iconColor: "#15803d",
  },
};

const CATEGORY_ORDER: DrinkCategory[] = ["smoothie", "iced", "shake", "hot"];

function SmoothieIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M6 8h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path d="M5 6h14l-1 2H6L5 6z" fill="currentColor" />
      <circle cx="10" cy="13" r="0.9" fill="currentColor" />
      <circle cx="14" cy="16" r="0.9" fill="currentColor" />
      <path d="M12 1v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IcedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M7 7h10l-1 14a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <rect x="9.4" y="10.5" width="2.6" height="2.6" rx="0.3" fill="currentColor" />
      <rect x="12.5" y="13.5" width="2.4" height="2.4" rx="0.3" fill="currentColor" />
      <path d="M6 5h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M8 9h8l-1 13a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2L8 9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M7 9c0-3 2-5 5-5s5 2 5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <circle cx="9.5" cy="5.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="5" r="1" fill="currentColor" />
    </svg>
  );
}

function HotDrinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M5 10h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M17 12h2a2 2 0 0 1 0 4h-2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 3c0 1 1 1.5 1 2.5S9 6.5 9 7.5M13 3c0 1 1 1.5 1 2.5s-1 1-1 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS: Record<DrinkCategory, (props: { className?: string }) => JSX.Element> = {
  smoothie: SmoothieIcon,
  iced: IcedIcon,
  shake: ShakeIcon,
  hot: HotDrinkIcon,
};

function SparkleLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M8 16c4-1 6-3 7-7 1 4 3 6 7 7-4 1-6 3-7 7-1-4-3-6-7-7z"
        fill="#e3242b"
      />
    </svg>
  );
}

function FilterPill({
  active,
  filter,
  onClick,
  label,
  count,
  category,
}: {
  active: boolean;
  filter: Filter;
  onClick: (f: Filter) => void;
  label: string;
  count: number;
  category?: DrinkCategory;
}) {
  const meta = category ? CATEGORY_META[category] : null;
  const Icon = category ? ICONS[category] : null;
  return (
    <button
      type="button"
      onClick={() => onClick(filter)}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 font-sans text-xs font-medium transition-all md:px-5 md:py-2.5 md:text-sm ${
        active
          ? "border-[#e3242b] bg-[#e3242b] text-white shadow-md shadow-[#e3242b]/30"
          : "border-[#3a1f17]/15 bg-white text-[#3a1f17] hover:border-[#3a1f17]/40"
      }`}
    >
      {Icon && meta ? (
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full"
          style={{
            backgroundColor: active ? "rgba(255,255,255,0.18)" : meta.iconBg,
            color: active ? "#ffffff" : meta.iconColor,
          }}
        >
          <Icon className="h-3 w-3" />
        </span>
      ) : null}
      <span>{label}</span>
      <span
        className={`ml-0.5 rounded-full px-1.5 text-[10px] ${
          active ? "bg-white/20 text-white" : "bg-[#3a1f17]/10 text-[#3a1f17]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

// Per-drink scale tweaks — each PNG has different transparent padding,
// so a uniform scale makes some drinks look small and others oversized.
// These overrides keep the rendered drink size visually consistent.
function drinkImageScaleClass(name: string) {
  switch (name) {
    case "Iced Hibiscus Tea":
      return "scale-[1.6] group-hover:scale-[1.75]";
    case "The Cosmic Drink":
      return "scale-[1.36] group-hover:scale-[1.5]";
    case "Strawberry Mocha":
      return "scale-[1.2] group-hover:scale-[1.34]";
    case "Matcha Latte":
      return "scale-[1.5] group-hover:scale-[1.65]";
    default:
      return "scale-[1.4] group-hover:scale-[1.55]";
  }
}

function DrinkCard({ drink }: { drink: Drink }) {
  const meta = CATEGORY_META[drink.category];
  return (
    <article className="drink-card group flex h-full flex-col items-center p-1.5 text-center transition-all duration-300 hover:-translate-y-1 md:p-2">
      {/* aspect-[3/4] gives the drink even more vertical room. Per-drink
          scale (see drinkImageScaleClass) compensates for the differing
          transparent padding inside each PNG. */}
      <div className="drink-card-art relative aspect-[3/4] w-full">
        <Image
          src={encodeURI(drink.image)}
          alt={`${drink.name} drink from Donut Drool — Kathmandu and Lalitpur`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 18vw"
          className={`object-contain transition-transform duration-500 ${drinkImageScaleClass(drink.name)}`}
          draggable={false}
        />
      </div>
      {/* min-h reserves two lines of name height so 1-line and 2-line names
          produce cards of identical total height in the same grid row. */}
      <h3 className="mt-1 flex min-h-[2.6em] items-center justify-center px-1 font-sans text-[11px] font-bold leading-tight text-[#3a1f17] md:mt-1.5 md:text-xs lg:text-sm">
        {drink.name}
      </h3>
      <p
        className="mt-auto pt-1 font-display text-sm leading-none tracking-tight md:text-base"
        style={{ color: meta.accent }}
      >
        Rs. {drink.price}
      </p>
    </article>
  );
}

function CategorySection({
  category,
  drinks,
  fullWidth,
}: {
  category: DrinkCategory;
  drinks: Drink[];
  fullWidth: boolean;
}) {
  const meta = CATEGORY_META[category];
  const Icon = ICONS[category];

  return (
    <section
      className="relative overflow-hidden rounded-3xl p-3 md:rounded-[2rem] md:p-5"
      style={{ backgroundColor: meta.bg }}
    >
      <header className="mb-5 flex items-baseline gap-3 md:mb-6">
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl md:h-10 md:w-10"
          style={{ backgroundColor: meta.iconBg, color: meta.iconColor }}
        >
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </span>
        <h3
          className="font-display text-2xl uppercase tracking-tight md:text-3xl"
          style={{ color: meta.title }}
        >
          {meta.label}
        </h3>
        <span className="hidden font-sans text-xs text-[#5a3526]/80 md:inline">
          {meta.subtitle}
        </span>
      </header>

      <div
        className={`grid gap-3 md:gap-4 ${
          fullWidth
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : drinks.length === 3
              ? "grid-cols-2 md:grid-cols-3"
              : "grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {drinks.map((drink) => (
          <DrinkCard key={drink.name} drink={drink} />
        ))}
      </div>
    </section>
  );
}

export default function DrinksShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const groupedDrinks = useMemo(() => {
    const groups: Record<DrinkCategory, Drink[]> = {
      smoothie: [],
      iced: [],
      shake: [],
      hot: [],
    };
    for (const d of ALL_DRINKS) groups[d.category].push(d as Drink);
    return groups;
  }, []);

  const visibleCategories = useMemo(
    () =>
      filter === "all"
        ? CATEGORY_ORDER
        : ([filter] as DrinkCategory[]),
    [filter],
  );

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;
      if (!window.matchMedia("(min-width: 768px)").matches) return;

      const lines = heading.querySelectorAll<HTMLSpanElement>("[data-drink-line]");
      gsap.fromTo(
        lines,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const showFullWidth = filter !== "all";

  return (
    <section
      id="drinks"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-cream"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-12 h-64 w-64 rounded-full bg-[#ffd166] opacity-40 blur-3xl md:-left-24 md:h-96 md:w-96"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-[#9dd5fb] opacity-40 blur-3xl md:-right-20 md:h-80 md:w-80"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 bottom-24 h-48 w-48 rounded-full bg-[#ffd166] opacity-30 blur-3xl md:h-72 md:w-72"
      />

      <div className="relative mx-auto max-w-[1600px] px-2 pb-20 pt-14 md:px-4 md:pb-24 md:pt-16 lg:px-6">
        <div className="relative mb-6 flex flex-col items-center text-center md:mb-8">
          <span
            aria-hidden="true"
            className="absolute -left-1 top-2 hidden h-6 w-6 md:left-[18%] md:block lg:left-[24%]"
          >
            <SparkleLeft className="h-full w-full" />
          </span>
          <span
            aria-hidden="true"
            className="absolute -right-1 top-2 hidden h-6 w-6 md:right-[18%] md:block lg:right-[24%]"
          >
            <SparkleLeft className="h-full w-full" />
          </span>

          <h2
            ref={headingRef}
            className="font-display uppercase leading-[0.95] tracking-tight text-5xl text-[#e3242b] md:text-6xl lg:text-7xl"
          >
            <span className="inline-block overflow-hidden align-bottom">
              <span data-drink-line className="inline-block will-change-transform">
                Drinks
              </span>
            </span>{" "}
            <span className="inline-block overflow-hidden align-bottom">
              <span data-drink-line className="inline-block will-change-transform">
                Menu
              </span>
            </span>
          </h2>
          <p className="mt-3 max-w-xl font-sans text-sm text-[#5a3526] md:text-base">
            Sips of joy in every cup. Cool, creamy, and crafted for you.
          </p>
        </div>

        {/* Filter pills — desktop only. On mobile each rail card IS the
            filter, so the pill row is redundant and just eats vertical
            space. */}
        <div className="hidden lg:mb-10 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-3">
          <FilterPill
            active={filter === "all"}
            filter="all"
            onClick={setFilter}
            label="All Drinks"
            count={ALL_DRINKS.length}
          />
          {CATEGORY_ORDER.map((cat) => (
            <FilterPill
              key={cat}
              active={filter === cat}
              filter={cat}
              onClick={setFilter}
              label={CATEGORY_META[cat].label}
              count={groupedDrinks[cat].length}
              category={cat}
            />
          ))}
        </div>

        {/* Mobile (< lg): always show the horizontal rail, regardless of
            any filter state set on desktop. The filter UI is hidden on
            mobile so swiping is the only navigation. */}
        <div className="lg:hidden">
          <div className="drinks-rail flex snap-x snap-mandatory gap-3 overflow-x-auto px-[7.5vw] pb-2">
            {CATEGORY_ORDER.map((cat) => (
              <div
                key={cat}
                className="w-[85vw] flex-shrink-0 snap-center"
              >
                <CategorySection
                  category={cat}
                  drinks={groupedDrinks[cat]}
                  fullWidth={false}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#5a3526]/70">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 14"
              className="h-3 w-5 text-[#e3242b]"
              fill="none"
            >
              <path
                d="M23 7H1m0 0l6-6M1 7l6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Swipe to browse</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 14"
              className="h-3 w-5 text-[#e3242b]"
              fill="none"
            >
              <path
                d="M1 7h22m0 0l-6-6m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Desktop (lg+): respects the filter state set via the pills. */}
        <div
          key={filter}
          className="hidden animate-[drink-fade_0.4s_ease-out_both] lg:block"
        >
          {showFullWidth ? (
            <div className="space-y-4">
              {visibleCategories.map((cat) => (
                <CategorySection
                  key={cat}
                  category={cat}
                  drinks={groupedDrinks[cat]}
                  fullWidth
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Row 1: Smoothies (4) wider than Iced Drinks (3) — fr
                  units in proportion to drink count keep individual
                  drink-cards the same visual width across both. */}
              <div className="grid grid-cols-[4fr_3fr] gap-4">
                <CategorySection
                  category="smoothie"
                  drinks={groupedDrinks.smoothie}
                  fullWidth={false}
                />
                <CategorySection
                  category="iced"
                  drinks={groupedDrinks.iced}
                  fullWidth={false}
                />
              </div>

              {/* Row 2: Shakes + Hot both 4 drinks — equal 1:1. */}
              <div className="grid grid-cols-2 gap-4">
                <CategorySection
                  category="shake"
                  drinks={groupedDrinks.shake}
                  fullWidth={false}
                />
                <CategorySection
                  category="hot"
                  drinks={groupedDrinks.hot}
                  fullWidth={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
