import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const POLICY_LINKS = [
  { label: "Privacy Policy", to: "/policies/$slug", params: { slug: "privacy-policy" } },
  { label: "Shipping Policy", to: "/policies/$slug", params: { slug: "shipping-policy" } },
  { label: "Refund Policy", to: "/policies/$slug", params: { slug: "refund-policy" } },
  { label: "Terms of Services", to: "/policies/$slug", params: { slug: "terms-of-service" } },
];

const EXPLORE_LINKS = [
  { label: "Shop All", to: "/shop" as const, params: undefined },
  { label: "New Arrivals", to: "/shop" as const, params: undefined },
];

export function StoreFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    toast.success("Thanks for subscribing!", {
      description: "You'll hear about our latest collections and offers.",
      position: "top-center",
    });
  };

  return (
    <footer>
      {/* Newsletter */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-4xl font-medium md:text-5xl">
            Unlock Exclusive Beauty Offers
          </h2>
          <p className="mt-4 text-sm md:text-base">
            Stay updated with our latest collections, exclusive launches, and premium offers.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-8 flex max-w-md items-center rounded-lg border border-primary-foreground/40 px-4 py-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 bg-transparent text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/70"
            />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
          {subscribed && (
            <p className="mt-3 text-sm text-primary-foreground/90">
              You're on the list — welcome to BR NOIR.
            </p>
          )}
        </div>
      </section>

      {/* Footer columns */}
      <div className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
          <div>
            <img src={logo} alt="BR NOIR" className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Thoughtfully selected essentials, delivered with care.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">Policies</h3>
            <ul className="mt-4 space-y-3">
              {POLICY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    params={link.params}
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">Explore</h3>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">Get in Touch</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-muted-foreground md:flex-row">
            <p>© 2026 My Store. All rights reserved.</p>
            <div className="flex gap-6">
              {POLICY_LINKS.slice(0, 3).map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  params={link.params}
                  className="hover:text-foreground hover:underline"
                >
                  {link.label.replace(" Policy", " policy").replace("Terms of Services", "Terms of service")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
