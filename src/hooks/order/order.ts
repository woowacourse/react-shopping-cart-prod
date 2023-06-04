import { cartState } from './../../atoms/cart';
import { useNavigate } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { postOrder } from '../../apis/order';
import { selectedItemsState } from '../../atoms/cart';
import { ordersSelector } from '../../atoms/order';
import { PAGE_ROUTES } from '../../constants/routes';
import { waitForMutation } from '../../utils/waitFor';
import { getParsedLocation } from '../../utils/getParsedLocation';
import { selectedCouponsState } from '../../atoms/coupon';

export const useOrderMutate = () => {
  const navigate = useNavigate();
  const refreshCart = useRecoilRefresher_UNSTABLE(cartState);
  const refreshOrder = useRecoilRefresher_UNSTABLE(ordersSelector);
  const selectedCoupons = useRecoilValue(selectedCouponsState);
  const selectedItems = useRecoilValue(selectedItemsState);

  const postOrderMutate = waitForMutation(postOrder, {
    onSuccess(_, { headers }) {
      const orderId = getParsedLocation(headers);

      refreshCart();
      refreshOrder();
      navigate(`${PAGE_ROUTES.ORDER_DETAIL}?id=${orderId}`);
    },
  });

  const order = () => {
    const cartItemIds = [...selectedItems];
    const couponIds = [...selectedCoupons.keys()];

    if (cartItemIds.length)
      postOrderMutate({
        cartItemIds,
        couponIds,
      });
  };

  return { order };
};
