import { createFileRoute, Link } from "@tanstack/react-router";
import editorialImage from "@/assets/editorial.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — BR NOIR Luxury Perfumes" },
      {
        name: "description",
        content:
          "BR NOIR Luxury Perfumes — where elegance meets sophistication in every fragrance. Timeless scents, modern you.",
      },
      { property: "og:title", content: "About Us — BR NOIR Luxury Perfumes" },
      {
        property: "og:description",
        content: "Timeless scents, modern you — BR NOIR Luxury Perfumes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <img
        src={editorialImage}
        alt="BR NOIR Luxury Perfumes — luxury fragrances"
        className="w-full object-cover"
      />
      <div className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h1 className="font-display text-4xl font-medium">About Us</h1>
        <p className="mt-6 leading-relaxed text-foreground/90">
          Discover the art of luxury with <strong>BR NOIR Perfumes</strong>, where
          elegance meets sophistication in every fragrance. Explore our exclusive
          collection of captivating scents, carefully chosen to complement your
          personality and leave a lasting impression. From rich, bold aromas to
          fresh, refreshing notes, find the perfect fragrance for every mood and
          occasion. Experience timeless charm, exceptional quality, and the beauty
          of unforgettable scents. With BR NOIR, express your unique style and make
          every moment truly extraordinary.
        </p>
        <p className="mt-4 leading-relaxed text-foreground/90">
          Every fragrance we stock is 100% original and sealed, sourced with care
          and delivered all over Pakistan — with cash on delivery available for
          your peace of mind.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded-md bg-button px-8 py-3 text-sm font-medium text-button-foreground transition-colors hover:bg-button/90"
        >
          Shop Now
        </Link>
      </div>
    </main>
  );
}
