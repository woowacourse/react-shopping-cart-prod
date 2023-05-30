import { useRecoilValue } from 'recoil';

import orderApis from '../apis/order';
import {
  checkedCartProductState,
  checkedPriceState,
} from '../states/checkedCartProducts';
import { DELIVERY_FEE } from '../constants/fee';

const useOrder = () => {
  const checkedCartProducts = useRecoilValue(checkedCartProductState);
  const totalProductPrice = useRecoilValue(checkedPriceState);

  const cartItemIds = checkedCartProducts.map((cartProduct) => cartProduct.id);
  const totalPrice = totalProductPrice + DELIVERY_FEE;

  const addOrder = () => {
    orderApis().postOrder({ cartItemIds, totalPrice });
  };

  return { addOrder };
};

export default useOrder;
