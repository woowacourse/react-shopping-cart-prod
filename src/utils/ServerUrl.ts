import {
  BASE_URL,
  CART_ITEMS_PATH_NAME,
  COUPONS_PATH_NAME,
  PRODUCTS_PATH_NAME,
  USERS_COUPON_PATH_NAME,
} from '../constant';
import { ServerName } from '../types/server';

const ServerUtil = {
  getProductsUrl: (serverName: ServerName) =>
    BASE_URL[serverName] + PRODUCTS_PATH_NAME,

  getCartItemsUrl: (serverName: ServerName) =>
    BASE_URL[serverName] + CART_ITEMS_PATH_NAME,

  getCouponsUrl: (serverName: ServerName) =>
    BASE_URL[serverName] + COUPONS_PATH_NAME,

  getUsersCouponUrl: (serverName: ServerName) =>
    BASE_URL[serverName] + USERS_COUPON_PATH_NAME,
};

export default ServerUtil;
