export const MOCK_ERROR_MESSAGE = {
  NOT_EXIST_PRODUCT: '존재하지 않은 상품입니다.',
  NOT_EXIST_IN_SHOPPING_CART: '장바구니가 비었거나 장바구니에 존재하지 않는 상품입니다.',
  EXCEED_STORABLE_QUANTITY: (currentStock, currentQuantity) =>
    `현재 장바구니에 ${currentQuantity}개의 상품이 담겨 있습니다. 새로 추가할 수 있는 최대 수량의 상품은 ${Math.max(
      currentStock - currentQuantity,
      0,
    )}개 입니다.`,
};
