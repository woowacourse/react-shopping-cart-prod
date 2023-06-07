import { useRecoilValue } from 'recoil';
import useCartService from '../../../hooks/useCartService';
import {
  cartPriceSelector,
  finalPriceSelector,
} from '../../../recoil/selectors';
import {
  serverOriginState,
  pointsState,
  checkedItemIdsState,
} from '../../../recoil/atoms';
import useToast from '../../common/Toast/useToast';
import { orderCart } from '../../../remotes/order';
import { ORDERS_BASE_URL } from '../../../constants/api';
import { useNavigate } from 'react-router-dom';

const usePurchaser = () => {
  const { showToast } = useToast();
  const cartPrice = useRecoilValue(cartPriceSelector);
  const finalPrice = useRecoilValue(finalPriceSelector);
  const { selectedPoints } = useRecoilValue(pointsState);
  const serverOrigin = useRecoilValue(serverOriginState);
  const checkedItemIds = useRecoilValue(checkedItemIdsState);
  const navigate = useNavigate();
  const { updateCart } = useCartService();

  const purchase = async () => {
    if (cartPrice <= 0 || finalPrice < 0) {
      return;
    }

    try {
      const location = await orderCart(
        `${serverOrigin}${ORDERS_BASE_URL}`,
        [...checkedItemIds],
        selectedPoints,
      );

      if (location) {
        showToast('success', '주문을 성공적으로 완료했습니다!');
        navigate(location);
      }

      updateCart();
    } catch (e) {
      if (e instanceof Error) {
        showToast('error', e.message);
      }
    }
  };

  return { purchase };
};

export default usePurchaser;
