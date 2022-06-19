import React from 'react';

import * as S from 'components/common/Image/Image.style';
import errorImage from 'components/common/Image/error.svg';

import theme from 'styles/Theme';

function Image({
  src,
  alt,
  width = '100%',
  backgroundColor = theme.colorConfig.skeleton,
}) {
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
