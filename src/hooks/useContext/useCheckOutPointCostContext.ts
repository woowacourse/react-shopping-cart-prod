import { CheckOutPointCostActionsContext, CheckOutPointCostValueContext } from 'context/CheckOutPointCostProvider';
import { useContext } from 'react';

export const useCheckOutPointCostValueContext = () => {
  const orderPointCostValueState = useContext(CheckOutPointCostValueContext);
  if (!orderPointCostValueState) throw new Error('유저 사용 포인트 context에 제공되는 값이 없습니다.');

  return orderPointCostValueState;
};

export const useCheckOutPointCostActionsContext = () => {
  const orderPointCostActionsState = useContext(CheckOutPointCostActionsContext);
  if (!orderPointCostActionsState) throw new Error('유저 사용 포인트 context에 제공되는 값이 없습니다.');

  return orderPointCostActionsState;
};
