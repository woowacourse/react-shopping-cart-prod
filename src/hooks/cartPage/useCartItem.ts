import { useCartFetch } from '../fetch/useCartFetch';
import { useCartRecoil } from '../recoil/useCartRecoil';
import { useSelectedCartRecoil } from '../recoil/useSelectedCartRecoil';

export const useCartItem = (cartId: number, name: string) => {
  const { deleteRecoilCartById, patchRecoilCartItemQuantity } = useCartRecoil();
  const { addNewSelectedCartId, deleteSelectedCartId } =
    useSelectedCartRecoil();

  const { deleteCartItemById, patchCartItemQuantity } = useCartFetch();

  const handleDeleteCartItem = () => {
    // eslint-disable-next-line no-restricted-globals
    const isUserWantToDeleteProduct = confirm(`${name}을 삭제하시겠습니까?`);

    if (!isUserWantToDeleteProduct) return;

    deleteCartItemById(cartId);
    deleteRecoilCartById(cartId);
  };

  const handleClickCheckBox: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.checked) return addNewSelectedCartId(cartId);

    deleteSelectedCartId(cartId);
  };

  const handleChangeQuantity = (quantity: number) => {
    if (quantity <= 0) return handleDeleteCartItem();

    patchRecoilCartItemQuantity(cartId, quantity);
    patchCartItemQuantity(cartId, quantity);
  };

  return { handleDeleteCartItem, handleClickCheckBox, handleChangeQuantity };
};
