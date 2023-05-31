import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useCartService from './useCartService';
import cartLoadingState from '../globalState/atoms/cartLoadingState';

const useCheckedCartList = () => {
  const { cartList } = useCartService();
  const cartIdList = cartList.map((cartItem) => cartItem.id);
  const [checkedCartList, setCheckedCartList] = useState<string[]>(cartIdList);

  const isCartLoading = useRecoilValue(cartLoadingState);

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
    if (!isCartLoading) {
      const checkedCartItemIds = cartList.map((cartItem) => cartItem.id);

      setCheckedCartList(checkedCartItemIds);
    }
  }, [isCartLoading]);

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
