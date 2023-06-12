const PATH = {
  ROOT: '/',
  CARTS: '/carts',
  ORDERS: '/orders',
  ORDERS_SUCCESS: '/orders/success',
  ORDERS_OrderId: `/orders/:orderId`,
  RELOAD: 0,
} as const;

export { PATH };
