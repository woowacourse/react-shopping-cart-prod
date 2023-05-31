import { useRecoilCallback } from 'recoil';

import { cartListState } from '../store/cart';
import { orderListState } from '../store/order';
import { ProductItemData } from '../types/product';
import { useToast } from './common/useToast';
import { useCart } from './useCart';

const useOrder = () => {
  const { addItem, updateItemQuantity } = useCart();
  const { isAdded, setIsAdded } = useToast();

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
        } else {
          addItem(product);
        }

        setIsAdded(true);
      },
    [addItem, updateItemQuantity]
  );

  return { isAdded, refreshOrderList, addItemToCart };
};

export { useOrder };
