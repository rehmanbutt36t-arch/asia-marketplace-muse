import { createFileRoute, notFound, Link } from "@tanstack/react-router";

type PolicyItem = { h?: string; p: string };

const POLICIES: Record<string, { title: string; body: PolicyItem[] }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    body: [
      {
        h: "Information We Collect",
        p: "Your privacy matters to us. We collect only the information needed to process your order — such as your name, contact details and shipping address.",
      },
      {
        h: "Payment Security",
        p: "Payment details are processed securely through our checkout provider and are never stored on our servers.",
      },
      {
        h: "We Never Sell Your Data",
        p: "We never sell or share your personal information with third parties for their own marketing. Your details are used only to fulfil and deliver your order.",
      },
      {
        h: "Questions?",
        p: "If you have questions about how your data is handled, contact us any time through the Contact page.",
      },
    ],
  },
  "shipping-policy": {
    title: "Shipping Policy",
    body: [
      {
        h: "Order Processing",
        p: "Orders placed before 4:00 PM are prepared and dispatched within 24 hours on working days. You will receive an order confirmation immediately after checkout, and tracking details as soon as your parcel leaves our warehouse.",
      },
      {
        h: "Delivery Time",
        p: "Major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan and others): 2–4 working days. Remote areas and smaller towns: 3–7 working days. Delivery times may vary slightly during public holidays or due to courier delays, which are outside our control.",
      },
      {
        h: "Delivery Charges",
        p: "Delivery is FREE on all orders of Rs 5,000 and above. For orders below Rs 5,000, a standard delivery fee is shown at checkout before you confirm your order. We deliver all over Pakistan.",
      },
      {
        h: "Cash on Delivery",
        p: "Cash on delivery is available across Pakistan. Please keep the exact amount ready, as couriers may carry limited change.",
      },
      {
        h: "Tracking & Receiving",
        p: "Once dispatched, your tracking number lets you follow the parcel until it reaches you. Please make sure your shipping address and phone number are correct at checkout — parcels cannot be rerouted once they are on the way. Someone should be available at the given address to receive the parcel.",
      },
      {
        h: "Damaged or Missing Parcels",
        p: "If your parcel arrives damaged, or items are missing, contact us within 48 hours of delivery with photos of the parcel and we will resolve it with a replacement or refund.",
      },
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    body: [
      {
        h: "7-Day Return Window",
        p: "We want you to love every BR NOIR purchase. If your item arrives damaged, faulty, or you receive the wrong product, contact us within 7 days of delivery and we will arrange a replacement or a full refund — whichever you prefer.",
      },
      {
        h: "Condition of Returned Items",
        p: "For hygiene reasons, fragrances can only be returned if they are unopened, unused and in their original sealed packaging with all tags intact. Opened or used perfumes cannot be returned unless they are faulty.",
      },
      {
        h: "How to Return",
        p: "Step 1: Contact us through the Contact page with your order number and photos of the product and packaging. Step 2: Once approved, we will guide you on sending the parcel back. Step 3: After the returned item is received and checked, your refund or replacement is processed.",
      },
      {
        h: "Refund Method & Timing",
        p: "Refunds are issued to the original payment method used at checkout. Once the return is approved, refunds are processed within 5–7 working days. Bank or payment-provider processing time may add 1–2 more working days.",
      },
      {
        h: "Return Shipping Costs",
        p: "If the return is due to our error (damaged, faulty or wrong item), we cover the return shipping cost. For all other returns, the customer is responsible for return shipping charges.",
      },
      {
        h: "Non-Returnable Items",
        p: "For safety and hygiene, opened, used or tampered fragrance products cannot be accepted for return unless they are faulty.",
      },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    body: [
      {
        h: "Use of Our Store",
        p: "By using this store and placing an order, you agree to these terms.",
      },
      {
        h: "Brand Names & Imagery",
        p: "All product names, brand trademarks and imagery belong to their respective owners; BR NOIR is an independent retailer.",
      },
      {
        h: "Pricing & Orders",
        p: "Prices are listed in Pakistani Rupees and may change without notice. Orders are subject to availability, and we reserve the right to cancel an order and refund the payment if an item becomes unavailable.",
      },
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
      <div className="mt-8 space-y-7">
        {policy.body.map((item, i) => (
          <div key={i}>
            {item.h ? (
              <h2 className="inline-block border-b-2 border-gold pb-0.5 text-sm font-bold uppercase tracking-wider text-primary">
                {item.h}
              </h2>
            ) : null}
            <p className="mt-2 leading-relaxed text-foreground/90">{item.p}</p>
          </div>
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
