import {
  addToCartThunk,
  deleteCartProductThunk,
  getCartThunk,
  toggleProductCheckThunk,
  updateCartProductQuantityThunk,
  updateCheckedList,
} from 'store/actions/cart.action';
import { cartStoreSelector } from 'store/selector';

import useReduxState from 'hooks/useReduxState';

import { WARNING_MESSAGES } from 'constants/messages';

const useCart = () => {
  const [cartState, dispatch] = useReduxState(cartStoreSelector);
  const { cart, checkedProductList } = cartState;

  const cartLength = cart && Object.keys(cart).length;
  const purchasableProductCount = cart.filter(({ product }) => product.stock > 0).length;

  const loadCart = async () => {
    await dispatch(getCartThunk());
  };

  const addProduct = async ({ productId, count }) => {
    await dispatch(addToCartThunk(productId, count));
  };

  const dispatchQuantityUpdate = async (productId, quantity) => {
    await dispatch(updateCartProductQuantityThunk(productId, quantity));
  };

  const incrementCartProduct = async (productId, currentQuantity) => {
    await dispatchQuantityUpdate(productId, currentQuantity + 1);
  };

  const decrementCartProduct = async (productId, currentQuantity) => {
    await dispatchQuantityUpdate(productId, currentQuantity - 1);
  };

  const deleteProduct = async (productIdArray) => {
    if (window.confirm(WARNING_MESSAGES.PRODUCTS_DELETE(1))) {
      await dispatch(deleteCartProductThunk(productIdArray));
    }
  };

  const isChecked = (productId) => checkedProductList.includes(productId);

  const toggleCheck = (productId) => {
    dispatch(toggleProductCheckThunk(productId));
  };

  const isAllChecked = purchasableProductCount === checkedProductList.length;

  const toggleAllCheck = () => {
    if (isAllChecked) {
      dispatch(updateCheckedList([]));
      return;
    }

    dispatch(
      updateCheckedList(
        cart.filter(({ product }) => product.stock > 0).map(({ product }) => product.id),
      ),
    );
  };

  const deleteCheckedProducts = async () => {
    const checkedListLength = checkedProductList.length;

    if (
      checkedListLength !== 0 &&
      window.confirm(WARNING_MESSAGES.PRODUCTS_DELETE(checkedListLength))
    ) {
      await dispatch(deleteCartProductThunk(checkedProductList));
    }
  };

  const checkedProductsTotalPrice = checkedProductList.reduce((total, productId) => {
    const targetCartedProductData = cart.find(({ product }) => product.id === productId);

    if (targetCartedProductData === undefined) {
      return total;
    }

    const { product, quantity } = targetCartedProductData;
    const purchasableQuantity = Math.min(quantity, product.stock);

    return total + product.price * purchasableQuantity;
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
