import { Item, Product } from '../../types/CartList.ts';
import useCart from '../useCart.ts';
import useCreateCartItem from '../requests/useCreateCartItem.ts';
import { useToast } from '../useToast.ts';
import TOAST_MESSAGES from '../../constants/TOAST_MESSAGES.ts';

type AddToCartButtonProps = Product & {
  cartItemNumber: number | undefined;
  refetchCartList: ({}) => void;
};

const useAddToCartButton = ({ id, name, price, imageUrl, refetchCartList }: AddToCartButtonProps) => {
  const { updateCart } = useCart();
  const { createCartItemState, createCartItem } = useCreateCartItem();
  const showToast = useToast();

  const handleAddToCartButton = async () => {
    await createCartItem({ body: { productId: id } });

    if (createCartItemState.status === 'fail') return showToast(TOAST_MESSAGES.ERROR);

    showToast(TOAST_MESSAGES.CREATED);
    await refetchCartList({});

    if (createCartItemState.status === 'success' && createCartItemState.data) {
      const cartData: Item = createCartItemState.data;
      updateCart({ id: cartData.id, quantity: 1, product: { id, name, price, imageUrl }, isSelected: true });
    }
  };

  return { handleAddToCartButton, createCartItemState };
};

export default useAddToCartButton;
