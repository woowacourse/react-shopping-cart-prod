import { useCallback } from 'react';
import useCart from './useCart.ts';
import useCreateCartItem from './requests/useCreateCartItem.ts';
import usePostUpdateCartItem from './requests/usePostUpdateCartItem.ts';
import useDeleteCartItem from './requests/useDeleteCartItem.ts';
import useGetCartList from './requests/useGetCartList.ts';
import { useToast } from './useToast.ts';
import toastMessages from '../constants/toastMessages.ts';

type CartItemOperations = {
  cartItemNumber: number | undefined;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  refetchCartList: ({}) => void;
};

const useCartItemOperations = ({ cartItemNumber, id, name, price, imageUrl, refetchCartList }: CartItemOperations) => {
  const { updateCart } = useCart();
  const { createCartItemState, createCartItem } = useCreateCartItem();
  const { updateCartItemState, updateCartItem } = usePostUpdateCartItem();
  const { deleteCartItemState, deleteCartItem } = useDeleteCartItem();
  const { status: cartListStatus, data: cartList, refetchCartList: getFreshCartList } = useGetCartList();
  const showToast = useToast();

  const handleAddToCartButton = useCallback(async () => {
    await createCartItem({ body: { productId: id } });
    await refetchCartList({});
    await getFreshCartList({});

    if (cartListStatus === 'success' && cartList) {
      const addedCartItem = cartList.find((item) => item.product.id === id);

      if (!addedCartItem) return;

      showToast(toastMessages.created);
      updateCart({ id: addedCartItem.id, quantity: 1, product: { id, name, price, imageUrl }, isSelected: true });
    }
  }, [cartItemNumber, id, name, price, imageUrl, refetchCartList, createCartItem, createCartItemState.error, updateCart]);

  const handleStepperInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const targetQuantity = parseInt(e.target.value, 10);
      if (!cartItemNumber) return;
      if (targetQuantity === 0) {
        await deleteCartItem({ param: cartItemNumber });

        updateCart({ id: cartItemNumber, quantity: 0, product: { id, name, price, imageUrl }, isSelected: false });
        refetchCartList({});
        showToast(toastMessages.deleted);

        return;
      }
      await updateCartItem({ param: cartItemNumber, body: { quantity: targetQuantity } });

      updateCart({ id: cartItemNumber, quantity: targetQuantity, product: { id, name, price, imageUrl }, isSelected: true });
      refetchCartList({});
    },
    [cartItemNumber, id, name, price, imageUrl, refetchCartList, deleteCartItem, deleteCartItemState.error, updateCart, updateCartItem, updateCartItemState.error]
  );

  const handleStepperIncreaseButton = useCallback(async (quantity: number) => {
    await updateCartItem({ param: cartItemNumber, body: { quantity: quantity + 1 } });
    await refetchCartList({});
    if (!cartItemNumber) return;
    updateCart({ id: cartItemNumber, quantity: quantity + 1, product: { id, name, price, imageUrl }, isSelected: true });
  }, []);

  const handleStepperDecreaseButton = useCallback(async (quantity: number) => {
    if (quantity === 1) return;
    await updateCartItem({ param: cartItemNumber, body: { quantity: quantity - 1 } });
    await refetchCartList({});
    if (!cartItemNumber) return;
    updateCart({ id: cartItemNumber, quantity: quantity - 1, product: { id, name, price, imageUrl }, isSelected: true });
  }, []);

  return { handleAddToCartButton, handleStepperInputChange, createCartItemState, updateCartItemState, deleteCartItemState, handleStepperIncreaseButton, handleStepperDecreaseButton };
};

export default useCartItemOperations;
