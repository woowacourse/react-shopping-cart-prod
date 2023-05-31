import { useEffect } from 'react';

import { useCartSizeValue } from '@recoils/recoilCart';
import { useSetCheckedState } from '@recoils/recoilChecked';

import type { CheckedStateType } from '../types';

export const useUpdateCheckbox = () => {
  const setCheckedState = useSetCheckedState();
  const cartSize = useCartSizeValue();

  useEffect(() => {
    if (cartSize === 0) setCheckedState({ all: true });
  }, [cartSize]);

  const toggleAllCheckbox = (cart: any) => {
    setCheckedState((prev) => {
      const updatedCheckedState: CheckedStateType = {
        all: !prev.all,
      };

      if (!prev.all) {
        for (const item of cart) {
          updatedCheckedState[item.id] = true;
        }
      }

      return updatedCheckedState;
    });
  };

  const toggleCheckbox = (cartItemId: number) => {
    setCheckedState((prev) => {
      if (prev[cartItemId]) {
        const { [cartItemId]: _, ...updatedState } = prev;
        return {
          ...updatedState,
          all: false,
        };
      }
      return {
        ...prev,
        [cartItemId]: true,
      };
    });
  };

  return { toggleAllCheckbox, toggleCheckbox };
};
