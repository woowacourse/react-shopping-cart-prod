import mockData from '../mocks/mockData.json';

export const CART_ITEMS_KEY = 'cartItemsKey';
export const PRODUCT_LIST_KEY = 'productListKey';
export const ORDER_LIST_KEY = 'orderListKey';
export const POINT_KEY = 'pointKey';
export const SERVER_KEY = 'serverKey';

export const getCartItems = () => {
  const localStorageCartItems = localStorage.getItem(CART_ITEMS_KEY) ?? '[]';
  const cartItems = JSON.parse(localStorageCartItems);

  if (!Array.isArray(cartItems))
    throw new Error('장바구니 정보가 배열 형식이 아닙니다!');

  return cartItems;
};

export const getProductList = () => {
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

export const getOrderList = () => {
  const localStorageOrderList = localStorage.getItem(ORDER_LIST_KEY) ?? '[]';
  const orderList = JSON.parse(localStorageOrderList);

  if (!Array.isArray(orderList))
    throw new Error('주문 목록이 배열이 아닙니다.');

  return orderList;
};

export const getPoint = () => {
  const localStoragePoint = localStorage.getItem(POINT_KEY);

  const point = JSON.parse(localStoragePoint ?? JSON.stringify({ point: 0 }));

  if (localStoragePoint === undefined) {
    localStorage.setItem(POINT_KEY, JSON.stringify(0));
    return 0;
  }

  return point;
};

export const getServer = () => {
  const localStorageSever = localStorage.getItem(SERVER_KEY);
  const serverName = JSON.parse(
    localStorageSever ??
      JSON.stringify({ server: 'https://woowacourse-sunshot.store' })
  );

  return serverName.server;
};

export const setServer = (server: string) => {
  localStorage.setItem(SERVER_KEY, JSON.stringify({ server }));
};
