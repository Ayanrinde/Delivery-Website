import { createContext, useContext, useState, useCallback } from 'react';
import { generateOrderId, generateOTP } from '@/utils';

const OrderContext = createContext(null);

const DEMO_RIDER = {
  name:   'Emeka Okafor',
  phone:  '+234 803 456 7890',
  rating: 4.9,
  bike:   'Honda CB500',
  plate:  'LAG-123-AA',
};

export function OrderProvider({ children }) {
  const [activeOrder, setActiveOrder] = useState(null);

  /**
   * Place a new order and start tracking
   * @param {{ cart, total, vendorName, address }} params
   */
  const placeOrder = useCallback(({ cart, total, vendorName, address }) => {
    const order = {
      id:      generateOrderId(),
      items:   cart,
      total,
      vendor:  vendorName,
      address,
      otp:     generateOTP(),
      rider:   DEMO_RIDER,
      eta:     '28-35',
      placedAt: new Date().toISOString(),
    };
    setActiveOrder(order);
    return order;
  }, []);

  const clearOrder = useCallback(() => setActiveOrder(null), []);

  const value = { activeOrder, placeOrder, clearOrder };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside <OrderProvider>');
  return ctx;
}
