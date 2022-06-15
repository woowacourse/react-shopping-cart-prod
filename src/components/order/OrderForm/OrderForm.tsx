import Button from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import * as Styled from './OrderForm.style';
function OrderForm({ amount }) {
  const navigate = useNavigate();

  const onClickPaymentButton = () => {
    if (amount === 0) {
      alert('상품을 선택해주세요');
      return;
    }
    navigate('./payments', { state: { amount } });
  };
  return (
    <Styled.Container>
      <Styled.Title>결제 금액</Styled.Title>

      <Styled.Amount>
        <span>총 결제 금액</span>
        <span>{amount}원</span>
      </Styled.Amount>

      <Button padding="20px" onClick={onClickPaymentButton}>
        {amount}원 결제하기
      </Button>
    </Styled.Container>
  );
}

export default OrderForm;
