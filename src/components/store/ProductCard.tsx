import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney, type ShopifyProductEdge } from "@/lib/shopify";
import { useCartDrawer } from "@/components/store/cartDrawerState";

export function ProductCard({ product }: { product: ShopifyProductEdge["node"] }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const setOpen = useCartDrawer((s) => s.setOpen);

  const selectedVariant = product.variants.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const image = product.images.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: { amount: selectedVariant.price.amount, currencyCode: selectedVariant.price.currencyCode },
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { position: "top-center" });
    setOpen(true);
  };

  return (
    <div className="group flex flex-col">
      <Link
        to="/product/$handle"
        params={{ handle: product.handle }}
        className="block overflow-hidden rounded-xl bg-secondary"
      >
        {image && (
          <img
            src={image.url}
            alt={image.altText ?? product.title}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
      </Link>
      <Link to="/product/$handle" params={{ handle: product.handle }} className="mt-3">
        <h3 className="text-[15px] leading-snug text-foreground hover:underline">
          {product.title}
        </h3>
      </Link>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[15px]">{formatMoney(price)}</span>
        {compareAt && Number(compareAt.amount) > Number(price.amount) && (
          <span className="text-sm text-sale line-through">{formatMoney(compareAt)}</span>
        )}
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isLoading || !selectedVariant}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-button px-4 py-3 text-sm font-medium text-button-foreground transition-colors hover:bg-button/90 disabled:pointer-events-none disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to cart"}
      </button>
    </div>
  );
}
