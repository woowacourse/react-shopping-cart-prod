import { Spinner } from '@components/common/Spinner/Spinner';
import * as styled from './OrderSummarySkeleton.styled';

export const OrderSummarySkeleton = () => {
  return (
    <styled.OrderSummarySkeleton>
      <Spinner size="m" />
    </styled.OrderSummarySkeleton>
  );
};
