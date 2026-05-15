"use client";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
  { label: "About", href: "#about" },
];

const LOCATIONS = [
  {
    name: "Jhamsikhel",
    address: "Pulchowk, Lalitpur",
    mapsUrl: "https://maps.app.goo.gl/xovcC4Acc9qDgWRD8",
  },
  {
    name: "Budhanilkantha",
    address: "Rudreshwor Chowk, Kathmandu",
    mapsUrl: "https://maps.app.goo.gl/cSKFouxQULZqxyC66",
  },
  {
    name: "Dhapasi",
    address: "Dhapasi, Kathmandu",
    mapsUrl: "https://maps.app.goo.gl/qhNSTHFhhgtXmPRaA",
  },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
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

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 17.5s-6.5-4.2-6.5-9A3.6 3.6 0 0 1 10 6a3.6 3.6 0 0 1 6.5 2.5c0 4.8-6.5 9-6.5 9z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-32 w-full bg-[#3a1f17] text-cream md:mt-48 lg:mt-56">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[calc(100%-1px)] left-0 block h-40 w-full md:h-64 lg:h-72"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
      >
        <path
          d="M0 240H1440V158
             C1406 139 1372 151 1336 169
             C1291 192 1250 175 1210 149
             C1168 122 1118 129 1082 162
             C1041 200 982 188 947 151
             C910 112 858 112 816 144
             C770 179 709 168 670 130
             C629 90 573 91 535 132
             C500 169 448 169 412 132
             C373 92 316 96 281 138
             C247 179 199 196 158 166
             C126 143 94 149 62 168
             C35 184 14 169 0 158Z"
          fill="#3a1f17"
        />
        <path
          d="M42 174
             C80 190 115 145 157 177
             C199 209 247 191 283 151
             C320 110 372 106 411 146
             C448 184 502 185 538 147
             C576 107 626 105 669 145
             C710 183 770 194 819 157
             C861 125 908 124 945 164
             C983 204 1040 214 1086 176
             C1128 141 1168 137 1213 163
             C1255 188 1294 205 1342 180"
          fill="none"
          stroke="#2b160f"
          strokeLinecap="round"
          strokeWidth="12"
          opacity="0.13"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-8 pt-20 pb-12 md:px-14 md:pt-24 lg:px-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 lg:gap-16">
          <div>
            <h3 className="font-display text-5xl uppercase leading-[0.92] text-cream md:text-6xl">
              Donut
              <br />
              <span className="relative inline-block -rotate-2 align-baseline">
                <span className="relative z-10 text-[#ff8aa8] [text-shadow:3px_3px_0_#e3242b]">
                  Drool
                </span>
                <span className="absolute -right-3 top-1 h-3 w-3 rounded-full bg-[#e3242b]" />
                <span className="absolute -right-1 top-7 h-1.5 w-1.5 rounded-full bg-[#ffd166]" />
              </span>
            </h3>
            <p className="mt-8 max-w-sm font-sans text-sm leading-relaxed text-[#d9b9a3]">
              Hand-rolled, eggless, and glazed with love &mdash; bringing fresh
              donuts and warm smiles to the valley every single day.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.instagram.com/donut_drool/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donut Drool on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream/30 text-cream transition-all hover:-translate-y-0.5 hover:border-[#e3242b] hover:bg-[#e3242b] hover:text-cream"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/DonutDrool.Nepal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donut Drool on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream/30 text-cream transition-all hover:-translate-y-0.5 hover:border-[#e3242b] hover:bg-[#e3242b] hover:text-cream"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <span className="ml-2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#d9b9a3]">
                Follow Along
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.32em] text-[#ffd166]">
              Explore
            </h4>
            <ul className="mt-6 space-y-3 font-display text-2xl uppercase">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-cream transition-colors hover:text-[#ff8aa8]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e3242b] transition-transform group-hover:scale-150" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
              <h4 className="font-sans text-xs uppercase tracking-[0.32em] text-[#ffd166]">
                Sweet Stops
              </h4>
              <ul className="mt-6 space-y-4 font-sans text-sm">
                {LOCATIONS.map((loc) => (
                  <li key={loc.name}>
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${loc.name} in Google Maps`}
                      className="group block"
                    >
                      <span className="block font-display text-xl uppercase tracking-wide text-cream transition-colors group-hover:text-[#ff8aa8]">
                        {loc.name}
                      </span>
                      <span className="block text-[#d9b9a3] transition-colors group-hover:text-cream">
                        {loc.address}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
        </div>

        <div className="mt-14 flex items-center gap-2">
          <span className="block h-1 w-10 rounded-full bg-[#e3242b]" />
          <span className="block h-1 w-3 rounded-full bg-[#ffd166]" />
          <span className="block h-1 w-6 rounded-full bg-[#ff8aa8]" />
          <span className="block h-1 w-2 rounded-full bg-cream" />
          <span className="block h-px flex-1 bg-cream/15" />
          <span className="block h-1 w-2 rounded-full bg-[#ffd166]" />
          <span className="block h-1 w-4 rounded-full bg-[#e3242b]" />
        </div>

        <div className="mt-8 flex flex-col gap-3 font-sans text-[11px] uppercase tracking-[0.28em] text-[#d9b9a3] md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {new Date().getFullYear()} Donut Drool &middot; Made in
            Nepal
          </span>
          <span className="inline-flex items-center gap-2 text-[#ff8aa8]">
            <HeartIcon className="h-3 w-3" />
            <span>Eggless &middot; Made Fresh Daily</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
