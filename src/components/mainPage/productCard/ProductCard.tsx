import styled from 'styled-components';

import { Product } from '../../../types/Product';
import { AddCartButton } from './AddCartButton';
import { getCommaAddedNumber } from '../../../utils/number';

export const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  return (
    <Style.Container>
      <Style.Image src={imageUrl} alt="상품 이미지" />
      <Style.AddCartButtonContainer>
        <AddCartButton productId={id} />
      </Style.AddCartButtonContainer>
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
    width: 283px;
    height: 358px;

    display: flex;
    flex-direction: column;
    gap: 18px;

    position: relative;

    @media screen and (max-width: 480px) {
      width: 150px;
      height: 100%;
    }
  `,
  Image: styled.img`
    width: 283px;
    height: 283px;

    @media screen and (max-width: 480px) {
      width: 150px;
      height: 150px;
    }
  `,
  DescriptionContainer: styled.div`
    width: 283px;

    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 480px) {
      width: 150px;
    }
  `,
  NamePriceContainer: styled.div`
    display: flex;
    flex-direction: column;

    width: 201px;
    gap: 10px;
  `,
  Name: styled.span`
    font-size: 16px;

    @media screen and (max-width: 480px) {
      font-size: 12px;
    }
  `,
  Price: styled.span`
    font-size: 20px;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  `,
  AddCartButtonContainer: styled.div`
    position: absolute;
    top: calc(283px - 28px - 10px);
    right: 10px;

    @media screen and (max-width: 480px) {
      top: calc(150px - 28px - 10px);
      right: 5px;
    }
  `,
};
