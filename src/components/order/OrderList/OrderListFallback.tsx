import Spinner from '../../common/Spinner/Spinner';
import * as S from './OrderList.styles';

const OrderListFallback = () => {
  return (
    <S.OrderListFallbackSpinnerContainer>
      <Spinner />
    </S.OrderListFallbackSpinnerContainer>
  );
};

export default OrderListFallback;
