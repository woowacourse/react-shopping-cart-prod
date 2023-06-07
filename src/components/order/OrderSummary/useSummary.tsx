import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { savedPointsQuery, orderDetailQuery } from '../../../recoil/selectors';
import { pointsState } from '../../../recoil/atoms';
import { useEffect } from 'react';
import usePoints from '../../../hooks/usePoints';

const useOrderSummary = () => {
  const { orderId } = useParams();
  const { syncPoints } = usePoints();

  if (!orderId) {
    throw new Error('잘못된 주소로 접속하셨습니다.');
  }

  useEffect(() => {
    syncPoints();
  }, []);

  const savedPoints = useRecoilValue(savedPointsQuery(orderId));
  const { price } = useRecoilValue(orderDetailQuery(orderId));
  const { maxPoints } = useRecoilValue(pointsState);

  return { savedPoints, currentPoints: maxPoints, price };
};

export default useOrderSummary;
