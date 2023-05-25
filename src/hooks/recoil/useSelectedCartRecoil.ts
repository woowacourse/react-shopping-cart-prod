import { useRecoilState } from 'recoil';
import { selectedCartIdListState } from '../../recoil/atoms/cartAtom';

export const useSelectedCartRecoil = () => {
  const [selectedCartIdList, setSelectedCartIdList] = useRecoilState(
    selectedCartIdListState
  );

  const addNewSelectedCartId = (cartId: number) => {
    setSelectedCartIdList((current) => [...current, cartId]);
  };

  const deleteSelectedCartId = (cartId: number) => {
    setSelectedCartIdList((current) =>
      current.filter((selectedCartId) => selectedCartId !== cartId)
    );
  };

  const getIsSelectedCartIdListIncludes = (cartId: number) => {
    return selectedCartIdList.includes(cartId);
  };

  return {
    selectedCartIdList,
    addNewSelectedCartId: addNewSelectedCartId,
    deleteSelectedCartId,
    getIsSelectedCartIdListIncludes,
  };
};
