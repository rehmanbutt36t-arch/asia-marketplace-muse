// Per-product fragrance details shown on the product page.
// Matched by keyword against the Shopify product title, with a generic fallback.

export interface ProductFragranceDetails {
  tagline: string;
  size: string;
  whyLove: string[];
  family: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  bestFor: string;
  closingLine: string;
}

const DETAILS: Array<{
  keywords: string[];
  exclude?: string[];
  details: ProductFragranceDetails;
}> = [
  {
    keywords: ["havoc"],
    details: {
      tagline: "Fresh. Clean. Irresistible.",
      size: "50ML Eau de Parfum",
      whyLove: [
        "Fresh and clean fragrance",
        "Long-lasting performance",
        "Perfect for daily wear",
        "A premium scent at great value",
      ],
      family: "Fresh Aquatic",
      topNotes: "Bergamot, Lavender",
      heartNotes: "Geranium, Woody Notes",
      baseNotes: "Amber, Musk",
      bestFor: "Daily Wear, Office, University",
      closingLine: "A fresh scent that keeps you confident all day.",
    },
  },
  {
    keywords: ["wanted"],
    details: {
      tagline: "Daring. Intense. Made to Win.",
      size: "50ML Eau de Parfum",
      whyLove: [
        "Bold and energizing scent",
        "Long-lasting projection",
        "Perfect for nights out and events",
        "A statement fragrance at great value",
      ],
      family: "Aromatic Fougère",
      topNotes: "Lemon, Ginger, Lavender",
      heartNotes: "Cardamom, Vetiver",
      baseNotes: "Tonka Bean, Amberwood",
      bestFor: "Evenings, Parties, Special Events",
      closingLine: "A magnetic scent made for men who go after what they want.",
    },
  },
  {
    keywords: ["azzaro"],
    details: {
      tagline: "Charismatic. Magnetic. Unstoppable.",
      size: "50ML Eau de Parfum",
      whyLove: [
        "Warm and charismatic scent",
        "All-day lasting power",
        "Perfect for office and casual wear",
        "A premium scent at great value",
      ],
      family: "Aromatic Woody",
      topNotes: "Bergamot, Black Pepper",
      heartNotes: "Lavender, Cedarwood",
      baseNotes: "Vanilla, Amber",
      bestFor: "Daily Wear, Office, Meetings",
      closingLine: "A confident scent that leaves a lasting impression.",
    },
  },
  {
    keywords: ["gucci", "flora"],
    details: {
      tagline: "Blooming. Elegant. Pure Charm.",
      size: "50ML Eau de Parfum",
      whyLove: [
        "Soft and feminine floral scent",
        "Elegant, long-lasting bloom",
        "Perfect for daily and festive wear",
        "A luxury feel at a great value",
      ],
      family: "Floral",
      topNotes: "Pear, Red Berries",
      heartNotes: "Gardenia, Frangipani",
      baseNotes: "Patchouli, Brown Sugar",
      bestFor: "Daily Wear, Parties, Gifting",
      closingLine: "A graceful floral that turns every moment special.",
    },
  },
  {
    keywords: ["dunhill", "desire"],
    details: {
      tagline: "Warm. Seductive. Confident.",
      size: "50ML Eau de Parfum",
      whyLove: [
        "Rich and seductive scent",
        "Deep, long-lasting warmth",
        "Perfect for evenings and winter",
        "A premium scent at great value",
      ],
      family: "Amber Woody",
      topNotes: "Apple, Lemon, Neroli",
      heartNotes: "Rose, Teak Wood",
      baseNotes: "Tonka Bean, Amber, Musk",
      bestFor: "Evenings, Dinners, Winter Days",
      closingLine: "A warm scent that draws people closer.",
    },
  },
  {
    keywords: ["janan", "sports"],
    details: {
      tagline: "Energetic. Fresh. Everyday Ready.",
      size: "30ML Eau de Parfum",
      whyLove: [
        "Fresh and sporty fragrance",
        "Light yet long-lasting",
        "Perfect for gym, college and daily use",
        "Easy on the pocket, big on quality",
      ],
      family: "Fresh Aromatic",
      topNotes: "Citrus, Mint",
      heartNotes: "Lavender, Jasmine",
      baseNotes: "Musk, Woods",
      bestFor: "Gym, College, Daily Wear",
      closingLine: "A fresh boost of energy for every day.",
    },
  },
  {
    keywords: ["creed"],
    details: {
      tagline: "Legendary. Powerful. Timeless.",
      size: "50ML Eau de Parfum",
      whyLove: [
        "Iconic, royal fragrance",
        "Powerful long-lasting sillage",
        "Perfect for special occasions",
        "A luxury signature at great value",
      ],
      family: "Fruity Woody",
      topNotes: "Pineapple, Bergamot, Blackcurrant",
      heartNotes: "Birch, Patchouli",
      baseNotes: "Oakmoss, Musk, Ambergris",
      bestFor: "Special Occasions, Events, Gifting",
      closingLine: "A legendary scent fit for kings.",
    },
  },
  {
    keywords: ["valentino"],
    details: {
      tagline: "Romantic. Edgy. Born to Shine.",
      size: "50ML Eau de Parfum",
      whyLove: [
        "Modern romantic scent",
        "Elegant yet long-lasting",
        "Perfect for dates and evenings",
        "A designer feel at great value",
      ],
      family: "Woody Floral",
      topNotes: "Bergamot, Blackcurrant",
      heartNotes: "Jasmine, Iris",
      baseNotes: "Vanilla, Woody Notes",
      bestFor: "Dates, Evenings, Parties",
      closingLine: "An edgy romance in every spray.",
    },
  },
  {
    keywords: ["ysl", "myself", "my slf"],
    details: {
      tagline: "Bold. Modern. Unmistakably You.",
      size: "50ML Eau de Parfum",
      whyLove: [
        "Modern woody floral scent",
        "Clean, long-lasting performance",
        "Perfect for office and daily wear",
        "A premium scent at great value",
      ],
      family: "Woody Floral",
      topNotes: "Ginger, Bergamot",
      heartNotes: "Sage, Amberwood",
      baseNotes: "Vanilla, Woods",
      bestFor: "Office, Daily Wear, University",
      closingLine: "A scent that says who you are without a word.",
    },
  },
];

const FALLBACK: ProductFragranceDetails = {
  tagline: "Premium. Lasting. Made for You.",
  size: "50ML Eau de Parfum",
  whyLove: [
    "Premium quality fragrance",
    "Long-lasting performance",
    "Perfect for daily wear",
    "A luxury feel at a great value",
  ],
  family: "Woody Aromatic",
  topNotes: "Bergamot, Citrus",
  heartNotes: "Lavender, Jasmine",
  baseNotes: "Amber, Musk",
  bestFor: "Daily Wear, Office, Events",
  closingLine: "A signature scent made to be remembered.",
};

export function getProductDetails(title: string): ProductFragranceDetails {
  const t = title.toLowerCase();
  for (const entry of DETAILS) {
    if (entry.exclude?.some((k) => t.includes(k))) continue;
    if (entry.keywords.some((k) => t.includes(k))) return entry.details;
  }
  return FALLBACK;
}
