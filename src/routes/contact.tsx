import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BR NOIR Luxury Perfumes" },
      {
        name: "description",
        content:
          "Get in touch with BR NOIR Luxury Perfumes — questions about orders, products or delivery, our team is here to help.",
      },
      { property: "og:title", content: "Contact — BR NOIR Luxury Perfumes" },
      {
        property: "og:description",
        content: "Get in touch with BR NOIR Luxury Perfumes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="font-display text-4xl font-medium">Contact</h1>
      <p className="mt-5 leading-relaxed text-foreground/90">
        Have a question about your order, our fragrances, or delivery? Our team is
        here to help — reach out any time and we'll get back to you as soon as
        possible.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        We aim to reply within 24 hours, seven days a week.
      </p>
    </main>
  );
}
