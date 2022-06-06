import React from 'react';

import * as S from 'components/common/Image/Image.style';
import errorImage from 'components/common/Image/error.svg';

function Image({ src, alt, width = '100%', backgroundColor = '', }) {
  const handleError = (e) => {
    e.target.src = errorImage;
  };

  return (
    <S.ImageContainer width={width} backgroundColor={backgroundColor}>
      <S.Image src={src} alt={alt} onError={handleError} />
    </S.ImageContainer>
  );
}

export default Image;
