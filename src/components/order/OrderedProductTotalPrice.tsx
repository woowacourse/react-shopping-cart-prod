import { styled } from 'styled-components';

interface OrderedProductTotalPriceProps {
  totalPrice: number;
  usedPoint: number;
}

export const OrderedProductTotalPrice = ({
  totalPrice,
  usedPoint,
}: OrderedProductTotalPriceProps) => {
  return (
    <>
      <Style.PaymentAmount>결제금액 정보</Style.PaymentAmount>
      <Style.TotalPriceInformations>
        <Style.Information>
          <span>총 결제금액</span>
          <span>{(totalPrice - usedPoint).toLocaleString('ko-KR')}원</span>
        </Style.Information>
        <Style.Information>
          <span>사용한 포인트</span>
          <span>{usedPoint.toLocaleString('ko-KR')}원</span>
        </Style.Information>
      </Style.TotalPriceInformations>
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

    @media screen and (max-width: 700px) {
      width: 500px;
    }

    @media screen and (max-width: 600px) {
      width: 300px;

      font-size: 20px;
    }
  `,

  TotalPriceInformations: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    width: 560px;
    height: 115px;

    padding: 0 30px;

    background: #ffffff;
    border: 1px solid #aaaaaa;

    @media screen and (max-width: 700px) {
      width: 500px;
    }

    @media screen and (max-width: 600px) {
      width: 300px;
    }
  `,

  Information: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 560px;

    padding: 0 30px;

    & > span {
      font-size: 24px;
      line-height: 24px;

      color: #333333;
    }

    @media screen and (max-width: 700px) {
      width: 500px;
    }

    @media screen and (max-width: 600px) {
      width: 300px;

      & > span {
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;

        letter-spacing: 0.5px;

        color: #333333;
      }
    }
  `,
};
