import { useEffect, useState } from 'react';

export const useCheckBox = (cartList) => {
  const [checkboxItems, setCheckboxItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    setCheckboxItems(cartList.map((item) => Number(item.id)));
  }, [cartList]);

  useEffect(() => {
    setIsAllChecked(cartList && cartList.length === checkboxItems.length);
  }, [cartList, checkboxItems]);

  const handleChecked = (productId) => {
    const prevState = [...checkboxItems];
    const itemIndex = checkboxItems.findIndex((id) => id === productId);

    if (itemIndex === -1) {
      setCheckboxItems([...prevState, productId]);
      return;
    }

    setCheckboxItems(() => {
      const nextState = prevState.filter((_, i) => i !== itemIndex);
      return nextState;
    });
  };

  const isChecked = (productId) => checkboxItems.findIndex((id) => id === productId) !== -1;

  const clearCheckBoxItems = () => {
    if (checkboxItems <= 0) {
      return;
    }

    setCheckboxItems([]);
  };

  const checkAllSelectButton = () => {
    if (cartList.length < 0) {
      return;
    }
    if (checkboxItems.length >= cartList.length) {
      setCheckboxItems([]);
      return;
    }
    setCheckboxItems(cartList.map((item) => Number(item.id)));
  };

  return {
    checkboxItems,
    handleChecked,
    isChecked,
    isAllChecked,
    clearCheckBoxItems,
    checkAllSelectButton,
  };
};
