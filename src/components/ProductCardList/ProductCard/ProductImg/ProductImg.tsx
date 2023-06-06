import { memo, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface ProductImgProps {
  imageUrl: string;
  isProductCard?: boolean;
}

const ProductImg = ({ imageUrl, isProductCard = false }: ProductImgProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      <Img
        src={imageUrl}
        isProductCard={isProductCard}
        isImageLoaded={isImageLoaded}
        onLoad={handleImageLoad}
      />
      <Skeleton isImageLoaded={isImageLoaded} />
    </>
  );
};

export default memo(ProductImg);

const skeletonAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const Skeleton = styled.div<{ isImageLoaded: boolean }>`
  display: ${({ isImageLoaded }) => (!isImageLoaded ? 'block' : 'none')};
  width: 100%;
  height: 100%;

  background: linear-gradient(90deg, #eee 0px, #f5f5f5 50%, #eee 100%);
  background-size: 200px 100%;
  animation: ${skeletonAnimation} 1.5s infinite;
`;

const Img = styled.img<{ isProductCard: boolean; isImageLoaded: boolean }>`
  display: ${({ isImageLoaded }) => (isImageLoaded ? 'block' : 'none')};

  width: 100%;

  transition: ${({ isProductCard }) =>
    isProductCard && 'transform 0.2s ease-in-out'};

  &:hover {
    transform: ${({ isProductCard }) => isProductCard && 'scale(1.1)'};
  }
`;
