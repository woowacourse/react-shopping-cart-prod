import { OrderPointCostContext } from 'context/OrderPointCostProvider';
import { useContext } from 'react';

const useOrderPointCostContext = () => {
  const orderPointCostState = useContext(OrderPointCostContext);
  if (!orderPointCostState) throw new Error('유저 사용 포인트 context에 제공되는 값이 없습니다.');

  return orderPointCostState;
};

export default useOrderPointCostContext;
