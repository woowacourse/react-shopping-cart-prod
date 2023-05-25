import { useRecoilState } from 'recoil';
import {
  postCartItem,
  patchCartItemQuantity,
  deleteCartItem,
} from 'api/requests';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { cartListAtom } from 'recoil/cartList';
import { useMutate } from '../../../hooks/useMutate';
import { Product } from 'types';

export const useCart = (product: Product) => {
  const { request } = useMutate();
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const { toast } = useToast();

  const onSelectItem = async () => {
    const res = await request(postCartItem({ productId: product.id }));
    const cartId = Number(
      res.headers.get('Location').replace('/cart-items/', '')
    );

    setCartList((cartList) => [
      ...cartList,
      { id: cartId, product, quantity: 1 },
    ]);

    toast.success('장바구니에 상품이 담겼습니다.');
  };

  const addItem = (cartId: number) => {
    const cartItem = cartList.find((item) => item.id === cartId);
    if (!cartItem) return;

    setCartList((prev) =>
      prev.map((item) =>
        item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    request(patchCartItemQuantity(cartId, { quantity: cartItem.quantity + 1 }));
  };

  const removeItem = (cartId: number) => {
    const cartItem = cartList.find((item) => item.id === cartId);
    if (!cartItem) return;

    if (cartItem.quantity === 1) {
      setCartList((prev) => prev.filter((item) => item.id !== cartId));
      request(deleteCartItem(cartId));
      return;
    }

    setCartList((prev) =>
      prev.map((item) =>
        item.id === cartId ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
    request(patchCartItemQuantity(cartId, { quantity: cartItem.quantity - 1 }));
  };

  const deleteItem = (cartId: number) => {
    if (!cartList) return;

    setCartList((prev) => prev.filter((item) => item.id !== cartId));
    request(deleteCartItem(cartId));
  };

  return {
    removeItem,
    addItem,
    deleteItem,
    onSelectItem,
  };
};
