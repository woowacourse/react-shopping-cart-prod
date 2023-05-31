import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import cartState from '../globalState/atoms/cartState';
import serverNameState from '../globalState/atoms/serverName';

const useCheckedCartList = () => {
  const cartList = useRecoilValue(cartState);
  const [checkedCartList, setCheckedCartList] = useState<string[]>([]);
  const serverName = useRecoilValue(serverNameState);

  useEffect(() => {
    const checkedCartItemIds = cartList.map((cartItem) => cartItem.id);
    setCheckedCartList(checkedCartItemIds);
  }, [serverName]);

  const addCheckedItem = (id: string) => {
    setCheckedCartList((prevList) => [...prevList, id]);
  };

  const deleteCheckedItem = (targetId: string) => {
    setCheckedCartList((prevList) => prevList.filter((id) => id !== targetId));
  };

  const isChecked = (id: string) => {
    return checkedCartList.includes(id);
  };

  const addAllCheckedItem = () => {
    setCheckedCartList(cartList.map((cartItem) => cartItem.id));
  };

  const deleteAllCheckedItem = () => {
    setCheckedCartList([]);
  };

  const isAllChecked = () => {
    return cartList.length === checkedCartList.length;
  };

  return {
    checkedCartList,
    addCheckedItem,
    deleteCheckedItem,
    isChecked,
    addAllCheckedItem,
    deleteAllCheckedItem,
    isAllChecked,
  };
};

export default useCheckedCartList;
