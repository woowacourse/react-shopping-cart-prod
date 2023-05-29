import Spinner from '../../common/Spinner/Spinner';
import * as S from './OrderDetailList.styles';

const OrderDetailListFallback = () => {
  return (
    <S.OrderDetailListFallbackSpinnerContainer>
      <Spinner />
    </S.OrderDetailListFallbackSpinnerContainer>
  );
};

export default OrderDetailListFallback;
