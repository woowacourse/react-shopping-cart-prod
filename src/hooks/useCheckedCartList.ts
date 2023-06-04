import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import serverNameState from '../globalState/atoms/serverName';
import cartState from '../globalState/atoms/cartState';

const useCheckedCartList = () => {
  const cartList = useRecoilValue(cartState);
  const cartIdList = cartList.map((cartItemId) => cartItemId.id);
  const [checkedCartIdList, setCheckedCartList] =
    useState<string[]>(cartIdList);

  const serverName = useRecoilValue(serverNameState);
  const prevServerName = useRef('');

  const checkCartItem = (id: string) => {
    setCheckedCartList((prevList) => [...prevList, id]);
  };

  const uncheckCartItem = (targetId: string) => {
    setCheckedCartList((prevList) => prevList.filter((id) => id !== targetId));
  };

  const checkAllCartItem = () => {
    setCheckedCartList(cartList.map((cartItemId) => cartItemId.id));
  };

  const uncheckAllCartItem = () => {
    setCheckedCartList([]);
  };

  const isChecked = (id: string) => {
    return checkedCartIdList.includes(id);
  };

  const isAllChecked = () => {
    return cartList.length === checkedCartIdList.length;
  };

  const getCheckedItemList = () => {
    return cartList.filter((cart) => checkedCartIdList.includes(cart.id));
  };

  useEffect(() => {
    if (prevServerName.current === serverName) return;

    uncheckAllCartItem();
    checkAllCartItem();

    prevServerName.current = serverName;
  }, [cartList]);

  return {
    checkedCartIdList,
    checkCartItem,
    uncheckCartItem,
    checkAllCartItem,
    uncheckAllCartItem,
    getCheckedItemList,
    isChecked,
    isAllChecked,
  };
};

export default useCheckedCartList;
