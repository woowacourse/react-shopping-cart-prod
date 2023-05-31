import { useSetRecoilState } from 'recoil';

import { CartItemType, CouponType, OrderItemType, Servers } from '@Types/index';

import { fetchData } from '@Utils/api';

import cartItemsState from '@Atoms/cartItemsState';
import myCouponState from '@Atoms/myCouponState';
import orderItemsState from '@Atoms/orderItemsState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

const useServer = () => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const setOrderItems = useSetRecoilState(orderItemsState);
  const setMyCoupons = useSetRecoilState(myCouponState);

  const toggleServer = async (server: Servers) => {
    const cartItems = await fetchData<CartItemType[]>({ url: FETCH_URL.cartItems, method: FETCH_METHOD.GET, server });
    setCartItems(cartItems);

    const orderItems = await fetchData<OrderItemType[]>({ url: FETCH_URL.orders, method: FETCH_METHOD.GET, server });
    setOrderItems(orderItems);

    const myCoupons = await fetchData<CouponType[]>({ url: FETCH_URL.myCoupon, method: FETCH_METHOD.GET, server });
    setMyCoupons(myCoupons);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { toggleServer };
};

export default useServer;
