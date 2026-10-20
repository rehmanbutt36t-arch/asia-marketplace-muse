import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import logo from "@/assets/logo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop All", to: "/shop" },
  { label: "Mens", to: "/shop", search: { collection: "mens", q: undefined } },
  { label: "Woman", to: "/shop", search: { collection: "woman", q: undefined } },
  { label: "Unisex", to: "/shop", search: { collection: "unisex", q: undefined } },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartStore.getState;
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate({ to: "/shop", search: { q: searchTerm || undefined, collection: undefined } });
    setSearchTerm("");
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="relative bg-primary py-2 text-primary-foreground">
        <button
          aria-label="Previous announcement"
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
          tabIndex={-1}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-center font-display text-sm font-semibold tracking-wide">
          Your Favorites Are Just A Click Away
        </p>
        <button
          aria-label="Next announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
          tabIndex={-1}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center" aria-label="BR NOIR home">
            <img src={logo} alt="BR NOIR" className="h-12 w-auto" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                search={"search" in link ? link.search : undefined}
                className="text-[15px] text-foreground hover:text-foreground [&.active]:underline [&.active]:underline-offset-4"
                activeProps={{ className: "active" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="text-foreground hover:opacity-70"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button aria-label="Account" className="text-foreground hover:opacity-70">
              <User className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              aria-label="Cart"
              onClick={() => openCart().setState({} as never) /* replaced below */}
              className="hidden"
            />
            <CartButton count={totalItems} />
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex flex-wrap items-center gap-4 border-t border-border px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              search={"search" in link ? link.search : undefined}
              className="text-sm text-foreground [&.active]:underline"
              activeProps={{ className: "active" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search panel */}
        {searchOpen && (
          <div className="border-t border-border bg-background px-4 py-3">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-xl items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products…"
                className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
              />
              <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}

// Cart icon with item-count badge; opens the cart drawer via the store flag.
import { useCartDrawer } from "@/components/store/cartDrawerState";

function CartButton({ count }: { count: number }) {
  const setOpen = useCartDrawer((s) => s.setOpen);
  return (
    <button
      aria-label="Open cart"
      onClick={() => setOpen(true)}
      className="relative text-foreground hover:opacity-70"
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {count}
        </span>
      )}
    </button>
  );
}
