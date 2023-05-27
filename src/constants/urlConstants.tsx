export const SERVER_NAME = ['마코', '허브', '우가'] as const;

export const SERVER = {
  [SERVER_NAME[0]]: 'https://m4co.shop',
  [SERVER_NAME[1]]: 'https://h3rb.shop',
  [SERVER_NAME[2]]: 'https://wuga.shop',
} as const;

export type ServerName = (typeof SERVER_NAME)[number];

export const getProductPath = (serverName: ServerName) => {
  return `${SERVER[serverName]}/products`;
};

export const getCartPath = (serverName: ServerName) => {
  return `${SERVER[serverName]}/cart-items`;
};

export const getCouponPath = (serverName: ServerName) => {
  return `${SERVER[serverName]}/coupons`;
};
