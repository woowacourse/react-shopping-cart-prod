import { useRecoilState, useRecoilValue } from 'recoil';
import { DELIVERY_FEE, ROUTE_PATH } from '../constants';
import { ORDER_URL } from '../constants/url';
import {
  cartState,
  checkedItemList,
  selectedCoupon,
  serverState,
  totalPriceSelector,
} from '../recoil';
import { useFetchData } from './useFetchData';
import { useGoToAnotherPage } from './useGoToAnotherPage';

export const useOrder = () => {
  const server = useRecoilValue(serverState);
  const { api } = useFetchData();

  const checkedItemIdList = useRecoilValue<number[]>(checkedItemList);
  const totalPrice = useRecoilValue(totalPriceSelector);
  const couponId = useRecoilValue(selectedCoupon).id;
  const [cart, setCart] = useRecoilState(cartState);

  const goToPage = useGoToAnotherPage();

  const orderProducts = () => {
    api
      .post(`${server}${ORDER_URL}`, {
        cartItemIdList: checkedItemIdList,
        totalPrice,
        deliveryFee: DELIVERY_FEE,
        couponId: couponId ? couponId : null,
      })
      .then(() => {
        setCart(cart.filter((cartItem) => !checkedItemIdList.includes(cartItem.id)));

        goToPage(ROUTE_PATH.ORDER_LIST_PAGE);
      })
      .catch((error) => alert(error.message));
  };

  return { orderProducts };
};
