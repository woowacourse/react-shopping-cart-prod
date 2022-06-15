import { useState } from "react";
import { useDispatch } from "react-redux";

import { toggleSnackbarOpen } from "@/redux/modules/snackbar";
import { deleteCartItem } from "@/redux/modules/cart";

import appClient from "@/utils/appClient";
import { getCookie } from "@/utils/auth";

const useCheckBox = (compareList = []) => {
  const [checkedItemList, setCheckedItemList] = useState([]);

  const dispatch = useDispatch();

  const changeCheckedList = (id) => {
    if (checkedItemList.find((checkedId) => checkedId === id)) {
      setCheckedItemList((prev) => prev.filter((itemId) => itemId !== id));
      return;
    }
    setCheckedItemList((prev) => [...prev, id]);
  };

  const allChecked = () => {
    const cartedId = compareList.map(({ id }) => id);

    if (checkedItemList.length === cartedId.length) {
      setCheckedItemList([]);
      return;
    }
    setCheckedItemList(cartedId);
  };

  const deleteSelectedItems = async () => {
    if (checkedItemList.length === 0) {
      dispatch(toggleSnackbarOpen("상품을 선택해주세요"));
      return;
    }
    if (confirm("정말로 삭제하시겠습니까?")) {
      const accessToken = getCookie("accessToken");
      const headers = { Authorization: `Bearer ${accessToken}` };
      for (const id of checkedItemList) {
        try {
          await appClient.delete(`users/me/carts/${id}`, { headers });
          changeCheckedList(id);
          dispatch(deleteCartItem(id));
        } catch (error) {
          dispatch(toggleSnackbarOpen("삭제 오류"));
        }
      }
    }
  };

  return {
    checkedItemList,
    changeCheckedList,
    allChecked,
    deleteSelectedItems,
  };
};

export default useCheckBox;
