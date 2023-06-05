import { useRefreshableRecoilValue } from './../common/useRefreshableAtom';
import { cartState } from './../../atoms/cart';
import { useNavigate } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE, useResetRecoilState } from 'recoil';
import { postOrder } from '../../apis/order';
import { selectedItemsState } from '../../atoms/cart';
import { ordersSelector } from '../../atoms/order';
import { PAGE_ROUTES } from '../../constants/routes';
import { waitForMutation } from '../../utils/waitFor';
import { getParsedLocation } from '../../utils/getParsedLocation';
import {
  selectedItemCouponIdList,
  selectedCouponsState,
} from '../../atoms/coupon';

export const useOrderMutate = () => {
  const navigate = useNavigate();
  const refreshCart = useRecoilRefresher_UNSTABLE(cartState);
  const refreshOrder = useRecoilRefresher_UNSTABLE(ordersSelector);
  const resetCoupons = useResetRecoilState(selectedCouponsState);

  const selectedItems = useRefreshableRecoilValue(selectedItemsState);
  const couponIds = useRefreshableRecoilValue(selectedItemCouponIdList);
  const cartItemIds = [...selectedItems];

  const postOrderMutate = waitForMutation(postOrder, {
    onSuccess(_, { headers }) {
      const orderId = getParsedLocation(headers);

      refreshCart();
      refreshOrder();
      resetCoupons();
      navigate(`${PAGE_ROUTES.ORDER_DETAIL}?id=${orderId}`);
    },
  });

  const order = () => {
    if (cartItemIds.length)
      postOrderMutate({
        cartItemIds,
        couponIds,
      });
  };

  return { order };
};
