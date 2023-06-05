import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartAtom, checkedValue, selectedItemListAtom } from '../store/cart';
import { useEffect, useState } from 'react';
import useFetchCart from './useFetchCart';
import { serverAtom } from '../store/server';
import { totalProductPriceAtom } from '../store/bill';

const useSelectedItem = () => {
  const serverName = useRecoilValue(serverAtom);
  const { deleteCartItem } = useFetchCart();
  const [cartList, setCartList] = useRecoilState(cartAtom);
  const { ALL_CHECKED, NO_CHECKED } = useRecoilValue(checkedValue);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const [selectedItemList, setSelectedItemList] =
    useRecoilState(selectedItemListAtom);
  const setTotalProductPrice = useSetRecoilState(totalProductPriceAtom);

  useEffect(() => {
    setSelectedItemList(ALL_CHECKED);
  }, [serverName]);

  useEffect(() => {
    const totalProductPrice = selectedItemList.reduce((a, b) => {
      if (b.isSelected) {
        let cart = cartList.find((item) => item.id === b.id);
        if (cart) return a + cart.quantity * cart.product.price;
      }
      return a;
    }, 0);

    setTotalProductPrice(totalProductPrice);
  }, [selectedItemList, cartList]);

  const toggleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    setSelectedItemList(!isAllSelected ? ALL_CHECKED : NO_CHECKED);
  };

  const deleteSelectedItems = () => {
    selectedItemList.forEach((item) => {
      if (item.isSelected) {
        deleteCartItem(item.id);
        setCartList((prev) => [...prev.filter((cart) => cart.id !== item.id)]);
      }
    });
  };

  return {
    isAllSelected,
    toggleSelectAll,
    setIsAllSelected,
    deleteSelectedItems,
  };
};

export default useSelectedItem;
