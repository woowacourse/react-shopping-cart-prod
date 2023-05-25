import { useRecoilState, useRecoilValue } from 'recoil';
import { cartListAtom, checkedItemsAtom } from 'recoil/cartList';

export const useCheckedItemIds = () => {
  const [checkedItemIds, setCheckedItemIds] = useRecoilState(checkedItemsAtom);
  const cartList = useRecoilValue(cartListAtom);

  const unCheckAllItems = () => {
    setCheckedItemIds([]);
  };

  const checkAllItems = () => {
    setCheckedItemIds(cartList.map((item) => item.id));
  };

  const checkItem = (id: number) => {
    if (checkedItemIds.includes(id)) {
      unCheckItem(id);
      return;
    }
    setCheckedItemIds((prev) => [...prev, id]);
  };

  const unCheckItem = (id: number) => {
    setCheckedItemIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  return {
    checkedItemIds,
    checkItem,
    unCheckAllItems,
    checkAllItems,
    unCheckItem,
  };
};
