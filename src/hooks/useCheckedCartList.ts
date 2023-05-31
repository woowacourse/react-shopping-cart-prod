import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import serverNameState from '../globalState/atoms/serverName';
import fetchRefreshedCartItemList from '../globalState/selectors/fetchCartItemList';
import cartState from '../globalState/atoms/cartState';

const useCheckedCartList = () => {
  const cartList = useRecoilValue(cartState);
  const cartIdList = cartList.map((cartItem) => cartItem.id);
  const [checkedCartList, setCheckedCartList] = useState<string[]>(cartIdList);

  const serverName = useRecoilValue(serverNameState);
  const fetchedCartList = useRecoilValue(fetchRefreshedCartItemList);

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

  useEffect(() => {
    deleteAllCheckedItem();
    fetchedCartList.map((cart) => addCheckedItem(cart.id));
  }, [serverName]);

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
