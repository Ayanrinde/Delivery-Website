export const PAST_ORDERS = [
  {
    id: 'ORD-2841',
    vendor: 'Yellow Chilli',
    vendorEmoji: '🌶️',
    items: ['Jollof Rice', 'Suya Platter'],
    total: 8400,
    status: 'delivered',
    date: 'May 11, 2026',
    rating: 5,
  },
  {
    id: 'ORD-2756',
    vendor: 'Chicken Republic',
    vendorEmoji: '🍗',
    items: ['Grilled Chicken', 'Chips & Chicken'],
    total: 5700,
    status: 'delivered',
    date: 'May 9, 2026',
    rating: 4,
  },
  {
    id: 'ORD-2690',
    vendor: "Domino's Pizza",
    vendorEmoji: '🍕',
    items: ['Pepperoni Pizza', 'Garlic Bread'],
    total: 8000,
    status: 'refunded',
    date: 'May 7, 2026',
    rating: null,
  },
  {
    id: 'ORD-2601',
    vendor: 'Yellow Chilli',
    vendorEmoji: '🌶️',
    items: ['Catfish Pepper Soup'],
    total: 3800,
    status: 'delivered',
    date: 'Apr 30, 2026',
    rating: 5,
  },
];

export const ORDER_STATUSES = [
  { key: 'confirmed',  label: 'Order Confirmed',     icon: '✅', detail: 'Restaurant received your order' },
  { key: 'preparing',  label: 'Preparing Your Order', icon: '👨‍🍳', detail: 'Kitchen is working on it' },
  { key: 'picked_up',  label: 'Rider Picked Up',      icon: '🛵', detail: 'Emeka is heading to you' },
  { key: 'arriving',   label: 'Almost There',          icon: '📍', detail: 'About 1.2km away' },
  { key: 'delivered',  label: 'Delivered!',            icon: '🎉', detail: 'Enjoy your meal!' },
];

export const WALLET_TRANSACTIONS = [
  { type: 'credit', description: 'Refund — ORD-2690',           amount: 8000,  date: 'May 7',  icon: '↩️' },
  { type: 'debit',  description: 'Yellow Chilli — ORD-2841',    amount: 8400,  date: 'May 11', icon: '🌶️' },
  { type: 'credit', description: 'Wallet top-up',               amount: 20000, date: 'May 5',  icon: '💳' },
  { type: 'debit',  description: 'Chicken Republic — ORD-2756', amount: 5700,  date: 'May 9',  icon: '🍗' },
  { type: 'credit', description: 'SwiftPoints redeemed',        amount: 500,   date: 'Apr 28', icon: '⭐' },
  { type: 'debit',  description: 'Coldstone — ORD-2488',        amount: 5300,  date: 'Apr 25', icon: '🍦' },
];

export const REFUND_REASONS = [
  { id: 'wrong',   label: 'Wrong order received',      icon: '❌' },
  { id: 'missing', label: 'Item(s) missing',           icon: '📦' },
  { id: 'not_del', label: 'Order not delivered',       icon: '🚫' },
  { id: 'cold',    label: 'Food arrived cold/damaged', icon: '🥶' },
  { id: 'late',    label: 'Excessive delay (30+ min)', icon: '⏰' },
];
