import { useState } from 'react';

export const useCheckBox = () => {
  const [checkboxItems, setCheckboxItems] = useState([]);

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

  return {
    checkboxItems,
    setCheckboxItems,
    handleChecked,
    isChecked,
    clearCheckBoxItems,
  };
};
