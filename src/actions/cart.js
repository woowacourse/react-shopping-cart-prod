import { requestGetCartList } from 'api';
import { 비동기_요청 } from 'constants';
import { 장바구니_액션 } from './types';

const initCartList = (cartList) => {
  // const response = await requestGetCartList();
  // if (response.status === 비동기_요청.SUCCESS) {
  //   const cartList = response.content.map((item) => {
  //     const { id, name, price, thumbnail } = item.product;
  //     const { quantity } = item;
  //     return {
  //       id,
  //       name,
  //       price,
  //       thumbnail,
  //       quantity,
  //     };
  //   });
  //   dispatch({ type: 장바구니_액션.INIT_CART_LIST, payload: cartList });
  // }
  return {
    type: 장바구니_액션.INIT_CART_LIST,
    payload: cartList,
  };
};

const addCartList = (product, cartList) => {
  const targetProduct = cartList.find((item) => item.id === product.id);

  if (targetProduct) {
    return {
      type: 장바구니_액션.ADD_EXIST_PRODUCT,
      payload: { ...product, quantity: Number(targetProduct.quantity) + 1, isChecked: true },
    };
  }

  return {
    type: 장바구니_액션.ADD_NEW_PRODUCT,
    payload: { ...product, quantity: 1, isChecked: true },
  };
};

const deleteCartItem = (productId) => ({ type: 장바구니_액션.DELETE_PRODUCT, payload: productId });

const modifyCartItemQuantity = (productId, quantity) => ({
  type: 장바구니_액션.MODIFY_PRODUCT_QUANTITY,
  payload: { productId, quantity },
});

export { initCartList, addCartList, deleteCartItem, modifyCartItemQuantity };
