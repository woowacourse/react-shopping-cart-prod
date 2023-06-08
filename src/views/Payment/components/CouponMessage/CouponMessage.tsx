import useCouponMessage from '@views/Payment/hooks/useCouponMessage';
import * as S from './CouponMessage.style'

function CouponMessage() {
  const message = useCouponMessage();

  return <S.Message>{message}</S.Message>;
}

export default CouponMessage;

