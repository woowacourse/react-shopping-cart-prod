import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { cartState, checkedItemsState } from '../store/CartState';
import { ChangeEvent, MouseEvent } from 'react';
import { removeProductItemFromCartSelector, totalPriceSelector } from '../store/CartSelector';
import { serverState } from '../store/ServerState';
import { CART_BASE_URL } from '../constants/url';
import useMutation from './useMutation';
import { base64 } from '../constants';
import { CartItem } from '../types';
import useToast from './useToast';

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [checkedItems, setCheckedItems] = useRecoilState(checkedItemsState);
  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });
  const serverUrl = useRecoilValue(serverState);

  const { mutate, error } = useMutation<CartItem[]>(setCart);
  const { toast } = useToast();

  const initializeCheckItems = () => {
    const initialCheckedItems = cart.map((item) => item.id);
    setCheckedItems(initialCheckedItems);
  };

  const isChecked = (id: number) => {
    return checkedItems.includes(id);
  };

  const totalPrice = useRecoilValue(totalPriceSelector(checkedItems));

  const handleRemoveFromCartList = (id: number) => (e: MouseEvent<HTMLButtonElement>) => {
    removeProductItemFromCart(id);
  };

  const handleCheckedItem = (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
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
        mutate(
          {
            url: `${serverUrl}${CART_BASE_URL}/${id}`,
            method: 'DELETE',
            bodyData: { id },
            headers: {
              Authorization: `Basic ${base64}`,
              'Content-Type': 'application/json',
            },
          },
          CART_BASE_URL,
        );
        if (error) return;

        // TODO: 옮기기
        toast.success(`${checkedItems.length}개의 상품을 장바구니에서 삭제했습니다.`);
        removeProductItemFromCart(id);
      });
      setCheckedItems([]);
    }
  };

  return {
    checkedItems,
    isChecked,
    setCheckedItems,
    totalPrice,
    handleRemoveFromCartList,
    handleCheckAllItems,
    handleCheckedItem,
    handleRemoveCheckedItem,
    initializeCheckItems,
  };
};
