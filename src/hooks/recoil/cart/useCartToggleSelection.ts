import { useRecoilState } from 'recoil';
import withItemCheckBy from '@recoil/cart/selector/withItemCheckBy';

export const useCartToggleSelection = (cartId: number) => {
  const [isChecked, setIsChecked] = useRecoilState(withItemCheckBy(cartId));
  return {
    isChecked,
    toggleCheck: () => {
      setIsChecked(!isChecked);
    },
  };
};
