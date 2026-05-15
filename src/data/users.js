export const SAVED_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    icon: '🏠',
    address: '14 Admiralty Way, Lekki Phase 1',
    landmark: 'By the Total filling station',
  },
  {
    id: 2,
    label: 'Office',
    icon: '🏢',
    address: '25 Adeola Odeku Street, Victoria Island',
    landmark: 'Zenith Bank building, 3rd floor',
  },
  {
    id: 3,
    label: 'Parents',
    icon: '👨‍👩‍👧',
    address: '7 Ogunlana Drive, Surulere',
    landmark: 'Behind Surulere Market',
  },
];

export const PAYMENT_METHODS = [
  { id: 'wallet',   icon: '💰', label: 'SwiftDrop Wallet',    description: 'Pay from your wallet balance' },
  { id: 'card',     icon: '💳', label: 'Debit / Credit Card', description: 'Visa, Mastercard, Verve — via Paystack' },
  { id: 'transfer', icon: '🏦', label: 'Bank Transfer',       description: 'Instant transfer via Flutterwave' },
  { id: 'ussd',     icon: '📱', label: 'USSD',                description: 'All Nigerian banks supported' },
];

export const RIDERS = [
  { id: 1, name: 'Emeka Okafor',  zone: 'Lekki',          deliveriesToday: 23, rating: 4.9, status: 'active',    earnings: 18500, bike: 'Honda CB500',   plate: 'LAG-123-AA' },
  { id: 2, name: 'Chidi Nwosu',   zone: 'Victoria Island', deliveriesToday: 18, rating: 4.7, status: 'active',    earnings: 14200, bike: 'Yamaha NMAX',   plate: 'LAG-456-BB' },
  { id: 3, name: 'Bayo Adeleke',  zone: 'Ikeja',           deliveriesToday: 31, rating: 4.8, status: 'offline',   earnings: 24600, bike: 'TVS Apache',    plate: 'LAG-789-CC' },
  { id: 4, name: 'Femi Taiwo',    zone: 'Surulere',        deliveriesToday: 12, rating: 4.5, status: 'suspended', earnings: 9800,  bike: 'Honda CG125',   plate: 'LAG-012-DD' },
  { id: 5, name: 'Kunle Badmus',  zone: 'Yaba',            deliveriesToday: 27, rating: 4.9, status: 'active',    earnings: 21300, bike: 'Bajaj Pulsar',  plate: 'LAG-345-EE' },
];

export const NOTIFICATIONS = [
  { id: 1, icon: '✅', title: 'Order Delivered!',          body: 'Yellow Chilli order has arrived. How was it?',                      time: '2 min ago',  unread: true  },
  { id: 2, icon: '⚡', title: 'Instant Refund Processed',  body: '₦8,000 credited to your wallet from ORD-2690.',                    time: '2 days ago', unread: true  },
  { id: 3, icon: '🎁', title: 'Weekend Promo: 20% Off',    body: 'Use SWIFT20 this weekend on any order over ₦3,000.',               time: '3 days ago', unread: false },
  { id: 4, icon: '⭐', title: 'You earned 120 SwiftPoints!', body: 'Keep ordering to unlock Gold status.',                            time: '4 days ago', unread: false },
  { id: 5, icon: '🛵', title: 'Rider Assigned',             body: 'Emeka Okafor is heading to pick up your order.',                  time: '5 days ago', unread: false },
];

export const DEMO_USER = {
  name: 'Tunde Adeyemi',
  email: 'tunde@swiftdrop.app',
  phone: '+234 801 234 5678',
  wallet: 15000,
  points: 1240,
  joined: 'January 2026',
};

export const COUPONS = {
  SWIFT10: { discount: 0.10, label: '10% off your order' },
  SWIFT20: { discount: 0.20, label: '20% off your order' },
  NEWUSER: { discount: 0.15, label: '15% off for new users' },
};
