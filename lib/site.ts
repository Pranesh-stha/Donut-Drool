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

export const OUTLETS = [
  {
    id: "jhamsikhel",
    name: "Donut Drool — Jhamsikhel",
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
    name: "Donut Drool — Budhanilkantha",
    shortName: "Budhanilkantha",
    streetAddress: "Rudreshwor Chowk",
    locality: "Kathmandu",
    region: "Bagmati",
    postalCode: "44600",
    country: "NP",
    mapsUrl: "https://maps.app.goo.gl/cSKFouxQULZqxyC66",
    opens: "08:00",
    closes: "20:00",
  },
  {
    id: "dhapasi",
    name: "Donut Drool — Dhapasi",
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
  { name: "Classic Glazed", price: "120", image: "/menu/glazed.png", description: "Light, soft, eggless glazed donut — the classic." },
  { name: "Chocolate Icing", price: "150", image: "/menu/chocolateIcing.png", description: "Soft eggless donut topped with rich chocolate icing." },
  { name: "White Sprinkles", price: "165", image: "/menu/whiteIcingSprinkels.png", description: "Vanilla icing with colourful sprinkles on an eggless base." },
  { name: "Oreo Crunch", price: "170", image: "/menu/oreo.png", description: "Eggless donut loaded with Oreo crumbles." },
  { name: "Raspberry", price: "160", image: "/menu/raspberry.png", description: "Tart-sweet raspberry glaze on a soft eggless donut." },
  { name: "Honey Glaze", price: "135", image: "/menu/honey.png", description: "Warm honey glaze on a fresh eggless donut." },
  { name: "Choco Chips", price: "175", image: "/menu/chocochips.png", description: "Eggless donut studded with chocolate chips." },
  { name: "Chocolate Brownie", price: "180", image: "/menu/chocolateBrownie.png", description: "Brownie-inspired chocolate donut, eggless." },
  { name: "Cookies & Cream", price: "170", image: "/menu/cookielike.png", description: "Cookies-and-cream topping on an eggless donut." },
  { name: "The Actual Custard", price: "155", image: "/menu/TheActualCustard.png", description: "Genuine custard topping on a soft eggless donut." },
  { name: "Custard Filled", price: "150", image: "/menu/custard.png", description: "Eggless donut filled with smooth custard." },
  { name: "Cream Filled", price: "145", image: "/menu/creamInMiddle.png", description: "Eggless donut filled with rich whipped cream." },
  { name: "Choco Cream Center", price: "175", image: "/menu/chocoIcingwithcentercreame.png", description: "Chocolate icing outside, cream centre, eggless." },
  { name: "DD's Cream Cheese", price: "185", image: "/menu/DDsCreamecheese.png", description: "Signature cream-cheese topping, eggless." },
  { name: "Kunafa", price: "200", image: "/menu/kunafa.png", description: "Crispy kunafa-inspired fusion donut, eggless." },
  { name: "Cinnamon Brown", price: "130", image: "/menu/brown.png", description: "Warm cinnamon-spiced eggless donut." },
  { name: "Just A Donut", price: "110", image: "/menu/justAdonut.png", description: "A simple, soft eggless donut — pure comfort." },
] as const;
