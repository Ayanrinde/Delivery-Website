import { createContext, useContext, useState, useCallback } from 'react';
import {
  upsertCartItem,
  adjustCartItem,
  buildCartItem,
  getCartCount,
  getCartSubtotal,
  getVendorCart,
} from '@/utils';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /** Add item to cart (or increment qty) */
  const addItem = useCallback((item, vendor, qty = 1) => {
    const cartItem = buildCartItem(item, vendor, qty);
    setCart((prev) => upsertCartItem(prev, cartItem));
  }, []);

  /** Adjust qty of an existing item (+1 / -1); removes if qty → 0 */
  const adjustItem = useCallback((itemId, delta) => {
    setCart((prev) => adjustCartItem(prev, itemId, delta));
  }, []);

  /** Remove an item entirely */
  const removeItem = useCallback((itemId) => {
    setCart((prev) => prev.filter((c) => c.id !== itemId));
  }, []);

  /** Clear the whole cart */
  const clearCart = useCallback(() => setCart([]), []);

  const cartCount    = getCartCount(cart);
  const cartSubtotal = getCartSubtotal(cart);
  const vendorCart   = (vendorId) => getVendorCart(cart, vendorId);

  const value = {
    cart,
    cartCount,
    cartSubtotal,
    vendorCart,
    addItem,
    adjustItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
