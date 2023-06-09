import { useContext } from 'react';
import styled from 'styled-components';
import { ProductDataContext } from './ItemContainer';

const ProductQuantity = styled.strong<{ style: any }>`
  ${({ theme }) => theme.fonts.description}
`;

interface QuantityProps {
  style?: React.CSSProperties;
}

export const Quantity = ({ style }: QuantityProps) => {
  const { quantity } = useContext(ProductDataContext);

  return <ProductQuantity style={style}>{quantity}개</ProductQuantity>;
};
