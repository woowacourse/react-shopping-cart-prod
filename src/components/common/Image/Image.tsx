import Placeholder from '@/components/common/Placeholder/Placeholder';
import { useState } from 'react';
import * as Styled from './Image.style';
interface ImagePropsType {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

function Image({ src, alt, width = '100%', height = '100%' }: ImagePropsType) {
  const [isLoad, setIsLoad] = useState(false);

  return (
    <Styled.ImageContainer width={width} height={height}>
      {!isLoad && <Placeholder aspectRatio="1/1" />}

      <Styled.Image
        src={src || './assets/empty-img.png'}
        alt={alt}
        onLoad={() => {
          setIsLoad(true);
        }}
        isLoad={isLoad}
      />
    </Styled.ImageContainer>
  );
}

export default Image;
