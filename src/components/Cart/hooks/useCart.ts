import { useRecoilState } from 'recoil';
import {
  postCartItem,
  patchCartItemQuantity,
  deleteCartItem,
} from 'api/requests';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { updateCart } from 'recoil/cartList';
import { useMutate } from '../../../hooks/useMutate';
import { Product } from 'types';

export const useCart = (product: Product) => {
  const { request } = useMutate();
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));
  const { toast } = useToast();

  const cartId = product.id;

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    setCartItem({ id: cartId, quantity: 1, product });
    request(postCartItem({ productId: product.id }));
    toast.success('장바구니에 상품이 담겼습니다.');
  };

  const onAddItem: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;

    setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });
    request(patchCartItemQuantity(cartId, { quantity: cartItem.quantity + 1 }));
  };

  const onRemoveItem: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;

    setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 });
    request(patchCartItemQuantity(cartId, { quantity: cartItem.quantity - 1 }));
  };

  const onDeleteItem: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (!cartItem) return;

    setCartItem({ ...cartItem, quantity: 0 });
    request(deleteCartItem(cartId));
  };

  return {
    currentCartItem: cartItem,
    onRemoveItem,
    onAddItem,
    onDeleteItem,
    onSelectItem,
  };
};
