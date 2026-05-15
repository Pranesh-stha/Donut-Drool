import {
  MENU_ITEMS,
  OUTLETS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
} from "@/lib/site";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: "Donut Drool Nepal",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    foundingDate: "2020",
    servesCuisine: ["Donuts", "Desserts", "Bakery"],
    priceRange: "Rs. 110 – Rs. 200",
    areaServed: [
      { "@type": "City", name: "Kathmandu" },
      { "@type": "City", name: "Lalitpur" },
      { "@type": "AdministrativeArea", name: "Kathmandu Valley" },
      { "@type": "Country", name: "Nepal" },
    ],
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    department: OUTLETS.map((o) => ({ "@id": `${SITE_URL}/#${o.id}` })),
  };
}

function localBusinessSchemas() {
  return OUTLETS.map((o) => ({
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${SITE_URL}/#${o.id}`,
    name: o.name,
    image: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    // TODO: telephone — add once business numbers are confirmed
    address: {
      "@type": "PostalAddress",
      streetAddress: o.streetAddress,
      addressLocality: o.locality,
      addressRegion: o.region,
      postalCode: o.postalCode,
      addressCountry: o.country,
    },
    hasMap: o.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAYS_OF_WEEK,
        opens: o.opens,
        closes: o.closes,
      },
    ],
    servesCuisine: ["Donuts", "Desserts", "Bakery"],
    priceRange: "Rs. 110 – Rs. 200",
    parentOrganization: { "@id": `${SITE_URL}/#business` },
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
  }));
}

function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}/#menu`,
    name: "Donut Drool Menu",
    description:
      "Donut Drool's full eggless donut menu, freshly made daily at all three Kathmandu valley outlets.",
    inLanguage: "en",
    hasMenuSection: {
      "@type": "MenuSection",
      name: "Donuts",
      hasMenuItem: MENU_ITEMS.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        image: `${SITE_URL}${item.image}`,
        suitableForDiet: "https://schema.org/VegetarianDiet",
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "NPR",
          availability: "https://schema.org/InStock",
        },
      })),
    },
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Are Donut Drool donuts eggless?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — every donut on the Donut Drool menu is 100% eggless, made fresh daily at our Kathmandu and Lalitpur outlets.",
        },
      },
      {
        "@type": "Question",
        name: "Where are Donut Drool outlets located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Donut Drool has three outlets in the Kathmandu valley: Jhamsikhel (Pulchowk, Lalitpur), Budhanilkantha (Rudreshwor Chowk, Kathmandu), and Dhapasi (Kathmandu).",
        },
      },
      {
        "@type": "Question",
        name: "What are Donut Drool's opening hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All Donut Drool outlets are open from 8:00 AM to 8:00 PM, seven days a week.",
        },
      },
      {
        "@type": "Question",
        name: "How much do Donut Drool donuts cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Donut Drool donuts range from Rs. 110 for a Just A Donut to Rs. 200 for the Kunafa, with 17+ flavours in between.",
        },
      },
      {
        "@type": "Question",
        name: "Which is the best donut shop in Kathmandu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Donut Drool is widely considered one of the best donut shops in Kathmandu and the wider Kathmandu valley, known for fresh, hand-rolled, eggless donuts in 17+ flavours.",
        },
      },
      {
        "@type": "Question",
        name: "Does Donut Drool offer donuts in Lalitpur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — visit our Jhamsikhel outlet in Pulchowk, Lalitpur for the full Donut Drool menu.",
        },
      },
    ],
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en-NP",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export default function JsonLd() {
  const graph = [
    organizationSchema(),
    websiteSchema(),
    ...localBusinessSchemas(),
    menuSchema(),
    faqSchema(),
  ];

  return (
    <script
      type="application/ld+json"
      // Stringify once at build/render. dangerouslySetInnerHTML is the
      // standard pattern for JSON-LD in Next.js.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
