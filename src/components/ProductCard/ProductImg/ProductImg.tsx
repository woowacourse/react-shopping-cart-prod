import { memo } from 'react';
import styled from 'styled-components';

interface ProductImgProps {
  imageUrl: string;
  isProductCard?: boolean;
}

const ProductImg = ({ imageUrl, isProductCard = false }: ProductImgProps) => {
  return <Img src={imageUrl} isProductCard={isProductCard} />;
};

const Img = styled.img<{ isProductCard: boolean }>`
  width: 100%;

  transition: ${({ isProductCard }) =>
    isProductCard && 'transform 0.2s ease-in-out'};

  &:hover {
    transform: ${({ isProductCard }) => isProductCard && 'scale(1.1)'};
  }
`;

export default memo(ProductImg);
