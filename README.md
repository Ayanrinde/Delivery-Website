# ⚡ SwiftDrop — Delivery Platform

> Africa's most trusted delivery platform. Instant refunds, proof of delivery, real ETAs.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

---

## 📁 Folder Structure

```
swiftdrop/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                  # App entry point
    ├── App.jsx                   # Root with all providers
    │
    ├── styles/
    │   └── global.css            # CSS vars, animations, resets
    │
    ├── constants/
    │   ├── theme.js              # Color palette, spacing, z-index
    │   └── routes.js             # Route path constants
    │
    ├── data/                     # Mock data (replace with API calls)
    │   ├── vendors.js
    │   ├── orders.js
    │   ├── users.js
    │   └── index.js
    │
    ├── utils/                    # Pure helper functions
    │   ├── formatters.js         # formatCurrency, getInitials, etc.
    │   ├── helpers.js            # sleep, generateOrderId, etc.
    │   ├── cartUtils.js          # Cart calculation logic
    │   └── index.js
    │
    ├── contexts/                 # React Context providers
    │   ├── AuthContext.jsx       # User auth state
    │   ├── CartContext.jsx       # Shopping cart state
    │   ├── OrderContext.jsx      # Active order + tracking
    │   ├── ToastContext.jsx      # Global toast notifications
    │   └── index.js
    │
    ├── hooks/                    # Custom React hooks
    │   ├── useOrderTracking.js   # Live status progression
    │   ├── useVendorFilter.js    # Search + category filter
    │   ├── useCheckout.js        # Multi-step checkout logic
    │   ├── useLocalStorage.js    # Persistent state
    │   └── index.js
    │
    ├── components/
    │   ├── ui/                   # Reusable primitives
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Toast.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── Indicators.jsx    # Badge, Avatar, Stars, Skeleton, Spinner
    │   │   └── index.js
    │   │
    │   └── layout/               # Shell components
    │       ├── Navbar.jsx
    │       ├── ProtectedRoute.jsx
    │       └── index.js
    │
    ├── router/
    │   └── AppRouter.jsx         # All React Router routes
    │
    └── pages/
        ├── Home/
        │   ├── HeroSection.jsx
        │   ├── HomeSections.jsx  # TrustStrip, Features, FAQ, CTA, Footer
        │   └── index.jsx
        ├── Browse/
        │   ├── VendorCard.jsx
        │   └── index.jsx
        ├── Vendor/
        │   ├── MenuItemCard.jsx
        │   ├── CartSidebar.jsx
        │   └── index.jsx
        ├── Cart/
        │   └── index.jsx
        ├── Checkout/
        │   ├── CheckoutSteps.jsx # AddressStep, PaymentStep, ReviewStep
        │   └── index.jsx
        ├── Track/
        │   ├── StatusTimeline.jsx
        │   ├── RefundModal.jsx
        │   ├── TrackWidgets.jsx  # RiderCard, ETACard, PODCard, OrderSummaryCard
        │   └── index.jsx
        ├── Dashboard/
        │   ├── DashboardTabs.jsx # Overview, Orders, Wallet, Addresses, Profile
        │   └── index.jsx
        ├── Admin/
        │   ├── AdminTabs.jsx     # Overview, Riders, Analytics, Placeholder
        │   └── index.jsx
        ├── Notifications/
        │   └── index.jsx
        └── Auth/
            ├── AuthForm.jsx      # Shared login/signup form
            ├── Login.jsx
            └── Signup.jsx
```

---

## 🔑 Key Features

| Feature | Description |
|---|---|
| ⚡ Instant Refunds | Report issues → wallet credited in <60s |
| 📸 Proof of Delivery | OTP + photo verification system |
| 🗺️ Smart Addresses | Saved addresses with landmarks |
| ⏱️ Honest ETAs | Live status timeline with auto-progression |
| 🛒 Multi-step Checkout | Cart → Address → Payment → Review |
| 💰 Wallet System | Fund, spend, and receive refunds |
| 👤 User Dashboard | Orders, wallet, addresses, profile |
| ⚙️ Admin Panel | Overview, riders, analytics |

---

## 🔧 Environment Variables

Create `.env` in the root:

```env
# Firebase (Auth + Firestore)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=

# Maps
VITE_GOOGLE_MAPS_API_KEY=
# OR
VITE_MAPBOX_TOKEN=

# Payments
VITE_FLUTTERWAVE_PUBLIC_KEY=
VITE_PAYSTACK_PUBLIC_KEY=
```

---

## 🔌 Replacing Mock Data with Real APIs

Each mock data file maps directly to a backend collection:

| File | → Backend |
|---|---|
| `data/vendors.js` | `GET /api/vendors` |
| `data/orders.js`  | `GET /api/orders?userId=...` |
| `data/users.js`   | Firebase Auth + Firestore `users` collection |

Replace context methods (`login`, `placeOrder`, etc.) with `axios` calls to your Express/Node backend.

---

## 📦 Production Build

```bash
npm run build
# Output: /dist — deploy to Vercel, Netlify, or any static host
```

---

## 🧰 Tech Stack

- **React 18** + **Vite 5**
- **React Router v6** — file-based page routing
- **Context API** — auth, cart, order, toast state
- **CSS Variables** — design token system
- No external UI library — fully custom component system

---

## 🚀 Deployment

```bash
# Vercel (recommended)
vercel --prod

# Netlify
netlify deploy --prod --dir=dist

# Docker
docker build -t swiftdrop .
docker run -p 3000:80 swiftdrop
```
