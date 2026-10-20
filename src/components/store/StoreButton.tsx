import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

// Store-specific buttons styled with semantic tokens:
// - variant "dark": the charcoal Dawn-style button ("Add to cart", "View all")
// - variant "outline": bordered transparent button
export function StoreButton({
  variant = "dark",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "dark" | "outline";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variant === "dark" &&
          "bg-button text-button-foreground hover:bg-button/90",
        variant === "outline" &&
          "border border-foreground/20 bg-background text-foreground hover:bg-accent",
        className,
      )}
      {...props}
    />
  );
}
