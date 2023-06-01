import { useRecoilState, useRecoilValue } from 'recoil';
import { DELIVERY_FEE } from '../constants';
import { ORDER_URL } from '../constants/url';
import { cartState, checkedItemList, serverState, totalPriceSelector } from '../recoil';
import { useFetchData } from './useFetchData';

export const useOrder = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const checkedItemIdList = useRecoilValue<number[]>(checkedItemList);
  const totalPrice = useRecoilValue(totalPriceSelector);
  const server = useRecoilValue(serverState);
  const { api } = useFetchData();

  const orderProducts = () => {
    api
      .post(`${server}${ORDER_URL}`, {
        cartItemIdList: checkedItemIdList,
        totalPrice: totalPrice,
        deliveryFee: DELIVERY_FEE,
      })
      .then(() => {
        setCart([...cart].filter((cartItem) => !checkedItemIdList.includes(cartItem.id)));
      })
      .catch((error) => alert(error.message));
  };

  return { orderProducts };
};
