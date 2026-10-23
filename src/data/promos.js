// Available promo codes and how they change the order totals.
// Extend PROMO_CODES / the helpers to add new codes.

export const PROMO_CODES = {
  SAVE10: '10% off your order',
  FREESHIP: 'Free shipping',
}

export function isValidPromo(code) {
  return code in PROMO_CODES
}

// Amount knocked off the subtotal (SAVE10 = 10%)
export function promoDiscount(code, subtotal) {
  return code === 'SAVE10' ? subtotal * 0.1 : 0
}

// Shipping after the promo (FREESHIP makes it free)
export function promoShipping(code, shipping) {
  return code === 'FREESHIP' ? 0 : shipping
}
