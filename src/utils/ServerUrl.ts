import {
  BASE_URL,
  CART_ITEMS_PATH_NAME,
  PRODUCTS_PATH_NAME,
} from '../constant';
import { ServerName } from '../types/server';

const ServerUtil = {
  getProductsUrl: (serverName: ServerName) =>
    BASE_URL[serverName] + PRODUCTS_PATH_NAME,

  getCartItemsUrl: (serverName: ServerName) =>
    BASE_URL[serverName] + CART_ITEMS_PATH_NAME,
};

export default ServerUtil;
