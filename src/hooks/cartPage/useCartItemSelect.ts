import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCartIdListState } from '../../recoil/atoms/cartAtom';
import { useCartRecoil } from '../recoil/useCartRecoil';
import { useCartFetch } from '../fetch/useCartFetch';
import { APIAtom } from '../../recoil/atoms/serverAtom';

export const useCartItemSelect = () => {
  const apiEndPoint = useRecoilValue(APIAtom);
  const [selectedCartIdList, setSelectedCartIdList] = useRecoilState(
    selectedCartIdListState(apiEndPoint)
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
    if (e.target.checked) {
      setSelectedCartIdList(() => getAllCartIdList());
      return;
    }

    setSelectedCartIdList(() => []);
  };

  return { deleteSelectedProduct, toggleAllCheckBoxChecked };
};
