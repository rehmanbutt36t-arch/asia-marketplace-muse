import { createFileRoute } from "@tanstack/react-router";
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
        content: "BR NOIR Luxury Perfumes — timeless scents, modern you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <img
          src={editorialImage}
          alt="BR NOIR Luxury Perfumes"
          className="w-full object-cover"
        />
        <div>
          <h1 className="font-display text-4xl font-medium">About Us</h1>
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
    </main>
  );
}
