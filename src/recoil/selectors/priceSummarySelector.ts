import { selector } from 'recoil';
import { cartItemsState, selectedCartIdListState } from '../atoms/cartAtom';

export const priceSummaryState = selector({
  key: 'priceSummaryState',
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartIdListState);
    const cartItems = get(cartItemsState);

    const totalProductPrice = selectedCartItems.reduce(
      (acc, selectedCartItemId) => {
        const product = cartItems.find(
          (cartProduct) => cartProduct.id === selectedCartItemId
        );

        return (acc +=
          Number(product?.quantity) * Number(product?.product.price));
      },
      0
    );

    const deliveryPrice = selectedCartItems.length > 0 ? 3000 : 0;

    const totalPrice = totalProductPrice + deliveryPrice;

    const pointToAdd = selectedCartItems.reduce((acc, selectedCartItemId) => {
      const product = cartItems.find(
        (cartProduct) => cartProduct.id === selectedCartItemId
      );

      if (product?.product.pointAvailable) {
        return (acc +=
          Number(product?.product.price) / Number(product?.product.pointRatio));
      }

      return acc;
    }, 0);

    return { totalProductPrice, deliveryPrice, totalPrice, pointToAdd };
  },
});
