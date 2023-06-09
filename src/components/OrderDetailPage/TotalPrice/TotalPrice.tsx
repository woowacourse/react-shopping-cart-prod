import { Order } from '../../../types/order';
import * as S from './TotalPrice.styles';

interface TotalPriceProps {
  totalPrice: Order['totalPrice'];
}

const TotalPrice: React.FC<TotalPriceProps> = ({ totalPrice }) => {
  return (
    <S.Root>
      <S.Info justify="space-between" align="center">
        <span>결제금액 정보</span>
      </S.Info>
      <S.Price justify="space-between" align="center">
        <span>총 결제금액</span>
        <span>{totalPrice.toLocaleString()}원</span>
      </S.Price>
    </S.Root>
  );
};

export default TotalPrice;
