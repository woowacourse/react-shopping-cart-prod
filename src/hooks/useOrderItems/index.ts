import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { CartItemType, CouponType, OrderItemType } from '@Types/index';

import { fetchData } from '@Utils/api';

import cartItemsState from '@Atoms/cartItemsState';
import myCouponState from '@Atoms/myCouponState';
import orderItemsState from '@Atoms/orderItemsState';
import selectedCouponIdState from '@Atoms/selectedCouponIdState';
import serverState from '@Atoms/serverState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

const useOrderItems = () => {
  const server = useRecoilValue(serverState);
  const couponId = useRecoilValue(selectedCouponIdState);
  const [cartItems, setCartItems] = useRecoilState<CartItemType[]>(cartItemsState);
  const setOrderItems = useSetRecoilState(orderItemsState);
  const setMyCoupons = useSetRecoilState(myCouponState);

  const orderCartItems = async (totalOrderPrice: string) => {
    const selectedCartItems = cartItems.filter((cartItem) => cartItem.isSelected).map((cartItem) => cartItem.id);

    if (!selectedCartItems.length) return alert('선택된 상품이 없습니다.');

    const price = Number(totalOrderPrice.replace(/,|원|\s/g, ''));
    const body = JSON.stringify({
      id: selectedCartItems,
      price,
      couponId,
    });

    await fetchData<{ ok: boolean }>({ url: FETCH_URL.orders, method: FETCH_METHOD.POST, body, server });

    const newOrderItems = await fetchData<OrderItemType[]>({ url: FETCH_URL.orders, method: FETCH_METHOD.GET, server });
    setOrderItems(newOrderItems);

    const newMyCoupons = await fetchData<CouponType[]>({ url: FETCH_URL.myCoupon, method: FETCH_METHOD.GET, server });
    setMyCoupons(newMyCoupons);

    setCartItems(cartItems.filter((cartItem) => !cartItem.isSelected));
  };

  return { orderCartItems };
};

export default useOrderItems;
