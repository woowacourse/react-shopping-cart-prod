import styled from 'styled-components';

import BorderBox from 'components/@shared/BorderBox/BorderBox.component';
import Button from 'components/@shared/Button/Button.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import HighlightText from 'components/@shared/HighlightText/HighlightText.component';

const PaymentAmountBox = styled(FlexBox).attrs({
  direction: 'column',
})`
  width: 35%;
  min-width: 300px;
`;

function PaymentAmountContainer({ count, total }) {
  return (
    <PaymentAmountBox as="article">
      <BorderBox as="h2" fontSize="24px" padding="30px">
        결제예상금액
      </BorderBox>
      <BorderBox padding="30px">
        <FlexBox justifyContent="space-between">
          <HighlightText>결제예상금액</HighlightText>
          <HighlightText>{total.toLocaleString()}원</HighlightText>
        </FlexBox>
        <Button width="100%" height="74px" mt="68px">
          주문하기({count}개)
        </Button>
      </BorderBox>
    </PaymentAmountBox>
  );
}

export default PaymentAmountContainer;
