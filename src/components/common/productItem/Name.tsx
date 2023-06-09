import { useContext } from 'react';
import styled from 'styled-components';
import { ProductDataContext } from './ItemContainer';

const ProductName = styled.strong`
  ${({ theme }) => theme.fonts.description}
`;

interface NameProps {
  style?: React.CSSProperties;
}

export const Name = ({ style }: NameProps) => {
  const { name } = useContext(ProductDataContext);

  return <ProductName style={style}>{name}</ProductName>;
};
