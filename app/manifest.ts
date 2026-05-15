import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Donut Drool — Best Eggless Donuts in Kathmandu & Lalitpur",
    short_name: "Donut Drool",
    description:
      "Hand-rolled, eggless donuts made fresh daily in Kathmandu and Lalitpur, Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#fef6ec",
    theme_color: "#e3242b",
    icons: [{ src: "/favicon.png", sizes: "any", type: "image/png" }],
  };
}
