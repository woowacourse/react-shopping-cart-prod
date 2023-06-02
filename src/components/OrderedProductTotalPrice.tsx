import { styled } from 'styled-components';

interface OrderedProductTotalPriceProps {
  totalPrice:number
}

export const OrderedProductTotalPrice = ({totalPrice}:OrderedProductTotalPriceProps) => {
  return (
    <>
      <Style.PaymentAmount>결제금액 정보</Style.PaymentAmount>
      <Style.TotalPriceInformation>
        <Style.TotalPriceText>총 결제금액</Style.TotalPriceText>
        <Style.TotalPrice>{totalPrice}원</Style.TotalPrice>
      </Style.TotalPriceInformation>
    </>
  );
};

const Style = {
  PaymentAmount: styled.div`
    display: flex;
    align-items: center;

    width: 560px;
    height: 92px;

    padding: 0 30px;

    background: #f6f6f6;
    border: 1px solid #aaaaaa;

    font-weight: 700;
    font-size: 28px;
    line-height: 28px;

    letter-spacing: 0.5px;

    color: #333333;
  `,

  TotalPriceInformation: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 560px;
    height: 115px;

    padding: 0 30px;

    background: #ffffff;
    border: 1px solid #aaaaaa;
  `,

  TotalPriceText: styled.span`
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;

    letter-spacing: 0.5px;

    color: #333333;
  `,

  TotalPrice: styled.span`
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;

    letter-spacing: 0.5px;

    color: #333333;
  `,
};
