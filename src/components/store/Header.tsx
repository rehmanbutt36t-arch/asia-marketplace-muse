import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag, ChevronLeft, ChevronRight, X, Menu } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useCartDrawer } from "@/components/store/cartDrawerState";
import logo from "@/assets/logo.png";

function NavLinks({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const linkCls = `text-[15px] text-foreground hover:opacity-80 [&.active]:underline [&.active]:underline-offset-4 ${className}`;
  return (
    <>
      <Link to="/" activeProps={{ className: "active" }} onClick={onNavigate} className={linkCls}>
        Home
      </Link>
      <Link to="/shop" activeProps={{ className: "active" }} onClick={onNavigate} className={linkCls}>
        Shop All
      </Link>
      <Link
        to="/shop"
        search={{ collection: "mens" }}
        activeOptions={{ exact: false }}
        onClick={onNavigate}
        className={linkCls}
      >
        Mens
      </Link>
      <Link to="/shop" search={{ collection: "woman" }} onClick={onNavigate} className={linkCls}>
        Woman
      </Link>
      <Link to="/shop" search={{ collection: "unisex" }} onClick={onNavigate} className={linkCls}>
        Unisex
      </Link>
      <Link to="/contact" activeProps={{ className: "active" }} onClick={onNavigate} className={linkCls}>
        Contact
      </Link>
    </>
  );
}

export function Header() {
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const setOpen = useCartDrawer((s) => s.setOpen);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate({
      to: "/shop",
      search: searchTerm ? { q: searchTerm } : {},
    });
    setSearchTerm("");
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="relative bg-primary py-2 text-primary-foreground">
        <span
          aria-hidden
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
        >
          <ChevronLeft className="h-4 w-4" />
        </span>
        <p className="text-center font-display text-sm font-semibold tracking-wide">
          Your Favorites Are Just A Click Away
        </p>
        <span
          aria-hidden
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
        >
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center" aria-label="BR NOIR home">
            <img src={logo} alt="BR NOIR" className="h-12 w-auto" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="text-foreground hover:opacity-70"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              aria-label="Account"
              className="hidden text-foreground hover:opacity-70 sm:block"
            >
              <User className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              aria-label="Open cart"
              onClick={() => setOpen(true)}
              className="relative text-foreground hover:opacity-70"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-4 py-3 md:hidden">
          <NavLinks className="text-sm" />
        </nav>

        {/* Search panel */}
        {searchOpen && (
          <div className="border-t border-border bg-background px-4 py-3">
            <form
              onSubmit={submitSearch}
              className="mx-auto flex max-w-xl items-center gap-2"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products…"
                className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}
