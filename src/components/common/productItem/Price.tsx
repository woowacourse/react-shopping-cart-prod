import type React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { ProductDataContext } from './ItemContainer';

const ProductPrice = styled.strong`
  ${({ theme }) => theme.fonts.description}
`;

interface PriceProps {
  style?: React.CSSProperties;
}

export const Price = ({ style }: PriceProps) => {
  const { price } = useContext(ProductDataContext);

  return <ProductPrice style={style}>{price.toLocaleString()}원</ProductPrice>;
};
