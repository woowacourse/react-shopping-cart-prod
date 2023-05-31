import { selector, snapshot_UNSTABLE } from 'recoil';
import cartState from '../globalState/atoms/cartState';
import getCartQuantityController from '../globalState/selectors/getCartStateController';
import { CartProduct, Product } from '../types/product';

const product1: Product = { id: 1, name: '참새', price: 7, imageUrl: '' };
const product2: Product = { id: 2, name: '룩소', price: 7777, imageUrl: '' };

const clearSelectorCachesState = selector({
  key: 'ClearSelectorCaches',
  get: ({ getCallback }) =>
    getCallback(({ snapshot, refresh }) => () => {
      const nodes = Array.from(snapshot.getNodes_UNSTABLE());
      nodes.forEach((node) => refresh(node));
    }),
});

const getCartStateSnapshot = (initialCartState: CartProduct[]) => {
  return snapshot_UNSTABLE(({ getLoadable, set }) => {
    // 모든 selector의 캐시 비우기
    const clearSelectorCaches = getLoadable(clearSelectorCachesState).getValue();
    clearSelectorCaches();

    // cartState 초기화하기
    set(cartState, initialCartState);
  });
};

describe('Recoil Selector Test: getCartQuantityController', () => {
  test('cartState에 새로운 상품들을 추가할 수 있다.', () => {
    const snapshot = getCartStateSnapshot([]);

    const controller1 = snapshot.getLoadable(getCartQuantityController('1234')).valueOrThrow();
    controller1.add('1234', 1, product1);

    expect(snapshot.getLoadable(cartState).valueOrThrow()).toEqual([
      {
        id: '1234',
        quantity: 1,
        product: product1,
      },
    ]);

    const controller2 = snapshot.getLoadable(getCartQuantityController('5678')).valueOrThrow();
    controller2.add('5678', 1, product2);

    expect(snapshot.getLoadable(cartState).valueOrThrow()).toEqual([
      {
        id: '1234',
        quantity: 1,
        product: product1,
      },
      {
        id: '5678',
        quantity: 1,
        product: product2,
      },
    ]);
  });

  test('cartState에 있는 상품의 수량을 변경할 수 있다.', () => {
    const snapshot = getCartStateSnapshot([
      {
        id: '1234',
        quantity: 1,
        product: product1,
      },
      {
        id: '5678',
        quantity: 1,
        product: product2,
      },
    ]);

    const controller = snapshot.getLoadable(getCartQuantityController('1234')).valueOrThrow();

    controller.set(100);

    expect(snapshot.getLoadable(cartState).valueOrThrow()).toEqual([
      {
        id: '1234',
        quantity: 100,
        product: product1,
      },
      {
        id: '5678',
        quantity: 1,
        product: product2,
      },
    ]);
  });

  test('cartState에 있는 상품을 삭제할 수 있다.', () => {
    const snapshot = getCartStateSnapshot([
      {
        id: '1234',
        quantity: 1,
        product: product1,
      },
      {
        id: '5678',
        quantity: 1,
        product: product2,
      },
    ]);

    const controller = snapshot.getLoadable(getCartQuantityController('1234')).valueOrThrow();

    controller.delete();

    expect(snapshot.getLoadable(cartState).valueOrThrow()).toEqual([
      {
        id: '5678',
        quantity: 1,
        product: product2,
      },
    ]);
  });
});
