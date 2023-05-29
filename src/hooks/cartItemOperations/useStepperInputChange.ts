import { useCallback } from 'react';
import useCart from '../useCart.ts';
import usePostUpdateCartItem from '../requests/usePostUpdateCartItem.ts';
import useDeleteCartItem from '../requests/useDeleteCartItem.ts';
import { useToast } from '../useToast.ts';
import toastMessages from '../../constants/toastMessages.ts';

type StepperInputChangeProps = {
  cartItemNumber: number | undefined;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  refetchCartList: ({}) => void;
};

const useStepperInputChange = ({ cartItemNumber, id, name, price, imageUrl, refetchCartList }: StepperInputChangeProps) => {
  const { updateCart } = useCart();
  const { updateCartItemState, updateCartItem } = usePostUpdateCartItem();
  const { deleteCartItemState, deleteCartItem } = useDeleteCartItem();
  const showToast = useToast();

  const handleStepperInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      let targetQuantity = parseInt(e.target.value, 10);

      if (isNaN(targetQuantity) || targetQuantity < 1) {
        targetQuantity = 1;
      } else if (targetQuantity > 99) {
        targetQuantity = 99;
      }

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

  return { handleStepperInputChange, updateCartItemState, deleteCartItemState };
};

export default useStepperInputChange;
