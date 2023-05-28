import { selector } from 'recoil';
import { cartItemsState, selectedCartIdListState } from '../atoms/cartAtom';
import { userAtomState } from '../atoms/userAtom';

export const priceSummaryState = selector({
  key: 'priceSummaryState',
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartIdListState);
    const cartItems = get(cartItemsState);
    const userPoint = get(userAtomState);

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

    const totalPointsToAdd = selectedCartItems.reduce(
      (acc, selectedCartItemId) => {
        const product = cartItems.find(
          (cartProduct) => cartProduct.id === selectedCartItemId
        );

        if (product?.product.pointAvailable === true)
          return (acc +=
            (Number(product?.quantity) *
              Number(product?.product.price) *
              Number(product.product.pointRatio)) /
            100);

        return (acc += 0);
      },
      0
    );

    const deliveryPrice = selectedCartItems.length > 0 ? 3000 : 0;

    const totalPrice = totalProductPrice + deliveryPrice;

    const canUsingUserPoint =
      totalAvailablePoints > userPoint ? userPoint : totalAvailablePoints;

    return {
      totalProductPrice,
      deliveryPrice,
      totalPrice,
      canUsingUserPoint,
      totalPointsToAdd,
    };
  },
});

// 사용 가능한 포인트 구하기
// 1. 선택된 상품들 중 포인트를 사용 가능한 상품의 가격을 모두 더해 총 사용 가능한 포인트를 계산한다.
// 2. 유저가 가진 포인트를 가져와 이보다 1번의 포인트가 더 크다면 유저가 가진 포인트를, 만약 유저가 가진 포인트가 더 크다면 1번의 포인트를 반환한다.

// 적립 가능한 포인트 구하기
// 1. 선택된 상품들의 수량 * 가격에 각 상품의 포인트 전환 비율을 곱하여 모두 더한 값을 반환한다.

//
