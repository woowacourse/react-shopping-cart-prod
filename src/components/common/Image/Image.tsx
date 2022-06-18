import { useState } from 'react';
import * as Styled from './Image.style';

interface ImagePropsType {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

function Image({ src, alt, width = '100%', height = '100%' }: ImagePropsType) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setLoaded] = useState(false);

  const onErrorImage = () => {
    setImgSrc('./assets/images/emptyImage.png');
  };

  const onLoadImage = () => {
    setLoaded(true);
  };

  return (
    <Styled.ImageContainer width={width} height={height}>
      <Styled.Image
        src={imgSrc}
        alt={alt}
        onError={onErrorImage}
        onLoad={onLoadImage}
        isLoaded={isLoaded}
      />
    </Styled.ImageContainer>
  );
}

export default Image;
