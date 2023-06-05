import { useRefreshableRecoilValue } from './../common/useRefreshableAtom';
import { cartState } from './../../atoms/cart';
import { useNavigate } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
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
  const refreshCoupons = useRecoilRefresher_UNSTABLE(selectedCouponsState);

  const selectedItems = useRefreshableRecoilValue(selectedItemsState);
  const couponIds = useRefreshableRecoilValue(selectedItemCouponIdList);
  const cartItemIds = [...selectedItems];

  const postOrderMutate = waitForMutation(postOrder, {
    onSuccess(_, { headers }) {
      const orderId = getParsedLocation(headers);

      refreshCart();
      refreshOrder();
      refreshCoupons();
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
