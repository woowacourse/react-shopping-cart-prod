import { selectorFamily } from 'recoil';
import cartState from '../atoms/cartState';

const getCartItemId = selectorFamily<string | null, number>({
  key: 'getCartId',

  get:
    (productId) =>
    ({ get }) => {
      const cartProduct = get(cartState).find(({ product: { id } }) => id === productId);
      return cartProduct ? cartProduct.id : null;
    },

  /*
    서버 변경 시 productId는 같은데 cartItemId가 바뀔 수 있어요
    이러면 productId가 같아서 캐시된 이전 서버의 cartItemId를 반환하는 문제가 생겨요
    따라서 selector cache를 아예 저장하지 않도록 하는 방향으로 개선을 시도했어요
  */
  cachePolicy_UNSTABLE: { eviction: 'lru', maxSize: 0 },
});

export default getCartItemId;
