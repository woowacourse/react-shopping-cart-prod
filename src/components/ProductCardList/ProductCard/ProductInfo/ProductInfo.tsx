import { memo } from 'react';
import styled from 'styled-components';
import { WIDTH } from '../../../../constants/mediaQuery';

interface ProductInfoProps {
  name: String;
  price: number;
}
const ProductInfo = ({ name, price }: ProductInfoProps) => {
  return (
    <Wrapper>
      <ProductName>{name}</ProductName>
      <ProductPrice>₩ {price.toLocaleString()}</ProductPrice>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: ${WIDTH.MD}) {
    width: 115px;
  }
`;

const ProductName = styled.span`
  font-size: 16px;
  letter-spacing: 0.5px;

  @media (max-width: ${WIDTH.MD}) {
    font-size: 9px;
  }
`;

const ProductPrice = styled.span`
  font-size: 20px;

  letter-spacing: 0.5px;

  @media (max-width: ${WIDTH.MD}) {
    font-size: 12px;
  }
`;

export default memo(ProductInfo);
