import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/lib/shopify";
import { ProductCard } from "@/components/store/ProductCard";

interface ShopSearch {
  collection?: string;
  q?: string;
}

const COLLECTION_LABELS: Record<string, string> = {
  mens: "Mens",
  woman: "Woman",
  unisex: "Unisex",
};

function validateSearch(search: Record<string, unknown>): ShopSearch {
  const out: ShopSearch = {};
  if (typeof search["collection"] === "string") out.collection = search["collection"];
  if (typeof search["q"] === "string") out.q = search["q"];
  return out;
}

function buildVariables(search: ShopSearch) {
  const query = search.collection ? `tag:${search.collection}` : search.q;
  return { first: 24, ...(query ? { query } : {}) };
}

export const Route = createFileRoute("/shop")({
  validateSearch,
  loader: ({ context, location }) =>
    context.queryClient.ensureQueryData(
      productsQueryOptions(buildVariables(validateSearch(location.search))),
    ),
  head: () => ({
    meta: [
      { title: "Shop — BR NOIR Luxury Perfumes" },
      {
        name: "description",
        content:
          "Browse the full BR NOIR fragrance collection — premium EDPs for men and women with fast delivery across Pakistan.",
      },
      { property: "og:title", content: "Shop — BR NOIR Luxury Perfumes" },
      {
        property: "og:description",
        content: "Browse the full BR NOIR fragrance collection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const { data: products } = useSuspenseQuery(
    productsQueryOptions(buildVariables(search)),
  );

  const heading = search.collection
    ? (COLLECTION_LABELS[search.collection] ?? "Shop")
    : "Shop All";

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl font-medium md:text-4xl">{heading}</h1>
      {products.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No products found</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {products.map((edge) => (
            <ProductCard key={edge.node.id} product={edge.node} />
          ))}
        </div>
      )}
      <p className="mt-10 text-sm text-muted-foreground">
        Looking for something specific?{" "}
        <Link to="/contact" className="underline">
          Contact us
        </Link>{" "}
        and we'll help you find it.
      </p>
    </main>
  );
}
