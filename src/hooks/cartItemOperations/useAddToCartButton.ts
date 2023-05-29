import { useCallback } from 'react';
import { Item } from '../../types/CartList.ts';
import useCart from '../useCart.ts';
import useCreateCartItem from '../requests/useCreateCartItem.ts';
import useGetCartList from '../requests/useGetCartList.ts';
import { useToast } from '../useToast.ts';
import toastMessages from '../../constants/toastMessages.ts';

type AddToCartButtonProps = {
  cartItemNumber: number | undefined;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  refetchCartList: ({}) => void;
};

const useAddToCartButton = ({ cartItemNumber, id, name, price, imageUrl, refetchCartList }: AddToCartButtonProps) => {
  const { updateCart } = useCart();
  const { createCartItemState, createCartItem } = useCreateCartItem();
  const { status: cartListStatus, data: cartList, refetchCartList: getFreshCartList } = useGetCartList();
  const showToast = useToast();

  const handleAddToCartButton = useCallback(async () => {
    await createCartItem({ body: { productId: id } });
    await refetchCartList({});
    await getFreshCartList({});

    if (cartListStatus === 'success' && cartList) {
      const addedCartItem = cartList.find((item: Item) => item.product.id === id);

      if (!addedCartItem) return;

      showToast(toastMessages.created);
      updateCart({ id: addedCartItem.id, quantity: 1, product: { id, name, price, imageUrl }, isSelected: true });
    }
  }, [cartItemNumber, id, name, price, imageUrl, refetchCartList, createCartItem, createCartItemState.error, updateCart]);

  return { handleAddToCartButton, createCartItemState };
};

export default useAddToCartButton;
