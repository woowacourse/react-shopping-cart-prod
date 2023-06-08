const PATH = Object.freeze({
  HOME: '/',
  CART: '/shopping-cart',
  ORDERS: '/orders',
});

const QUANTITY = Object.freeze({
  MAX: 99,
  MIN: 1,
});

const SKELETON_LENGTH = 16;

const FETCH_METHOD = Object.freeze({
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
});

const FETCH_URL = Object.freeze({
  CART_ITEMS: '/cart-items',

  PRODUCTS: '/products',

  ORDERS: '/orders',
  ORDER_POLICY: '/order-policy',

  POINT: '/point',
});

const RECOIL_KEY = Object.freeze({
  CART_STATE: 'cartState',
  CART_SIZE_SELECTOR: 'cartSizeSelector',
  CART_ITEM_VALUE: 'cartItemValue',
  CHECKED_CART_ITEMS_SELECTOR: 'checkedCartItemsSelector',
  IS_ALL_CART_CHECKED_SELECTOR: 'isAllCartCheckedSelector',
  FIND_CART_ITEM_BY_PRODUCT_ID_SELECTOR: 'findCartItemByProductIdSelector',
  CART_REPOSITORY: 'cartRepository',

  PRODUCTS_SELECTOR: 'productsSelector',

  TOTAL_PRODUCT_PRICE_VALUE: 'totalProductPriceValue',

  USABLE_POINT_SELECTOR: 'usablePointSelector',

  API_BASE_URL_STATE: 'baseApiUrlState',
  API_BASE_URL_SELECTOR: 'baseApiUrlSelector',

  ORDER_POLICY_SELECTOR: 'orderPolicySelector',

  ORDER_LIST_SELECTOR: 'ordersSelector',
  ORDER_DETAIL_SELECTOR: 'orderDetailSelector',
  ORDER_SELECTOR: 'orderSelector',
  ORDERS_REPOSITORY: 'ordersRepository',
});

const LOCAL_STORAGE_KEY = Object.freeze({
  CHECKED_STATE: 'checkedProductInCart',
  CART_STATE: 'cartState',
});

export { PATH, QUANTITY, SKELETON_LENGTH, FETCH_METHOD, FETCH_URL, RECOIL_KEY, LOCAL_STORAGE_KEY };
