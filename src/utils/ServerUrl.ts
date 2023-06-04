import {
  ALL_COUPONS_PATH_NAME,
  BASE_URL,
  CART_ITEMS_PATH_NAME,
  ORDER_PATH_NAME,
  PRODUCTS_PATH_NAME,
  USER_COUPONS_PATH_NAME,
} from '../constant';
import { ServerName } from '../types/server';

const ServerUtil = {
  getProductsUrl: (serverName: ServerName) => BASE_URL[serverName] + PRODUCTS_PATH_NAME,

  getCartItemsUrl: (serverName: ServerName) => BASE_URL[serverName] + CART_ITEMS_PATH_NAME,

  getCouponsUrl: (serverName: ServerName) => BASE_URL[serverName] + ALL_COUPONS_PATH_NAME,

  getUserCouponsUrl: (serverName: ServerName) => BASE_URL[serverName] + USER_COUPONS_PATH_NAME,

  getOrderUrl: (serverName: ServerName) => BASE_URL[serverName] + ORDER_PATH_NAME,
};

export default ServerUtil;
