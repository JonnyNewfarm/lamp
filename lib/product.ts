export const PRODUCT = {
  id: "lamp-001",
  name: "Calero - Desk Lamp",
  description: "Calm, focused light for desk work.",
  prices: {
    usd: 9900,
    eur: 8900, 
    gbp: 8900, 
    nok: 109900, 
  },
  supplierUrl: "https://www.aliexpress.com/item/XXXX.html",
} as const;

export type SupportedCurrency = keyof typeof PRODUCT.prices;