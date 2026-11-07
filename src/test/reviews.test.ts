import { describe, expect, it } from "vitest";
import { customerReviewInputSchema } from "@/lib/reviews";

describe("customer review validation", () => {
  const validReview = {
    productHandle: "gucci-flora-gardenia-50ml",
    displayName: "Ayesha",
    rating: 5,
    reviewText: "The fragrance arrived safely and smells lovely.",
  };

  it("accepts a real product review with a whole-star rating from one to five", () => {
    expect(customerReviewInputSchema.safeParse(validReview).success).toBe(true);
  });

  it("rejects ratings outside the one-to-five star range", () => {
    expect(customerReviewInputSchema.safeParse({ ...validReview, rating: 6 }).success).toBe(false);
    expect(customerReviewInputSchema.safeParse({ ...validReview, rating: 0 }).success).toBe(false);
  });

  it("limits names to 80 characters and review text to 1000 characters", () => {
    expect(customerReviewInputSchema.safeParse({ ...validReview, displayName: "a".repeat(81) }).success).toBe(false);
    expect(customerReviewInputSchema.safeParse({ ...validReview, reviewText: "a".repeat(1001) }).success).toBe(false);
  });

  it("rejects blank text and malformed product handles", () => {
    expect(customerReviewInputSchema.safeParse({ ...validReview, reviewText: "   " }).success).toBe(false);
    expect(customerReviewInputSchema.safeParse({ ...validReview, productHandle: "gucci flora" }).success).toBe(false);
  });
});