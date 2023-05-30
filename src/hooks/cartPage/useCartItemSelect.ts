import { useRecoilState } from 'recoil';
import { selectedCartIdListState } from '../../recoil/atoms/cartAtom';
import { useCartRecoil } from '../recoil/useCartRecoil';
import { useCartFetch } from '../fetch/useCartFetch';

export const useCartItemSelect = () => {
  const [selectedCartIdList, setSelectedCartIdList] = useRecoilState(
    selectedCartIdListState
  );

  const { deleteRecoilCartById, getAllCartIdList } = useCartRecoil();
  const { deleteCartItemById } = useCartFetch();

  const deleteSelectedProduct = (confirmString: string) => {
    // eslint-disable-next-line no-restricted-globals
    const isUserWantToDelete = confirm(confirmString);

    if (!isUserWantToDelete) return;

    selectedCartIdList.forEach((selectedCartId) => {
      deleteRecoilCartById(selectedCartId);
      deleteCartItemById(selectedCartId);
    });
  };

  const toggleAllCheckBoxChecked: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.checked)
      return setSelectedCartIdList(() => getAllCartIdList());
    setSelectedCartIdList(() => []);
  };

  return { deleteSelectedProduct, toggleAllCheckBoxChecked };
};
