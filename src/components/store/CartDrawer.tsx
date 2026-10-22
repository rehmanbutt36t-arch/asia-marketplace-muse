import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useCartDrawer } from "@/components/store/cartDrawerState";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";

export function CartDrawer() {
  const open = useCartDrawer((s) => s.open);
  const setOpen = useCartDrawer((s) => s.setOpen);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0,
  );
  const currency = items[0]?.price.currencyCode ?? "PKR";

  // Sync cart with Shopify when the drawer opens (catches edge cases)
  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-foreground/40"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside className="absolute right-0 top-0 flex h-full w-full flex-col bg-background shadow-xl sm:max-w-md">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl font-semibold">Cart</h2>
          <button
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="hidden" />
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        <p className="px-5 pt-3 text-sm text-muted-foreground">
          {totalItems === 0
            ? "Your cart is empty"
            : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
        </p>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 py-2">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                      {item.product.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.images.edges[0].node.url}
                          alt={item.product.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/product/$handle"
                        params={{ handle: item.product.handle }}
                        onClick={() => setOpen(false)}
                        className="line-clamp-2 text-sm font-medium hover:underline"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.selectedOptions
                          .filter((o) => o.name !== "Title")
                          .map((o) => o.value)
                          .join(" • ")}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        {formatMoney({ amount: item.price.amount, currencyCode: item.price.currencyCode })}
                      </p>
                      <div className="mt-2 inline-flex items-center rounded-md border border-border">
                        <button
                          aria-label="Decrease quantity"
                          className="px-2 py-1"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          className="px-2 py-1"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-end gap-2">
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(item.variantId)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-border bg-background px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Estimated total</span>
                <span className="text-xl font-bold">
                  {formatMoney({ amount: String(totalPrice), currencyCode: currency })}
                </span>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Taxes and shipping calculated at checkout
              </p>
              <button
                onClick={handleCheckout}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-button px-4 py-3 text-sm font-medium text-button-foreground transition-colors hover:bg-button/90 disabled:pointer-events-none disabled:opacity-50"
                disabled={items.length === 0 || isLoading || isSyncing}
              >
                {isLoading || isSyncing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4" />
                    Checkout with Shopify
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
