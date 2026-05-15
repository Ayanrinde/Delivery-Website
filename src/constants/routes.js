export const ROUTES = {
  HOME:          '/',
  BROWSE:        '/browse',
  VENDOR:        '/vendor/:id',
  CART:          '/cart',
  CHECKOUT:      '/checkout',
  TRACK:         '/track',
  DASHBOARD:     '/dashboard',
  ADMIN:         '/admin',
  NOTIFICATIONS: '/notifications',
  LOGIN:         '/login',
  SIGNUP:        '/signup',
};

// Helper to build dynamic routes
export const buildRoute = {
  vendor: (id) => `/vendor/${id}`,
};
