import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Loader2,
  ShoppingBag,
  Droplet,
  Gem,
  FlaskConical,
  Package,
  ShieldCheck,
  Headphones,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import {
  formatMoney,
  productQueryOptions,
  productsQueryOptions,
  type ShopifyProduct,
  type ShopifyVariant,
} from "@/lib/shopify";
import { getProductDetails } from "@/lib/productDetails";
import { useCartStore } from "@/stores/cartStore";
import { useCartDrawer } from "@/components/store/cartDrawerState";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import qualitySeal from "@/assets/quality-seal.png";

export const Route = createFileRoute("/product/$handle")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(productQueryOptions(params.handle)),
  head: ({ loaderData }) => {
    const product = loaderData;
    const image = product?.images?.edges?.[0]?.node?.url;
    return {
      meta: [
        {
          title: product ? `${product.title} — BR NOIR` : "Product — BR NOIR",
        },
        ...(product?.description
          ? [{ name: "description", content: product.description.slice(0, 160) }]
          : []),
        ...(product ? [{ property: "og:title", content: product.title }] : []),
        ...(product?.description
          ? [
              {
                property: "og:description",
                content: product.description.slice(0, 160),
              },
            ]
          : []),
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: ProductPage,
});

// TODO: replace with the real WhatsApp business number.
const WHATSAPP_NUMBER = "923001234567";

const REVIEWS = [
  {
    avatar: avatar1,
    name: "Ali Raza",
    text: "Absolutely amazing fragrance! Fresh and lasts long.",
  },
  {
    avatar: avatar2,
    name: "Hamza Khan",
    text: "Best perfume at this price. Highly recommended!",
  },
  {
    avatar: avatar3,
    name: "Usman Sheikh",
    text: "Superb quality and fast delivery. Will order again!",
  },
];

const TRUST_POINTS = [
  "Real product photographs",
  "Sealed & premium packing",
  "Genuine customer reviews",
  "Transparent delivery information",
  "Clear return & exchange policy",
  "WhatsApp support",
];

const FAQS = [
  {
    q: "How long does the fragrance last?",
    a: "Our premium oil concentration keeps the scent noticeable for 8–12 hours, depending on skin type and weather.",
  },
  {
    q: "What is the oil concentration?",
    a: "Every perfume carries a high 40% fragrance oil concentration — properly matured for a rich, long-lasting scent.",
  },
  {
    q: "Do you offer nationwide delivery?",
    a: "Yes! We deliver all over Pakistan with Cash on Delivery. Orders over Rs 5,000 ship free.",
  },
  {
    q: "Can I return the product?",
    a: "Absolutely — we offer a 7-day easy return and exchange policy on unopened products.",
  },
  {
    q: "Are these original branded perfumes?",
    a: "These are inspired fragrances — not the original branded perfumes — crafted with premium quality oils and sealed packing.",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.13.17 1.73 2.64 4.2 3.71.59.25 1.04.4 1.4.52.59.18 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

function SectionHeading({
  num,
  title,
  align = "center",
}: {
  num: string;
  title: string;
  align?: "left" | "center";
}) {
  const heading = (
    <h2 className="font-display text-2xl font-semibold md:text-3xl">
      <span className="mr-2">{num}.</span>
      {title}
    </h2>
  );
  if (align === "left") {
    return (
      <div className="mb-8 flex items-center gap-5">
        {heading}
        <span className="h-px w-20 bg-gold md:w-28" />
      </div>
    );
  }
  return (
    <div className="mb-8 flex flex-col items-center gap-2">
      {heading}
      <span className="h-px w-24 bg-gold md:w-32" />
    </div>
  );
}

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQueryOptions(handle));
  if (!product) throw notFound();
  return <ProductContent product={product} />;
}

function ProductContent({ product }: { product: NonNullable<ShopifyProduct> }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const setDrawerOpen = useCartDrawer((s) => s.setOpen);

  const details = getProductDetails(product.title);
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0]?.id ?? "",
  );
  const [activeImage, setActiveImage] = useState(0);
  const [openFaqs, setOpenFaqs] = useState<number[]>([0, 1]);

  const selectedVariant: ShopifyVariant | undefined =
    variants.find((v) => v.id === selectedVariantId) ?? variants[0];

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const images = product.images.edges.map((e) => e.node);
  const mainImage = images[activeImage] ?? images[0];
  const detailImage = images[1] ?? images[0];

  const { data: allEdges } = useQuery(productsQueryOptions({ first: 20 }));
  const related = (allEdges ?? [])
    .filter((e) => e.node.id !== product.id)
    .slice(0, 4)
    .map((e) => e.node);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Assalam o Alaikum! Mujhe "${product.title}" (${details.size}) order karna hai — ${formatMoney(price)}.`,
  )}`;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: {
        amount: selectedVariant.price.amount,
        currencyCode: selectedVariant.price.currencyCode,
      },
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { position: "top-center" });
    setDrawerOpen(true);
  };

  const hasOptionChoice = product.options.some((o) => o.values.length > 1);
  const sizeLabel = details.size.split(" ")[0];

  return (
    <main className="pb-4">
      {/* ===== Hero: gallery + buy box ===== */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-2 md:py-12">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-3 md:flex-row">
          <div className="flex gap-2 overflow-x-auto pb-1 md:w-20 md:flex-shrink-0 md:flex-col md:overflow-visible md:pb-0">
            {images.map((img, i) => (
              <button
                key={img.url}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-secondary transition-colors md:h-20 md:w-20 ${
                  i === activeImage ? "border-foreground" : "border-border"
                }`}
              >
                <img
                  src={img.url}
                  alt={img.altText ?? product.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
          <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl bg-secondary md:aspect-auto">
            {mainImage && (
              <img
                src={mainImage.url}
                alt={mainImage.altText ?? product.title}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute left-4 top-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-gold to-primary shadow-lg">
              <div className="flex h-[4.25rem] w-[4.25rem] flex-col items-center justify-center rounded-full border border-gold/50 bg-foreground/90 text-center">
                <span className="text-[9px] font-bold tracking-[0.2em] text-gold">
                  BEST
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-gold">
                  SELLER
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-full bg-gold/25 px-4 py-1.5 text-sm font-semibold">
            {product.title}
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            {product.title}
          </h1>
          <p className="mt-2 font-display text-xl italic text-foreground/85">
            {details.tagline}
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold md:text-4xl">
              {formatMoney(price)}
            </span>
            <span className="border-l border-border pl-3 text-sm text-muted-foreground">
              {details.size}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Droplet, label: "40%", sub: "Oil Concentration" },
              { icon: Gem, label: "A+ Quality", sub: "Fragrance Oil" },
              { icon: FlaskConical, label: "Proper", sub: "Maturation" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={sub}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3"
              >
                <Icon className="h-6 w-6 flex-shrink-0 text-primary" strokeWidth={1.5} />
                <div className="leading-tight">
                  <p className="text-sm font-bold">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <p className="font-display text-lg font-semibold">
              Why You&rsquo;ll Love It?
            </p>
            <ul className="mt-3 space-y-2">
              {details.whyLove.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {hasOptionChoice && (
            <div className="mt-5 space-y-3">
              {product.options
                .filter((o) => o.values.length > 1)
                .map((option) => (
                  <div key={option.name}>
                    <p className="mb-2 text-sm font-semibold">{option.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const match = variants.find((v) =>
                          v.selectedOptions.some(
                            (so) => so.name === option.name && so.value === value,
                          ),
                        );
                        const active = selectedVariant === match;
                        return (
                          <button
                            key={value}
                            onClick={() => match && setSelectedVariantId(match.id)}
                            className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                              active
                                ? "border-foreground bg-foreground text-background"
                                : "border-border bg-background hover:bg-accent"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant?.availableForSale}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-button px-4 py-3.5 text-base font-semibold text-button-foreground transition-colors hover:bg-button/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </>
            )}
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-foreground/25 bg-background px-4 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Order via WhatsApp
          </a>

          <div className="mt-5 flex items-center justify-between px-1 text-xs">
            {[
              { icon: ShieldCheck, label: "Secure Checkout" },
              { icon: Headphones, label: "Customer Support" },
              { icon: RotateCcw, label: "Easy Returns" },
            ].map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 ${
                  i > 0 ? "border-l border-border pl-3" : ""
                }`}
              >
                <Icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 01. Fragrance Details ===== */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading num="01" title="Fragrance Details" align="left" />
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="space-y-3">
              {[
                ["Fragrance Family", details.family],
                ["Top Notes", details.topNotes],
                ["Heart Notes", details.heartNotes],
                ["Base Notes", details.baseNotes],
                ["Best For", details.bestFor],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3 text-[15px]">
                  <span className="w-36 flex-shrink-0 font-bold md:w-44">{label}</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-foreground/90">{value}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 font-display text-lg italic text-foreground/80">
              {details.closingLine}
            </p>
          </div>
          {detailImage && (
            <img
              src={detailImage.url}
              alt={`${product.title} detail`}
              className="h-64 w-full rounded-xl object-cover md:h-72"
              loading="lazy"
            />
          )}
        </div>
      </section>

      {/* ===== 02. What Makes BR NOIR Different? ===== */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading num="02" title="What Makes BR NOIR Different?" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            {
              icon: Droplet,
              label: `${sizeLabel} Concentration`,
              sub: "Clearly displayed oil concentration.",
            },
            {
              icon: Gem,
              label: "A+ Quality",
              sub: "Premium fragrance ingredients.",
            },
            {
              icon: FlaskConical,
              label: "Proper Maturation",
              sub: "Carefully prepared for longer lasting scent.",
            },
            {
              icon: Package,
              label: `${sizeLabel} Bottle`,
              sub: "Just the right size for everyday use.",
            },
          ].map(({ icon: Icon, label, sub }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-2 text-center ${
                i > 0 ? "md:border-l md:border-border" : ""
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="font-semibold">{label}</p>
              <p className="max-w-44 text-sm text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 03. Build Customer Trust ===== */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading num="03" title="Build Customer Trust" align="left" />
        <div className="grid gap-4 md:grid-cols-3">
          {mainImage && (
            <img
              src={mainImage.url}
              alt={product.title}
              className="h-64 w-full rounded-xl object-cover md:h-full"
              loading="lazy"
            />
          )}
          <div className="rounded-xl border border-border bg-card p-6">
            <ul className="space-y-3">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl bg-secondary p-6 text-center">
            <p className="font-display text-2xl font-semibold">Our Promise</p>
            <p className="mt-2 text-[15px] text-foreground/85">
              No quality compromise.
              <br />
              Only the best for you.
            </p>
            <img
              src={qualitySeal}
              alt="100% Quality"
              width={816}
              height={816}
              className="mt-5 h-32 w-32 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== 04. What Our Customers Say ===== */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading num="04" title="What Our Customers Say" />
        <div className="grid gap-4 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-gold">★★★★★</p>
              <div className="mt-3 flex items-start gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  width={816}
                  height={816}
                  className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-[15px] leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="mt-2 text-sm font-semibold">— {review.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 05. Frequently Asked Questions ===== */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading num="05" title="Frequently Asked Questions" />
        <div className="grid gap-3 md:grid-cols-2">
          {FAQS.map((faq, i) => {
            const open = openFaqs.includes(i);
            return (
              <div key={faq.q} className="rounded-lg border border-border bg-card">
                <button
                  onClick={() =>
                    setOpenFaqs((prev) =>
                      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
                    )
                  }
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium"
                  aria-expanded={open}
                >
                  {faq.q}
                  <span className="text-lg leading-none">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <p className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== 06. More From BR NOIR ===== */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <SectionHeading num="06" title="More From BR NOIR" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.id}
                to="/product/$handle"
                params={{ handle: item.handle }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-accent"
              >
                {item.images.edges[0]?.node && (
                  <img
                    src={item.images.edges[0].node.url}
                    alt={item.title}
                    className="h-16 w-16 flex-shrink-0 rounded-lg bg-secondary object-cover"
                    loading="lazy"
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatMoney(item.priceRange.minVariantPrice)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
