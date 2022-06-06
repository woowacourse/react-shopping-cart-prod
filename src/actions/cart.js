import { 장바구니_액션 } from './types';

const addCartList = (product, cartList) => {
  const targetProduct = cartList.find((item) => item.id === product.id);

  if (targetProduct) {
    return {
      type: 장바구니_액션.ADD_EXIST_PRODUCT,
      payload: { ...product, count: Number(targetProduct.count) + 1, isChecked: true },
    };
  }

  return {
    type: 장바구니_액션.ADD_NEW_PRODUCT,
    payload: { ...product, count: 1, isChecked: true },
  };
};

const deleteCartItem = (productId) => ({ type: 장바구니_액션.DELETE_PRODUCT, payload: productId });

const modifyCartItemCount = (productId, count) => ({
  type: 장바구니_액션.MODIFY_PRODUCT_COUNT,
  payload: { productId, count },
});

export { addCartList, deleteCartItem, modifyCartItemCount };
