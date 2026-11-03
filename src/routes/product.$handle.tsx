import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Minus, Plus, Loader2, HandCoins, RotateCcw, Truck, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import {
  formatMoney,
  productQueryOptions,
  type ShopifyVariant,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useCartDrawer } from "@/components/store/cartDrawerState";

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

// Renders the emoji-structured Shopify description as clean A-to-Z sections.
function DescriptionBlocks({ text }: { text: string }) {
  const sections = text
    .split(/(?=[📌🌸⏳🧴🎁🚚💰🔁✅]|Order now)/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sections.length <= 1) {
    return (
      <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground/90">
        {text}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="font-display text-xl font-semibold leading-snug">
        {sections[0]}
      </h2>
      {sections.slice(1).map((section, i) => {
        if (section.startsWith("Order now")) {
          return (
            <p key={i} className="pt-1 font-semibold text-[15px]">
              {section}
            </p>
          );
        }
        const first = [...section][0]!;
        const body = Array.from(section).slice(1).join("").trim();
        if (first === "🌸") {
          const parts = body.split("•").map((s) => s.trim()).filter(Boolean);
          return (
            <div key={i}>
              <p className="font-semibold text-[15px]">{first} {parts[0]}</p>
              <ul className="mt-1.5 space-y-1">
                {parts.slice(1).map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-[15px] leading-relaxed text-foreground/90"
                  >
                    <span className="text-primary">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return (
          <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
            <span className="font-medium">{first}</span> {body}
          </p>
        );
      })}
    </div>
  );
}

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQueryOptions(handle));
  if (!product) throw notFound();

  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const getCheckoutUrl = useCartStore((state) => state.getCheckoutUrl);
  const setDrawerOpen = useCartDrawer((s) => s.setOpen);

  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0]?.id ?? "",
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant: ShopifyVariant | undefined =
    variants.find((v) => v.id === selectedVariantId) ?? variants[0];

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = selectedVariant?.compareAtPrice;
  const image = product.images.edges[0]?.node;

  const cartPayload = () => ({
    product,
    variantId: selectedVariant!.id,
    variantTitle: selectedVariant!.title,
    price: {
      amount: selectedVariant!.price.amount,
      currencyCode: selectedVariant!.price.currencyCode,
    },
    quantity,
    selectedOptions: selectedVariant!.selectedOptions || [],
  });

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem(cartPayload());
    toast.success("Added to cart", { position: "top-center" });
    setDrawerOpen(true);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    await addItem(cartPayload());
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) window.open(checkoutUrl, "_blank");
  };

  const hasOptionChoice = product.options.some((o) => o.values.length > 1);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-secondary">
          {image && (
            <img
              src={image.url}
              alt={image.altText ?? product.title}
              className="aspect-square w-full object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="font-display text-3xl font-medium md:text-4xl">
            {product.title}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-xl font-semibold">{formatMoney(price)}</span>
            {compareAt && Number(compareAt.amount) > Number(price.amount) && (
              <span className="text-lg text-sale line-through">
                {formatMoney(compareAt)}
              </span>
            )}
          </div>

          {hasOptionChoice && product.options.length > 0 && (
            <div className="mt-6 space-y-4">
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

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">Quantity</p>
            <div className="inline-flex items-center rounded-md border border-border">
              <button
                aria-label="Decrease quantity"
                className="px-3 py-2"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                aria-label="Increase quantity"
                className="px-3 py-2"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-button px-4 py-3 text-sm font-medium text-button-foreground transition-colors hover:bg-button/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Add to cart"
              )}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isLoading || !selectedVariant?.availableForSale}
              className="flex-1 rounded-md border border-foreground/30 bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
            >
              Buy it now
            </button>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            {selectedVariant?.availableForSale
              ? "In stock — ready to ship"
              : "Currently out of stock"}
          </p>

          <p className="mt-4 rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground/80">
            ℹ️ <strong>Inspired fragrance:</strong> this is an inspired
            perfume, not the original branded product — premium quality with
            sealed packing, delivered all over Pakistan.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-border bg-card p-4 sm:grid-cols-4">
            {[
              { icon: HandCoins, label: "Cash on Delivery" },
              { icon: Truck, label: "Delivery All Over Pakistan" },
              { icon: BadgeCheck, label: "Premium Quality & Sealed" },
              { icon: RotateCcw, label: "7-Day Easy Returns" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <span className="text-xs font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {product.description && (
            <div className="mt-8 border-t border-border pt-6">
              <DescriptionBlocks text={product.description} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
