import styled from 'styled-components';

import { Product } from '../../../types/Product';
import { AddCartButton } from './AddCartButton';
import { getCommaAddedNumber } from '../../../utils/number';

export const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  return (
    <Style.Container>
      <Style.ImageContainer>
        <Style.Image src={imageUrl} alt="상품 이미지" />
        <AddCartButton productId={id} />
      </Style.ImageContainer>
      <Style.DescriptionContainer>
        <Style.NamePriceContainer>
          <Style.Name>{name}</Style.Name>
          <Style.Price>{getCommaAddedNumber(price)}원</Style.Price>
        </Style.NamePriceContainer>
      </Style.DescriptionContainer>
    </Style.Container>
  );
};

const Style = {
  Container: styled.li`
    width: 240px;

    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  ImageContainer: styled.div`
    position: relative;

    & > :last-child {
      opacity: 94%;

      position: absolute;
      bottom: 18px;
      right: 15px;
    }
  `,

  Image: styled.img`
    width: 240px;
    height: 240px;

    border-radius: 8px;
  `,
  DescriptionContainer: styled.div`
    width: 240px;

    display: flex;
    justify-content: space-between;

    padding: 0 6px;
  `,
  NamePriceContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 240px;
    gap: 10px;
  `,
  Name: styled.span`
    font-size: 16px;
  `,
  Price: styled.span`
    font-size: 22px;
  `,
};
