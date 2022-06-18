import { usePaymentsAmount } from 'hooks/usePaymentsAmount';
import { CartItem } from 'types/domain';
import { formatDecimal } from 'utils';
import { Styled } from './styles';

const PaymentsAmount = ({ cartList }: { cartList: CartItem[] }) => {
  const { totalPrice } = usePaymentsAmount(cartList);

  const onClick = () => {
    alert('주문하였습니다!!');
  };

  return (
    <Styled.PaymentsAmount>
      <Styled.Header>결제 예상금액</Styled.Header>
      <Styled.Bottom>
        <Styled.TotalPrice>
          <Styled.UnderLineBox>
            <div>총 결제액</div>
          </Styled.UnderLineBox>
          <Styled.UnderLineBox>{formatDecimal(totalPrice)}원</Styled.UnderLineBox>
        </Styled.TotalPrice>
        <Styled.OrderButton onClick={onClick}>주문하기</Styled.OrderButton>
      </Styled.Bottom>
    </Styled.PaymentsAmount>
  );
};

export default PaymentsAmount;
