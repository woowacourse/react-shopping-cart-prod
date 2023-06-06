import { styled } from 'styled-components';
import Price from '../common/Price';

interface Props {
  totalProductsPrice: number;
  deliveryFee: number;
  discountPrice: number;
  totalOrderPrice: number;
}

export default function PaymentDetail({
  totalProductsPrice,
  deliveryFee,
  discountPrice,
  totalOrderPrice,
}: Props) {
  return (
    <>
      <Style.Title>결제정보</Style.Title>
      <Style.DetailInfo>
        <Price tag="총 상품금액" price={totalProductsPrice} />
        <Price tag="배송비" price={deliveryFee} />
        <Price tag="할인금액" price={discountPrice} isDiscount={true} />
        <Price tag="총 결제금액" price={totalOrderPrice} color={'#1c8fed'} />
      </Style.DetailInfo>
    </>
  );
}

const Style = {
  Title: styled.h3`
    border-bottom: 2px solid var(--grey-300);
    padding: 20px;
  `,

  DetailInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    padding: 20px;
  `,
};
