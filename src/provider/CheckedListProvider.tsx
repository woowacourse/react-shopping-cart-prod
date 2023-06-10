import { createContext, useContext } from 'react';
import useCheckedCartList from '../hooks/useCheckedCartList';
import { CartProduct } from '../types/product';

interface CheckedCartListValue {
  checkedCartIdList: string[];
  checkCartItem: (id: string) => void;
  uncheckCartItem: (targetId: string) => void;
  checkAllCartItem: () => void;
  uncheckAllCartItem: () => void;
  getCheckedItemList: () => CartProduct[];
  isChecked: (id: string) => boolean;
  isAllChecked: () => boolean;
}

const CheckedCartListContext = createContext<CheckedCartListValue | null>(null);

const CheckedCartListProvider = ({ children }: React.PropsWithChildren) => {
  const value = useCheckedCartList();

  return (
    <CheckedCartListContext.Provider value={value}>
      {children}
    </CheckedCartListContext.Provider>
  );
};

export const useCheckedCartListValue = () => {
  const value = useContext(CheckedCartListContext);

  if (value === null) {
    throw new Error('CheckedCartListContext 에러');
  }

  return value;
};

export default CheckedCartListProvider;
