import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '../store/CartState';
import { MouseEvent } from 'react';
import { removeProductItemFromCartSelector, totalPriceSelector } from '../store/CartSelector';
import { useFetchData } from './useFetchData';
import { serverState } from '../store/ServerState';
import { CART_BASE_URL } from '../constants/url';
import { checkedItemsState } from '../store/CheckedItemsState';

export const useCart = () => {
  const cart = useRecoilValue(cartState);
  const [checkedItems, setCheckedItems] = useRecoilState(checkedItemsState);
  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });
  const serverUrl = useRecoilValue(serverState);

  const { api } = useFetchData();

  const isChecked = (id: number) => {
    return checkedItems.includes(id);
  };

  const subtotal = useRecoilValue(totalPriceSelector(checkedItems));

  const handleRemoveFromCartList = (id: number) => (e: MouseEvent<HTMLButtonElement>) => {
    removeProductItemFromCart(id);
  };

  const handleCheckedItem = (id: number) => () => {
    checkedItems.includes(id)
      ? setCheckedItems((prev) => prev.filter((itemId) => itemId !== id))
      : setCheckedItems((prev) => [...prev, id]);
  };

  const handleCheckAllItems = () => {
    checkedItems.length === cart.length
      ? setCheckedItems([])
      : setCheckedItems(cart.map((item) => item.id));
  };

  const handleRemoveCheckedItem = () => {
    const confirmResult = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmResult) {
      checkedItems.forEach((id) => {
        api.delete(`${serverUrl}${CART_BASE_URL}/${id}`, CART_BASE_URL);
        removeProductItemFromCart(id);
      });
      setCheckedItems([]);
    }
  };

  return {
    checkedItems,
    isChecked,
    setCheckedItems,
    subtotal,
    handleRemoveFromCartList,
    handleCheckAllItems,
    handleCheckedItem,
    handleRemoveCheckedItem,
  };
};
