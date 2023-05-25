import { removeCartItem } from "api/cartItems";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartListState } from "recoil/cart";
import { serverSelectState } from "recoil/server";

export const useCartCheckbox = () => {
  const selectedServer = useRecoilValue(serverSelectState);
  const [cartList, setCartList] = useRecoilState(cartListState);
  const [isAllchecked, setIsAllChecked] = useState(true);
  const [checkedCount, setCheckedCount] = useState(cartList.length);

  useEffect(() => {
    const count = cartList.filter((item) => item.isChecked).length;

    setIsAllChecked(count === cartList.length);
    setCheckedCount(count);
  }, [cartList]);

  const setAllCheckbox = (isChecked: boolean) => {
    setCartList(
      cartList.map((item) => {
        return { ...item, isChecked: isChecked };
      })
    );
  };

  const removeCheckedItem = async () => {
    const checkedList = cartList.filter((item) => item.isChecked);
    const removedList = checkedList.filter((item) => removeItem(item.id));

    const newList = cartList.filter((item) => !removedList.includes(item));

    if (checkedList.length !== removedList.length)
      alert("삭제 요청이 일부 실패하였습니다. 새로고침 후 다시 시도해주세요.");

    setCartList(newList);
  };

  const removeItem = async (id: number) => {
    const result = await removeCartItem(selectedServer, id);

    return result;
  };

  return { isAllchecked, checkedCount, setAllCheckbox, removeCheckedItem };
};
