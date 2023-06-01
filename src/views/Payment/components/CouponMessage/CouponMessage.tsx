import { useTotalPrice } from '@views/Cart/recoil/cartState';
import useCouponMessage from '@views/Payment/hooks/useCouponMessage';
import useCouponList, { useCouponSelected } from '@views/Payment/recoil/couponListState';
import { styled } from 'styled-components';

function CouponMessage() {
  const message = useCouponMessage();

  return <Message>{message}</Message>;
}

export default CouponMessage;

const Message = styled.span`
  padding-left: 1rem;
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 20px;
`;
