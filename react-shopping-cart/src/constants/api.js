export const test = true;

const eve = 'http://ec2-54-180-96-9.ap-northeast-2.compute.amazonaws.com:8080';
const leo = 'http://ec2-15-164-103-250.ap-northeast-2.compute.amazonaws.com:8080';
const judy = 'http://ec2-43-200-5-8.ap-northeast-2.compute.amazonaws.com:8080';
const bunny = 'http://ec2-3-34-179-158.ap-northeast-2.compute.amazonaws.com:8080';
export const BASE_URL = test ? eve : 'http://localhost:3000';

const CUSTOMERS = 'customers';
export const API_URL_PATH = {
  PRODUCTS: `/products`,
  CUSTOMERS: `/${CUSTOMERS}`,
  LOGIN: `/auth/login`,
  EMAIL: `/${CUSTOMERS}/email`,
  NAME: `/${CUSTOMERS}/name`,
  CARTS: `/${CUSTOMERS}/carts`,
  EMAIL_VALIDATE: `/${CUSTOMERS}/email/validate`,
};
