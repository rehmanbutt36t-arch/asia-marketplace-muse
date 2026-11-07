import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type CustomerReview = Database["public"]["Tables"]["customer_reviews"]["Row"];

export const customerReviewInputSchema = z.object({
  productHandle: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i),
  displayName: z.string().trim().min(1).max(80),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().trim().min(1).max(1000),
});

export type CustomerReviewInput = z.infer<typeof customerReviewInputSchema>;

const REVIEW_FIELDS = "id, product_handle, display_name, rating, review_text, created_at";

export function productReviewsQueryOptions(productHandle: string) {
  return queryOptions({
    queryKey: ["customer-reviews", productHandle],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select(REVIEW_FIELDS)
        .eq("product_handle", productHandle)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data ?? [];
    },
  });
}

export const recentReviewsQueryOptions = queryOptions({
  queryKey: ["customer-reviews", "recent"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("customer_reviews")
      .select(REVIEW_FIELDS)
      .order("created_at", { ascending: false })
      .limit(12);

    if (error) throw error;
    return data ?? [];
  },
});

export async function submitCustomerReview(input: CustomerReviewInput) {
  const review = customerReviewInputSchema.parse(input);
  const { data, error } = await supabase
    .from("customer_reviews")
    .insert({
      product_handle: review.productHandle,
      display_name: review.displayName,
      rating: review.rating,
      review_text: review.reviewText,
    })
    .select(REVIEW_FIELDS)
    .single();

  if (error) throw error;
  return data;
}