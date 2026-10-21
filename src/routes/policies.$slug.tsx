import { createFileRoute, notFound, Link } from "@tanstack/react-router";

const POLICIES: Record<string, { title: string; body: string[] }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    body: [
      "Your privacy matters to us. We collect only the information needed to process your order — such as your name, contact details and shipping address — and we never sell or share your personal information with third parties for their own marketing.",
      "Payment details are processed securely through our checkout provider and are never stored on our servers. If you have questions about how your data is handled, contact us any time.",
    ],
  },
  "shipping-policy": {
    title: "Shipping Policy",
    body: [
      "Orders are processed promptly and delivered as quickly and reliably as possible. Delivery times may vary depending on your location, and any delays caused by courier services or public holidays are outside our control.",
      "You will receive your order tracking details as soon as your parcel is dispatched. Please make sure your shipping address is correct at checkout, as we cannot reroute parcels once they are on the way.",
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    body: [
      "We want you to love every BR NOIR purchase. If your item arrives damaged or you receive the wrong product, contact us within 7 days of delivery and we will arrange a replacement or refund.",
      "For hygiene reasons, opened or used fragrances cannot be returned unless they are faulty. Refunds are issued to the original payment method once the returned item has been received and checked.",
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    body: [
      "By using this store and placing an order, you agree to these terms. All product names, brand trademarks and imagery belong to their respective owners; BR NOIR is an independent retailer.",
      "Prices are listed in Pakistani Rupees and may change without notice. Orders are subject to availability, and we reserve the right to cancel an order and refund the payment if an item becomes unavailable.",
    ],
  },
};

export const Route = createFileRoute("/policies/$slug")({
  head: ({ params }) => ({
    meta: [
      {
        title: `${POLICIES[params.slug]?.title ?? "Policy"} — BR NOIR`,
      },
      { property: "og:title", content: `${POLICIES[params.slug]?.title ?? "Policy"} — BR NOIR` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PolicyPage,
});

function PolicyPage() {
  const { slug } = Route.useParams();
  const policy = POLICIES[slug];
  if (!policy) throw notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-4xl font-medium">{policy.title}</h1>
      <div className="mt-6 space-y-4">
        {policy.body.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-foreground/90">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        Questions?{" "}
        <Link to="/contact" className="underline">
          Contact us
        </Link>
        .
      </p>
    </main>
  );
}
