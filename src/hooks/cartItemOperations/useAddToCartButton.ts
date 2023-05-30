import { useCallback } from 'react';
import { Item } from '../../types/CartList.ts';
import useCart from '../useCart.ts';
import useCreateCartItem from '../requests/useCreateCartItem.ts';
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
  const showToast = useToast();

  const handleAddToCartButton = useCallback(async () => {
    await createCartItem({ body: { productId: id } });
    showToast(toastMessages.created);
    await refetchCartList({});

    if (createCartItemState.status === 'success' && createCartItemState.data) {
      const cartData: Item = createCartItemState.data;
      updateCart({ id: cartData.id, quantity: 1, product: { id, name, price, imageUrl }, isSelected: true });
    }
  }, [cartItemNumber, id, name, price, imageUrl, refetchCartList, createCartItem, createCartItemState.error, updateCart]);

  return { handleAddToCartButton, createCartItemState };
};

export default useAddToCartButton;
