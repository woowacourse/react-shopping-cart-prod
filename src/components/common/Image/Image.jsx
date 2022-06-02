import React from 'react';

import errorImage from 'components/common/Image/error.svg';

import * as S from 'components/common/Image/Image.style';

function Image({ src, alt, width = '100%' }) {
  const handleError = (e) => {
    e.target.src = errorImage;
  };

  return (
    <S.ImageContainer width={width}>
      <S.Image src={src} alt={alt} onError={handleError} />
    </S.ImageContainer>
  );
}

export default Image;
