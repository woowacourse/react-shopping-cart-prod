import styled from 'styled-components';
import { getCommaAddedNumber } from '../../utils/number';

interface OrderItemProps {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export const OrderItem = ({
  imageUrl,
  name,
  price,
  quantity,
}: OrderItemProps) => {
  return (
    <Style.Container>
      <Style.ProductImage src={imageUrl} alt={`${name} 이미지`} />
      <Style.DescriptionContainer>
        <Style.ProductName>{name}</Style.ProductName>
        <Style.ProductPriceAndQuantity>
          {getCommaAddedNumber(price)}원 / 수량: {quantity}개
        </Style.ProductPriceAndQuantity>
      </Style.DescriptionContainer>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    width: 1320px;
    height: 220px;

    display: flex;
    align-items: center;
    gap: 33px;
    padding: 0 26px;

    border: 1px solid rgba(170, 170, 170, 1);
    border-top: none;

    @media screen and (max-width: 480px) {
      width: 90vw;
      height: 120px;

      gap: 15px;
      padding: 0 15px;
    }
  `,
  ProductImage: styled.img`
    width: 142px;
    height: 142px;

    @media screen and (max-width: 480px) {
      width: 80px;
      height: 80px;
    }
  `,
  DescriptionContainer: styled.div`
    height: 142px;

    display: flex;
    flex-direction: column;
    gap: 32px;

    @media screen and (max-width: 480px) {
      height: 80px;
      gap: 10px;
    }
  `,
  ProductName: styled.h2`
    font-size: 20px;
    color: #5f5f5f;
  `,
  ProductPriceAndQuantity: styled.h3`
    font-size: 16px;
    color: rgba(136, 136, 136, 1);
  `,
};
