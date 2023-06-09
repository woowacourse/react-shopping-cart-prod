import { useContext } from 'react';
import styled from 'styled-components';
import { ProductDataContext } from './ItemContainer';

const ProductImage = styled.img`
  height: 100px;
  width: 100px;
`;

interface ImageProps {
  style?: React.CSSProperties;
}

export const Image = ({ style }: ImageProps) => {
  const { image } = useContext(ProductDataContext);

  return <ProductImage style={style} src={image} alt={image} />;
};
