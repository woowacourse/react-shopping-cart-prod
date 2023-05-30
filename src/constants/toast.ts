export const TOAST_STATE = {
  successAddProduct: {
    message: '상품을 장바구니에 추가했어요',
    variant: 'success',
    duration: 2000,
  },
  failedAddProduct: {
    message: '상품을 장바구니에 추가하지 못했어요',
    variant: 'error',
    duration: 2000,
  },
  successDeleteProduct: {
    message: '상품을 장바구니에서 삭제했어요',
    variant: 'success',
    duration: 2000,
  },
  failedDeleteProduct: {
    message: '상품을 장바구니에서 삭제하지 못했어요',
    variant: 'error',
    duration: 2000,
  },
  failedUpdateQuantity: {
    message: '수량 변경을 실패했어요',
    variant: 'error',
    duration: 2000,
  },
} as const;
