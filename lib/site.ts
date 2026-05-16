export const SITE_URL = "https://donutdrool.com";

export const SITE_NAME = "Donut Drool";

export const SITE_DESCRIPTION =
  "Donut Drool serves Nepal's best eggless donuts — fresh, hand-rolled, and glazed with love. 17+ flavors. Outlets in Jhamsikhel (Pulchowk, Lalitpur), Budhanilkantha and Dhapasi (Kathmandu).";

export const SITE_TAGLINE =
  "Best Eggless Donuts in Kathmandu & Lalitpur, Nepal";

export const SOCIAL = {
  instagram: "https://www.instagram.com/donut_drool/",
  facebook: "https://www.facebook.com/DonutDrool.Nepal/",
};

// `name` here must match the exact business name on each outlet's verified
// Google Business Profile, including capitalisation and punctuation. All
// three GBPs are registered as "Donut Drool" (no suffix), so the schema
// uses the same form and differentiates by address. `shortName` is the
// human-readable neighbourhood label used in the frontend.
export const OUTLETS = [
  {
    id: "jhamsikhel",
    name: "Donut Drool",
    shortName: "Jhamsikhel",
    streetAddress: "Pulchowk",
    locality: "Lalitpur",
    region: "Bagmati",
    postalCode: "44700",
    country: "NP",
    mapsUrl: "https://maps.app.goo.gl/xovcC4Acc9qDgWRD8",
    opens: "08:00",
    closes: "20:00",
  },
  {
    id: "budhanilkantha",
    name: "Donut Drool",
    shortName: "Budhanilkantha",
    streetAddress: "Gulfutar Main Rd, Rudreshwor Chowk",
    locality: "Budhanilkantha",
    region: "Bagmati",
    postalCode: "44600",
    country: "NP",
    mapsUrl: "https://maps.app.goo.gl/cSKFouxQULZqxyC66",
    opens: "08:00",
    closes: "20:00",
  },
  {
    id: "dhapasi",
    name: "Donut Drool",
    shortName: "Dhapasi",
    streetAddress: "Dhapasi",
    locality: "Kathmandu",
    region: "Bagmati",
    postalCode: "44600",
    country: "NP",
    mapsUrl: "https://maps.app.goo.gl/qhNSTHFhhgtXmPRaA",
    opens: "08:00",
    closes: "20:00",
  },
] as const;

export const MENU_ITEMS = [
  { name: "Glazed", price: "55", image: "/menu/glazed55.png", eggless: true, description: "Light, soft, eggless glazed donut — the classic." },
  { name: "Cinnamon", price: "75", image: "/menu/Cinnamon75.png", eggless: true, description: "Warm cinnamon-spiced eggless donut." },
  { name: "Dark Chocolate", price: "135", image: "/menu/Darkchocolate135.png", eggless: true, description: "Rich dark chocolate topping on a soft eggless donut." },
  { name: "White Chocolate", price: "135", image: "/menu/whitechocolate135.png", eggless: true, description: "Creamy white chocolate glaze on an eggless donut." },
  { name: "Blueberry", price: "135", image: "/menu/blueberry135.png", eggless: true, description: "Sweet blueberry glaze on a fresh eggless donut." },
  { name: "Mango", price: "135", image: "/menu/Mango135.png", eggless: true, description: "Tropical mango glaze on a soft eggless donut." },
  { name: "Strawberry", price: "135", image: "/menu/Sreawberry135.png", eggless: true, description: "Sweet-tart strawberry glaze on an eggless donut." },
  { name: "Dark Choco Chip", price: "155", image: "/menu/Darkchocochip155.png", eggless: true, description: "Eggless donut studded with dark chocolate chips." },
  { name: "Oreo", price: "165", image: "/menu/oreo165.png", eggless: true, description: "Eggless donut loaded with Oreo crumbles." },
  { name: "Custard", price: "165", image: "/menu/custard165.png", eggless: true, description: "Eggless donut filled with smooth custard." },
  { name: "Mocha", price: "175", image: "/menu/Mocha175.png", eggless: true, description: "Coffee-mocha glaze on a soft eggless donut." },
  { name: "Dora Cake", price: "175", image: "/menu/DoraCake175.png", eggless: true, description: "Dorayaki-inspired eggless fusion donut." },
  { name: "Salted Caramel", price: "255", image: "/menu/SaltedCaremal255.png", eggless: true, description: "Sweet-salty caramel glaze on an eggless donut." },
  { name: "Chocolate Brownie", price: "285", image: "/menu/chocolateBrownie285.png", eggless: false, description: "Speciality brownie-inspired chocolate donut. Contains egg." },
  { name: "DD's Cream Cheese", price: "285", image: "/menu/DDsCreamecheese285.png", eggless: false, description: "Signature cream-cheese topping. Contains egg." },
  { name: "Tiramisu", price: "285", image: "/menu/TiramisuDonut285.png", eggless: false, description: "Coffee-and-cream tiramisu-inspired donut. Contains egg." },
  { name: "Kunafa", price: "345", image: "/menu/kunafa345.png", eggless: true, description: "Crispy kunafa-inspired fusion donut, eggless." },
] as const;
