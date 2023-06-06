import { styled } from 'styled-components';

interface Props {
  orderTotalPrice: number;
}

const PaymentsInfo = ({ orderTotalPrice }: Props) => {
  return (
    <Style.Wrapper>
      <Style.TitleWrapper>
        <Style.Title>결제금액 정보</Style.Title>
      </Style.TitleWrapper>
      <Style.TotalPaymentAmountWrapper>
        <Style.Title>총 결제 금액</Style.Title>
        <Style.TotalPaymentAmount>{orderTotalPrice}</Style.TotalPaymentAmount>
      </Style.TotalPaymentAmountWrapper>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.article`
    border: solid 1px var(--gray-color);
    width: 80%;
  `,

  TitleWrapper: styled.section`
    display: flex;
    align-items: center;
    padding: 25px 20px;
    background-color: var(--gray-color-300);
    border-bottom: solid var(--black-color) 0.5px;
  `,

  Title: styled.h4``,

  TotalPaymentAmountWrapper: styled.span`
    display: flex;
    justify-content: space-between;
    padding: 25px 20px;
  `,

  TotalPaymentAmount: styled.span``,
};

export default PaymentsInfo;
