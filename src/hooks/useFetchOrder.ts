import { OrderItem } from '../types/request';
import { END_POINTS } from '../constants/endPoints';
import useFetch from './useFetch';
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from 'recoil';
import { cartAtom } from '../store/cart';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/path';
import { orderAtom } from '../store/order';

const useFetchOrder = () => {
  const setCartList = useSetRecoilState(cartAtom);
  const refreshOrderList = useRecoilRefresher_UNSTABLE(orderAtom);
  const { handleFetch } = useFetch(END_POINTS.ORDERS);
  const navigate = useNavigate();

  const postOrders = async (orderItems: OrderItem[]) => {
    try {
      await handleFetch('POST', {
        orderItems,
        orderTime: new Date().toISOString(),
      });
      setCartList((prev) =>
        prev.filter((cart) => {
          if (orderItems.find((order) => order.id === cart.product.id))
            return false;
          return true;
        })
      );
      refreshOrderList();

      navigate(`${PATH.ORDER_LIST_PAGE}`);
    } catch (error) {
      alert('주문 요청이 실패했습니다.');
    }
  };

  return { postOrders };
};

export default useFetchOrder;
