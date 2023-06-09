export const ADD_MESSAGE = {
  success: {
    message: '상품을 장바구니에 추가했어요 😊',
    variant: 'success',
    duration: 2000,
  },
  error: {
    message: '상품을 장바구니에 추가하는데 실패했어요 🥲',
    variant: 'error',
    duration: 2000,
  },
} as const;

export const DELETE_MESSAGE = {
  success: {
    message: '장바구니에서 상품을 삭제했어요 😊',
    variant: 'success',
    duration: 2000,
  },
  error: {
    message: '장바구니에서 상품을 삭제하는데 실패했어요 🥲',
    variant: 'error',
    duration: 2000,
  },
} as const;

export const QUANTITY_MESSAGE = {
  error: {
    message: '상품의 수량을 변경하는데 실패했어요 🥲',
    variant: 'error',
    duration: 2000,
  },
} as const;

export const ORDER_MESSAGE = {
  success: {
    message: '선택한 상품을 주문했어요 😊',
    variant: 'success',
    duration: 2000,
  },
  error: {
    message: '선택한 상품을 주문하는데 실패했어요 🥲',
    variant: 'error',
    duration: 2000,
  },
} as const;
