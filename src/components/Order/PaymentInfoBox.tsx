import styled from 'styled-components';

interface PaymentInfoBoxProps {
  totalPrice: number;
}

const PaymentInfoBox = ({ totalPrice }: PaymentInfoBoxProps) => {
  return (
    <PaymentInfoBoxContainer>
      <PaymentInfoBoxHeader>결제 금액 정보</PaymentInfoBoxHeader>
      <PaymentInfoBoxContent>
        <span>총 결제금액</span>
        <span>{totalPrice}원</span>
      </PaymentInfoBoxContent>
    </PaymentInfoBoxContainer>
  );
};

const PaymentInfoBoxContainer = styled.div`
  width: 560px;
  height: 207px;
  margin-bottom: 100px;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  float: right;
`;

const PaymentInfoBoxHeader = styled.div`
  height: 92px;
  padding: 33px 0 0 30px;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
  font-size: 28px;
  font-weight: 600;
`;

const PaymentInfoBoxContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 45px 30px 0 30px;
  font-size: 24px;
  font-weight: 600;
`;

export default PaymentInfoBox;
