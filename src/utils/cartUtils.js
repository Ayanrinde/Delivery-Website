/**
 * Get total item count in cart
 * @param {CartItem[]} cart
 * @returns {number}
 */
export const getCartCount = (cart) =>
  cart.reduce((sum, item) => sum + item.qty, 0);

/**
 * Get subtotal (items only, no delivery)
 * @param {CartItem[]} cart
 * @returns {number}
 */
export const getCartSubtotal = (cart) =>
  cart.reduce((sum, item) => sum + item.price * item.qty, 0);

/**
 * Get cart items belonging to a specific vendor
 * @param {CartItem[]} cart
 * @param {number} vendorId
 * @returns {CartItem[]}
 */
export const getVendorCart = (cart, vendorId) =>
  cart.filter((item) => item.vendorId === vendorId);

/**
 * Calculate full order total (subtotal + delivery - discount)
 * @param {number} subtotal
 * @param {number} deliveryFee
 * @param {number} discount
 * @returns {number}
 */
export const calculateTotal = (subtotal, deliveryFee, discount = 0) =>
  subtotal + deliveryFee - discount;

/**
 * Apply a coupon object to a subtotal
 * @param {number} subtotal
 * @param {{ discount: number }} coupon  discount is a fraction e.g. 0.10 = 10%
 * @returns {number}  discount amount in naira
 */
export const applyCoupon = (subtotal, coupon) =>
  Math.floor(subtotal * (coupon?.discount ?? 0));

/**
 * Build a new cart item from a menu item + vendor meta
 * @param {MenuItem} item
 * @param {Vendor}   vendor
 * @param {number}   qty
 * @returns {CartItem}
 */
export const buildCartItem = (item, vendor, qty = 1) => ({
  ...item,
  qty,
  vendorId:   vendor.id,
  vendorName: vendor.name,
});

/**
 * Increment qty of an existing item, or add new
 * @param {CartItem[]} cart
 * @param {CartItem}   newItem
 * @returns {CartItem[]}
 */
export const upsertCartItem = (cart, newItem) => {
  const exists = cart.find((c) => c.id === newItem.id);
  if (exists) {
    return cart.map((c) =>
      c.id === newItem.id ? { ...c, qty: c.qty + newItem.qty } : c
    );
  }
  return [...cart, newItem];
};

/**
 * Adjust qty of a cart item by delta; remove if qty reaches 0
 * @param {CartItem[]} cart
 * @param {number}     itemId
 * @param {number}     delta   e.g. +1 or -1
 * @returns {CartItem[]}
 */
export const adjustCartItem = (cart, itemId, delta) =>
  cart
    .map((c) => (c.id === itemId ? { ...c, qty: c.qty + delta } : c))
    .filter((c) => c.qty > 0);
