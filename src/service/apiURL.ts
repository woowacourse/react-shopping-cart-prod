export type serverURLType = (typeof servers)[keyof typeof servers];

export const servers = {
  달리: 'http://52.79.233.108:8080',
  오션: 'http://east-c.shop',
  홍고: 'http://54.180.108.125:8080',
} as const;

export const base64 = 'YUBhLmNvbToxMjM0';
