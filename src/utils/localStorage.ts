import mockData from '../assets/mockData.json';

export const CART_ITEMS_KEY = 'cartItemsKey';
export const PRODUCT_LIST_KEY = 'productListKey';
export const USER_POINT_KEY = 'userPointKey';
export const ORDER_LIST_KEY = 'orderListKey';

export const getCartItemsFromLocalStorage = () => {
  const localStorageCartItems = localStorage.getItem(CART_ITEMS_KEY) ?? '[]';
  const cartItems = JSON.parse(localStorageCartItems);

  if (!Array.isArray(cartItems))
    throw new Error('장바구니 정보가 배열 형식이 아닙니다!');

  return cartItems;
};

export const getProductListFromLocalStorage = () => {
  const localStorageProductList =
    localStorage.getItem(PRODUCT_LIST_KEY) ?? '[]';
  const productList = JSON.parse(localStorageProductList);

  if (localStorageProductList === '[]') {
    localStorage.setItem(PRODUCT_LIST_KEY, JSON.stringify(mockData));
    return mockData;
  }

  if (!Array.isArray(productList))
    throw new Error('상품 목록이 배열 형식이 아닙니다!');

  return productList;
};

export const getUserPointFromLocalStorage = () => {
  const localStoragePointData = localStorage.getItem(USER_POINT_KEY);
  const userPoint = JSON.parse(localStoragePointData ?? '0');

  if (localStoragePointData === undefined) {
    localStorage.setItem(USER_POINT_KEY, JSON.stringify(0));
    return 0;
  }

  return userPoint;
};

export const getOrderListFromLocalStorage = () => {
  const localStorageOrderList = localStorage.getItem(ORDER_LIST_KEY);
  const orderList = JSON.parse(localStorageOrderList ?? '[]');

  if (!Array.isArray(orderList)) {
    throw new Error('주문 목록 리스트가 배열 형식이 아닙니다!');
  }

  return orderList;
};
