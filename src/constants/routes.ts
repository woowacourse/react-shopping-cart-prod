export const HOME_ROUTES = '/';
export const CART_PRODUCTS_ROUTES = '/cart';
export const ORDERS_PRODUCTS_ROUTES = '/orders';
export const ORDER_COMPLETE = '/orders/complete';
export const ORDER_FAIL = '/orders/fail';
export const ORDER_DETAILS_ROUTES = (orderId: number) => `/orders/${orderId}`;
