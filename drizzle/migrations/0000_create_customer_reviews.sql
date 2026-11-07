CREATE TABLE public.customer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_handle text NOT NULL CHECK (char_length(btrim(product_handle)) BETWEEN 1 AND 255),
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 80),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text text NOT NULL CHECK (char_length(btrim(review_text)) BETWEEN 1 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.customer_reviews TO anon, authenticated;
GRANT INSERT (product_handle, display_name, rating, review_text) ON public.customer_reviews TO anon, authenticated;
GRANT ALL ON public.customer_reviews TO service_role;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read customer reviews" ON public.customer_reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can submit a customer review" ON public.customer_reviews FOR INSERT TO anon, authenticated WITH CHECK (
  char_length(btrim(product_handle)) BETWEEN 1 AND 255
  AND char_length(btrim(display_name)) BETWEEN 1 AND 80
  AND rating BETWEEN 1 AND 5
  AND char_length(btrim(review_text)) BETWEEN 1 AND 1000
);