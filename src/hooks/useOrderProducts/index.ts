import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { CartItemType, MemberCouponType, OrderItemType } from '@Types/index';

import { fetchData } from '@Utils/api';

import cartItemsState from '@Atoms/cartItemsState';
import memberCouponState from '@Atoms/memberCouponState';
import orderListState from '@Atoms/orderListState';
import serverState from '@Atoms/serverState';
import usingCouponState from '@Atoms/usingCouponState';

import cartItemsAmountState from '@Selector/cartItemsAmountState';
import orderAmountState from '@Selector/orderAmountState';

import { ALERT_MESSAGE, DELIVERY_FEE, PRODUCT_DISCOUNT_LIMIT, PROUDCT_DISCOUNT_AMOUNT } from '@Constants/index';
import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

const useOrderProducts = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const setMemberCoupon = useSetRecoilState(memberCouponState);
  const setOrderList = useSetRecoilState(orderListState);
  const price = useRecoilValue(orderAmountState);
  const cartAmount = useRecoilValue(cartItemsAmountState);
  const usingCoupon = useRecoilValue(usingCouponState);

  const priceDisCount = price >= PRODUCT_DISCOUNT_LIMIT ? PROUDCT_DISCOUNT_AMOUNT : 0;
  const allPrice = price - priceDisCount;
  const deliveryFee = !allPrice ? 0 : DELIVERY_FEE;
  const selectedCartItemIds = cartItems.filter((item) => item.isSelected).map((item) => item.id);

  const deliveryFeeText = `${deliveryFee.toLocaleString()} 원`;
  const totalOrderPriceText = `${Math.max(allPrice - usingCoupon.discountAmount + deliveryFee, 0).toLocaleString()} 원`;

  const navigate = useNavigate();

  const server = useRecoilValue(serverState);
  const resetUsingCoupon = useResetRecoilState(usingCouponState);
  useEffect(() => {
    resetUsingCoupon();
  }, [server]);

  const orderProducts = async () => {
    if (selectedCartItemIds.length === 0) return alert(ALERT_MESSAGE.ORDER_ZERO_PRODUCT);

    const body = JSON.stringify({
      cartItemIds: selectedCartItemIds,
      couponId: usingCoupon.id,
      price: Math.max(allPrice - usingCoupon.discountAmount + deliveryFee, 0),
    });
    await fetchData({ url: FETCH_URL.orderList, method: FETCH_METHOD.POST, body, server });

    const memberCoupons = await fetchData<MemberCouponType[]>({
      url: FETCH_URL.memberCoupon,
      method: FETCH_METHOD.GET,
      server,
    });
    setMemberCoupon(memberCoupons);

    const fetchCartItems = await fetchData<CartItemType[]>({
      url: FETCH_URL.cartItems,
      method: FETCH_METHOD.GET,
      server,
    });

    const fetchOrderList = await fetchData<OrderItemType[]>({
      url: FETCH_URL.orderList,
      method: FETCH_METHOD.GET,
      server,
    });
    setOrderList(fetchOrderList);

    navigate('/order-list');

    const newCartItems = fetchCartItems.map((cartItem) => {
      return {
        ...cartItem,
        isSelected: false,
      };
    });
    setCartItems(newCartItems);
  };

  return {
    price,
    usingCoupon,
    priceDisCount,
    cartAmount,
    deliveryFeeText,
    totalOrderPriceText,
    orderProducts,
  };
};

export default useOrderProducts;
