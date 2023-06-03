import useCouponMessage from '@views/Payment/hooks/useCouponMessage';

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
