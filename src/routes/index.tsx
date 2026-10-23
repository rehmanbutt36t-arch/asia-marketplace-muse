import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Truck, Clock, Star, HandCoins, BadgeCheck, Headphones } from "lucide-react";
import { productsQueryOptions } from "@/lib/shopify";
import { ProductCard } from "@/components/store/ProductCard";
import heroImage from "@/assets/hero.jpg";
import collectionMens from "@/assets/collection-mens.jpg";
import collectionWoman from "@/assets/collection-woman.jpg";
import collectionUnisex from "@/assets/collection-unisex.jpg";
import editorialImage from "@/assets/editorial.jpg";

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(productsQueryOptions({ first: 8 })),
  head: () => ({
    meta: [
      { title: "BR NOIR — Luxury Perfumes | Timeless Scents, Modern You" },
      {
        name: "description",
        content:
          "Shop premium fragrances at BR NOIR Luxury Perfumes. Mens, Woman and Unisex collections with fast delivery, cash on delivery and premium quality guaranteed.",
      },
      { property: "og:title", content: "BR NOIR — Luxury Perfumes" },
      {
        property: "og:description",
        content: "Timeless scents, modern you. Premium quality fragrances with fast delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const COLLECTIONS = [
  { label: "Mens", image: collectionMens, search: { collection: "mens" } },
  { label: "Woman", image: collectionWoman, search: { collection: "woman" } },
  { label: "Unisex", image: collectionUnisex, search: { collection: "unisex" } },
];

const BADGES = [
  { icon: Truck, label: "Free Delivery" },
  { icon: Clock, label: "Limited Time" },
  { icon: Star, label: "Premium Quality" },
  { icon: HandCoins, label: "Cash on Delivery" },
];

const PERKS = [
  {
    icon: Truck,
    title: "Fast delivery",
    text: "Get your order delivered quickly and reliably.",
  },
  {
    icon: BadgeCheck,
    title: "Premium quality guaranteed",
    text: "Thoughtfully selected products you can count on.",
  },
  {
    icon: Headphones,
    title: "Premium support 24/7",
    text: "Our team is here to help whenever you need us.",
  },
];

const REVIEWS = [
  { name: "Ayesha K. — Lahore", text: "Fantastic service and a product that looks even better in person." },
  { name: "Bilal R. — Karachi", text: "Original packaging, fast delivery and the fragrance lasts all day." },
  { name: "Sana M. — Islamabad", text: "Ordered for my husband — he loved it. Will definitely order again." },
  { name: "Hamza T. — Faisalabad", text: "Great prices for luxury perfumes. Cash on delivery made it so easy." },
  { name: "Zainab A. — Multan", text: "The scent is exactly as described. Packaging was premium and secure." },
  { name: "Usman S. — Rawalpindi", text: "Second order already. Delivery was quick and everything was sealed." },
];

function Index() {
  const { data: products } = useSuspenseQuery(productsQueryOptions({ first: 8 }));
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setReviewIndex((i) => (i + 1) % REVIEWS.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);
  const review = REVIEWS[reviewIndex] ?? REVIEWS[0]!;

  return (
    <main>
      {/* Hero */}
      <section>
        <img
          src={heroImage}
          alt="BR NOIR Luxury Perfumes — timeless scents, modern you"
          className="w-full"
        />
      </section>

      {/* Badge strip */}
      <section className="bg-primary py-3">
        {/* Mobile: sliding marquee */}
        <div className="flex overflow-hidden md:hidden">
          <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
            {[...BADGES, ...BADGES].map(({ icon: Icon, label }, i) => (
              <span
                key={`${label}-${i}`}
                className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </span>
            ))}
          </div>
        </div>
        {/* Desktop: static centered row */}
        <div className="mx-auto hidden max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 md:flex">
          {BADGES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Shop collections */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center font-display text-3xl font-medium md:text-4xl">
          Shop collections
        </h2>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 items-stretch justify-center gap-2 sm:flex sm:gap-6">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.label}
              to="/shop"
              search={c.search}
              className="overflow-hidden rounded-xl bg-secondary text-center shadow-sm transition-shadow hover:shadow-md sm:max-w-[220px] sm:rounded-2xl"
            >
              <img
                src={c.image}
                alt={`${c.label} collection`}
                className="aspect-[220/223] w-full object-cover"
              />
              <span className="block bg-secondary py-2 text-xs font-medium sm:py-2.5 sm:text-sm">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-medium md:text-4xl">
            Featured products
          </h2>
          <Link
            to="/shop"
            className="rounded-md bg-button px-4 py-2.5 text-sm font-medium text-button-foreground transition-colors hover:bg-button/90"
          >
            View all
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="mt-8 text-muted-foreground">No products found</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {products.map((edge) => (
              <ProductCard key={edge.node.id} product={edge.node} />
            ))}
          </div>
        )}
      </section>

      {/* Why shop with us */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <h2 className="text-center font-display text-3xl font-medium md:text-4xl">
          Why shop with us
        </h2>
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="rounded-xl border border-border bg-card p-8 text-center shadow-sm"
            >
              <perk.icon className="mx-auto h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 font-sans text-lg font-bold">{perk.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{perk.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src={editorialImage}
            alt="Valentino Born In Roma Uomo"
            className="w-full rounded-none object-cover"
          />
          <div>
            <h2 className="font-display text-3xl font-medium md:text-4xl">
              Valentino Born In Roma Extradoe 100ml
            </h2>
            <p className="mt-5 leading-relaxed text-foreground/90">
              Discover the art of luxury with <strong>BR NOIR Perfumes</strong>, where
              elegance meets sophistication in every fragrance. Explore our exclusive
              collection of captivating scents, carefully chosen to complement your
              personality and leave a lasting impression. From rich, bold aromas to
              fresh, refreshing notes, find the perfect fragrance for every mood and
              occasion. Experience timeless charm, exceptional quality, and the beauty
              of unforgettable scents. With BR NOIR, express your unique style and make
              every moment truly extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials — rotating */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-center font-display text-3xl font-medium md:text-4xl">
          What our customers say
        </h2>
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground">
          <div key={reviewIndex} className="fade-swap">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-5 text-lg">{review.text}</p>
            <p className="mt-5 font-semibold">{review.name}</p>
            <p className="mt-1 text-sm opacity-80">Verified customer</p>
          </div>
        </div>
      </section>
    </main>
  );
}
