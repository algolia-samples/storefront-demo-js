/**
 * @param {number} price
 * @param {string} currency
 */
export function formatPrice(price, currency) {
  return price.toLocaleString("en-US", { style: "currency", currency });
}
