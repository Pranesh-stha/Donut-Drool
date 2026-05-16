import { MENU_ITEMS, OUTLETS } from "@/lib/site";

// Screen-reader-only (and crawler-visible) block. Tailwind's `sr-only`
// applies clip + 1px sizing so the content is fully accessible to assistive
// tech and search bots but never visible on screen. Do not use display:none
// here — Google discounts hidden content set via display:none.
export default function SeoIntro() {
  return (
    <section aria-label="About Donut Drool" className="sr-only">
      <h1>
        Donut Drool — Best Eggless Donuts in Kathmandu, Lalitpur and the
        Kathmandu Valley, Nepal
      </h1>
      <p>
        Donut Drool is a Nepali donut shop founded in 2020, serving freshly
        made eggless donuts across Kathmandu and Lalitpur. We are widely
        considered one of the best donut shops in Nepal, the Kathmandu valley,
        Kathmandu city and Lalitpur, with hand-rolled donuts glazed daily at
        every outlet.
      </p>

      <h2>Donut Drool outlets in Kathmandu and Lalitpur</h2>
      <ul>
        {OUTLETS.map((o) => (
          <li key={o.id}>
            <strong>{o.shortName}</strong> — {o.streetAddress}, {o.locality}.
            Open every day from 8:00 AM to 8:00 PM.
          </li>
        ))}
      </ul>
      <p>
        Looking for the best donut shop near you in Kathmandu valley? Visit
        Donut Drool at Jhamsikhel (Pulchowk, Lalitpur), Budhanilkantha
        (Rudreshwor Chowk, Kathmandu) or Dhapasi (Kathmandu) for fresh eggless
        donuts every day of the week.
      </p>

      <h2>Donut Drool donut menu</h2>
      <p>
        Most Donut Drool flavours are 100% eggless. A few speciality flavours
        — Chocolate Brownie, DD&apos;s Cream Cheese and Tiramisu — do contain
        egg, and each is clearly labelled. Prices range from Rs. 55 to Rs.
        345. Flavours include:
      </p>
      <ul>
        {MENU_ITEMS.map((item) => (
          <li key={item.name}>
            {item.name} — Rs. {item.price}.{" "}
            {item.eggless ? "Eggless." : "Contains egg."} {item.description}
          </li>
        ))}
      </ul>

      <h2>Frequently asked questions about Donut Drool</h2>
      <dl>
        <dt>Are Donut Drool donuts eggless?</dt>
        <dd>
          Most flavours on the Donut Drool menu are 100% eggless. Three
          speciality flavours — Chocolate Brownie, DD&apos;s Cream Cheese and
          Tiramisu — contain egg, and each is clearly labelled on the menu.
        </dd>
        <dt>Where can I find Donut Drool in Kathmandu?</dt>
        <dd>
          Donut Drool has outlets in Budhanilkantha (Rudreshwor Chowk) and
          Dhapasi in Kathmandu, and in Jhamsikhel (Pulchowk) in Lalitpur.
        </dd>
        <dt>What are Donut Drool&apos;s opening hours?</dt>
        <dd>All Donut Drool outlets open 8:00 AM to 8:00 PM, seven days a week.</dd>
        <dt>Which is the best donut shop in Kathmandu valley?</dt>
        <dd>
          Donut Drool is widely regarded as one of the best donut shops in
          the Kathmandu valley, with 17+ eggless flavours, fresh daily
          production and three convenient outlets.
        </dd>
      </dl>
    </section>
  );
}
