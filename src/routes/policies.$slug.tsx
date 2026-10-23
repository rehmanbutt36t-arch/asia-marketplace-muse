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
      "ORDER PROCESSING — Orders placed before 4:00 PM are prepared and dispatched within 24 hours on working days. You will receive an order confirmation immediately after checkout, and tracking details as soon as your parcel leaves our warehouse.",
      "DELIVERY TIME — Major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan and others): 2–4 working days. Remote areas and smaller towns: 3–7 working days. Delivery times may vary slightly during public holidays or due to courier delays, which are outside our control.",
      "DELIVERY CHARGES — Delivery is FREE on all orders of Rs 5,000 and above. For orders below Rs 5,000, a standard delivery fee is shown at checkout before you confirm your order. We deliver all over Pakistan.",
      "CASH ON DELIVERY — Cash on delivery is available across Pakistan. Please keep the exact amount ready, as couriers may carry limited change.",
      "TRACKING & RECEIVING — Once dispatched, your tracking number lets you follow the parcel until it reaches you. Please make sure your shipping address and phone number are correct at checkout — parcels cannot be rerouted once they are on the way. Someone should be available at the given address to receive the parcel.",
      "DAMAGED OR MISSING PARCELS — If your parcel arrives damaged, or items are missing, contact us within 48 hours of delivery with photos of the parcel and we will resolve it with a replacement or refund.",
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    body: [
      "7-DAY RETURN WINDOW — We want you to love every BR NOIR purchase. If your item arrives damaged, faulty, or you receive the wrong product, contact us within 7 days of delivery and we will arrange a replacement or a full refund — whichever you prefer.",
      "CONDITION OF RETURNED ITEMS — For hygiene reasons, fragrances can only be returned if they are unopened, unused and in their original sealed packaging with all tags intact. Opened or used perfumes cannot be returned unless they are faulty.",
      "HOW TO RETURN — Step 1: Contact us through the Contact page with your order number and photos of the product and packaging. Step 2: Once approved, we will guide you on sending the parcel back. Step 3: After the returned item is received and checked, your refund or replacement is processed.",
      "REFUND METHOD & TIMING — Refunds are issued to the original payment method used at checkout. Once the return is approved, refunds are processed within 5–7 working days. Bank or payment-provider processing time may add 1–2 more working days.",
      "RETURN SHIPPING COSTS — If the return is due to our error (damaged, faulty or wrong item), we cover the return shipping cost. For all other returns, the customer is responsible for return shipping charges.",
      "NON-RETURNABLE ITEMS — For safety and hygiene, opened, used or tampered fragrance products cannot be accepted for return unless they are faulty.",
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
      <div className="mt-6 space-y-5">
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
