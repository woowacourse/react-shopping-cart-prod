import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SkeletonImg = ({ placeholderSrc, src, width, height }: any) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [imageSize, setImageSize] = useState({ width, height });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setImageSize({ width, height });
    };
  }, [src, width, height]);

  const imageProps = {
    src: imgSrc,
    width: width || imageSize.width,
    height: height || imageSize.height,
  };

  return <ProductImage {...imageProps} />;
};

export default SkeletonImg;

type ImageProps = {
  width?: number;
  height?: number;
};

const ProductImage = styled.img<ImageProps>`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: ${(props) => (props.height ? `${props.height}px` : '100%')};
  border-radius: 4px;
  object-fit: cover;
  filter: brightness(96%);

  @media (max-width: 360px) {
    width: 100%;
    height: 100%;
  }
`;
