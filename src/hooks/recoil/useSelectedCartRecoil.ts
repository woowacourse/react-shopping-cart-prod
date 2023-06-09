import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCartIdListState } from '../../recoil/atoms/cartAtom';
import { APIAtom } from '../../recoil/atoms/serverAtom';

export const useSelectedCartRecoil = () => {
  const apiEndPoint = useRecoilValue(APIAtom);
  const [selectedCartIdList, setSelectedCartIdList] = useRecoilState(
    selectedCartIdListState(apiEndPoint)
  );

  const addNewSelectedCartId = (cartId: number) => {
    setSelectedCartIdList((current) => [...current, cartId]);
  };

  const deleteSelectedCartId = (cartId: number) => {
    setSelectedCartIdList((current) =>
      current.filter((selectedCartId) => selectedCartId !== cartId)
    );
  };

  const deleteAllSelectedCartId = () => {
    setSelectedCartIdList(() => []);
  };

  const getIsSelectedCartIdListIncludes = (cartId: number) => {
    return selectedCartIdList.includes(cartId);
  };

  return {
    selectedCartIdList,
    addNewSelectedCartId,
    deleteSelectedCartId,
    deleteAllSelectedCartId,
    getIsSelectedCartIdListIncludes,
  };
};
