import { useState, useEffect } from 'react';
import { ORDER_STATUSES } from '@/data';

/**
 * Simulates live order status progression.
 * In production, replace the interval with a Firestore/socket listener.
 *
 * @param {boolean} active  Only run when an order is active
 * @param {number}  intervalMs  How fast each status advances (ms)
 * @returns {{ statusIndex: number, currentStatus: object }}
 */
export function useOrderTracking(active = false, intervalMs = 5500) {
  const [statusIndex, setStatusIndex] = useState(2); // starts at "Rider Picked Up"

  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setStatusIndex((i) => {
        if (i >= ORDER_STATUSES.length - 1) {
          clearInterval(timer);
          return i;
        }
        return i + 1;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [active, intervalMs]);

  return {
    statusIndex,
    currentStatus: ORDER_STATUSES[statusIndex] ?? ORDER_STATUSES[0],
    allStatuses:   ORDER_STATUSES,
    isDelivered:   statusIndex === ORDER_STATUSES.length - 1,
  };
}
