/* eslint-disable default-param-last */
import queryState from "@redux/utils/queryState";
import ACTION_TYPE from "./cartActions";

const cartReducer = (state, { type, payload }, totalState) => {
  switch (type) {
    case ACTION_TYPE.GET_CART_PENDING: {
      const newState = structuredClone(state);
      newState.query.getCart = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.GET_CART_FULLFILLED: {
      const newState = structuredClone(state);
      const { cart } = payload;
      newState.query.getCart = queryState.fullfilled();
      cart.forEach((_, index) => {
        cart[index].selected = true;
      });
      newState.data = cart;
      return newState;
    }
    case ACTION_TYPE.GET_CART_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.getCart = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.ADD_PRODUCT_TO_CART_PENDING: {
      const newState = structuredClone(state);
      newState.query.addProductToCart = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.ADD_PRODUCT_TO_CART_FULLFILLED: {
      const newState = structuredClone(state);
      const { cartItem } = payload;
      cartItem.selected = true;

      newState.query.addProductToCart = queryState.fullfilled();
      newState.data.push(cartItem);
      alert("상품이 성공적으로 추가되었습니다");

      return newState;
    }
    case ACTION_TYPE.ADD_PRODUCT_TO_CART_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.addProductToCart = queryState.rejected(error);
      alert(error.message);
      return newState;
    }

    case ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY_PENDING: {
      const newState = structuredClone(state);
      newState.query.updateCartItemQuantity = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY_FULLFILLED: {
      const newState = structuredClone(state);
      const { cartItemId, quantity } = payload;
      const index = newState.data.findIndex((cartItem) => {
        return cartItem.id === cartItemId;
      });
      newState.data[index].quantity = quantity;
      newState.query.updateCartItemQuantity = queryState.fullfilled();
      return newState;
    }
    case ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.updateCartItemQuantity = queryState.rejected(error);
      alert(error.message);
      return newState;
    }

    case ACTION_TYPE.DELETE_CART_ITEMS_PENDING: {
      const newState = structuredClone(state);
      newState.query.deleteCartItems = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.DELETE_CART_ITEMS_FULLFILLED: {
      const newState = structuredClone(state);
      const { cartItemIds } = payload;
      const newCart = newState.data.filter(
        (cartItem) => !cartItemIds.includes(cartItem.id)
      );
      newState.data = newCart;
      newState.query.deleteCartItems = queryState.fullfilled();
      return newState;
    }
    case ACTION_TYPE.DELETE_CART_ITEMS_REJECTED: {
      const { error } = payload;
      alert(error.message);
      return queryState.rejected(state, payload);
    }

    case ACTION_TYPE.SELECT_CART_ITEM: {
      const newState = structuredClone(state);
      const { cartItemId } = payload;
      newState.data.forEach((cartItem, index) => {
        if (cartItem.id === cartItemId) {
          newState.data[index].selected = true;
        }
      });
      return newState;
    }

    case ACTION_TYPE.DESELECT_CART_ITEM: {
      const newState = structuredClone(state);
      const { cartItemId } = payload;
      newState.data.forEach((cartItem, index) => {
        if (cartItem.id === cartItemId) {
          newState.data[index].selected = false;
        }
      });
      return newState;
    }

    case ACTION_TYPE.SELECT_ALL_CART_ITEMS: {
      const newState = structuredClone(state);
      newState.data.forEach((_, index) => {
        newState.data[index].selected = true;
      });
      return newState;
    }
    case ACTION_TYPE.DESELECT_ALL_CART_ITEMS: {
      const newState = structuredClone(state);
      newState.data.forEach((_, index) => {
        newState.data[index].selected = false;
      });
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
