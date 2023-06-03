import { selector } from 'recoil';
import { cartItemsState, selectedCartIdListState } from '../atoms/cartAtom';
import { pointState } from '../atoms/pointAtom';

export const priceSummaryState = selector({
  key: 'priceSummaryState',
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartIdListState);
    const cartItems = get(cartItemsState);
    const point = get(pointState);

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

    const totalAvailablePoints = selectedCartItems.reduce(
      (acc, selectedCartItemId) => {
        const product = cartItems.find(
          (cartProduct) => cartProduct.id === selectedCartItemId
        );

        if (product?.product.pointAvailable === true)
          return (acc +=
            Number(product?.quantity) * Number(product?.product.price));

        return (acc += 0);
      },
      0
    );

    const pointToAdd = selectedCartItems.reduce((acc, selectedCartItemId) => {
      const product = cartItems.find(
        (cartProduct) => cartProduct.id === selectedCartItemId
      );

      const calculatedPoint =
        (Number(product?.product.price) *
          Number(product?.quantity) *
          Number(product?.product.pointRatio)) /
        100;

      return (acc += calculatedPoint);
    }, 0);

    const availablePoint =
      totalAvailablePoints > point ? point : totalAvailablePoints;

    return {
      totalProductPrice,
      deliveryPrice,
      totalPrice,
      totalAvailablePoints,
      pointToAdd,
      availablePoint,
    };
  },
});
