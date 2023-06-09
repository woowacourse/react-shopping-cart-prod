import { useRecoilState } from 'recoil';
import { postCartItem, patchCartItemQuantity, deleteCartItem } from 'api/cart';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { cartListAtom } from 'recoil/carts';
import { useMutate } from '../../../hooks/useMutate';
import { ProductItem } from 'types/api/products';

export const useCart = () => {
  const { request, error } = useMutate();
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const { toast } = useToast();

  const addItem = async (product: ProductItem) => {
    const res = await request(postCartItem({ productId: product.id }));
    checkError();

    const cartId = Number(
      res.headers.get('Location').replace('/cart-items/', '')
    );

    setCartList((cartList) => [
      ...cartList,
      { id: cartId, product, quantity: 1 },
    ]);

    toast.success('장바구니에 상품이 담겼습니다.');
  };

  const increaseItemQuantity = (cartId: number) => {
    const cartItem = cartList.find((item) => item.id === cartId);
    if (!cartItem) return;

    setCartList((prev) =>
      prev.map((item) =>
        item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    request(patchCartItemQuantity(cartId, { quantity: cartItem.quantity + 1 }));
    checkError();
  };

  const decreaseItemQuantity = (cartId: number) => {
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
    checkError();
  };

  const deleteItem = (cartId: number) => {
    if (!cartList) return;

    setCartList((prev) => prev.filter((item) => item.id !== cartId));
    request(deleteCartItem(cartId));
    checkError();
  };

  const checkError = () => {
    if (error.isError) {
      toast.error(error.errorMessage);
    }
  };

  return {
    cartList,
    decreaseItemQuantity,
    increaseItemQuantity,
    deleteItem,
    addItem,
  };
};
