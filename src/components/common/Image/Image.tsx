import Placeholder from '@/components/common/Placeholder/Placeholder';
import { useRef, useState } from 'react';
import * as Styled from './Image.style';
interface ImagePropsType {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const emptyImg = './assets/empty-img.png';

function Image({ src, alt, width = '100%', height = '100%' }: ImagePropsType) {
  const imageRef = useRef(null);
  const [isLoad, setIsLoad] = useState(false);

  const onImageLoad = () => {
    setIsLoad(true);
  };

  const onImageError = () => {
    (imageRef.current as any).src = emptyImg;
  };
  return (
    <Styled.ImageContainer width={width} height={height}>
      {!isLoad && <Placeholder aspectRatio="1/1" />}

      <Styled.Image
        src={src}
        alt={alt}
        isLoad={isLoad}
        ref={imageRef}
        onLoad={onImageLoad}
        onError={onImageError}
      />
    </Styled.ImageContainer>
  );
}

export default Image;
