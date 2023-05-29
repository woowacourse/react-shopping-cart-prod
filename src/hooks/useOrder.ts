import { useRecoilCallback } from 'recoil';

import { cartListState } from '../store/cart';
import { orderListState } from '../store/order';
import { ProductItemData } from '../types/product';
import { useCart } from './useCart';

const useOrder = () => {
  const { isAdded, addItem, updateItemQuantity } = useCart();

  const refreshOrderList = useRecoilCallback(
    ({ refresh }) =>
      () => {
        refresh(orderListState);
      },
    []
  );

  const addItemToCart = useRecoilCallback(
    ({ snapshot }) =>
      async (product: ProductItemData) => {
        const cartList = await snapshot.getPromise(cartListState);
        const isItemInCart = cartList.find((cartItem) => cartItem.product.id === product.id);

        if (isItemInCart) {
          updateItemQuantity({ cartItemId: isItemInCart.id, quantity: isItemInCart.quantity + 1 });

          return;
        }

        addItem(product);
      },
    [addItem, updateItemQuantity]
  );

  return { isAdded, refreshOrderList, addItemToCart };
};

export { useOrder };
