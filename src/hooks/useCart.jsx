import {
  addToCartAsync,
  deleteCartProductAsync,
  getCartAsync,
  toggleProductCheck,
  updateCartProductQuantityAsync,
  updateCheckedList,
} from 'store/actions/cart';
import { cartStoreSelector } from 'store/selector';

import { WARNING_MESSAGES } from 'constants/messages';
import useReduxState from './useReduxState';

const useCart = () => {
  const [cartState, dispatch] = useReduxState(cartStoreSelector);
  const { cart, checkedProductList } = cartState;

  const cartLength = cart && Object.keys(cart).length;

  const loadCart = () => {
    dispatch(getCartAsync());
  };

  const addProduct = ({ id, count }) => {
    dispatch(addToCartAsync(id, count));
  };

  const dispatchQuantityUpdate = (productId, quantity) => {
    dispatch(updateCartProductQuantityAsync(productId, quantity));
  };

  const incrementCartProduct = (productId, currentQuantity) => {
    dispatchQuantityUpdate(productId, currentQuantity + 1);
  };

  const decrementCartProduct = (productId, currentQuantity) => {
    if (currentQuantity === 1) {
      alert(WARNING_MESSAGES.MIN_QUANTITY);
      return;
    }
    dispatchQuantityUpdate(productId, currentQuantity - 1);
  };

  const deleteProduct = (productIdArray) => {
    if (window.confirm(WARNING_MESSAGES.PRODUCTS_DELETE(1))) {
      dispatch(deleteCartProductAsync(productIdArray));
    }
  };

  const isChecked = (productId) => checkedProductList.includes(productId);

  const toggleCheck = (productId) => {
    dispatch(toggleProductCheck(productId));
  };

  const isAllChecked = cartLength === checkedProductList.length;

  const toggleAllCheck = () => {
    if (isAllChecked) {
      dispatch(updateCheckedList([]));
      return;
    }

    dispatch(updateCheckedList(cart.map(({ productData }) => productData.id)));
  };

  const deleteCheckedProducts = () => {
    const checkedListLength = checkedProductList.length;

    if (
      checkedListLength !== 0 &&
      window.confirm(WARNING_MESSAGES.PRODUCTS_DELETE(checkedListLength))
    ) {
      dispatch(deleteCartProductAsync(checkedProductList));
    }
  };

  const checkedProductsTotalPrice = checkedProductList.reduce((total, productId) => {
    const { productData, quantity } = cart.find(
      ({ productData }) => productData.id === productId,
    );
    return total + productData.price * quantity;
  }, 0);

  return {
    cart,
    cartLength,
    loadCart,
    addProduct,
    decrementCartProduct,
    incrementCartProduct,
    deleteProduct,
    isChecked,
    toggleCheck,
    checkedProductCount: checkedProductList.length,
    isAllChecked,
    toggleAllCheck,
    deleteCheckedProducts,
    totalPrice: checkedProductsTotalPrice,
  };
};

export default useCart;
