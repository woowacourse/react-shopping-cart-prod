import React from 'react';

import * as S from 'components/common/ErrorContainer/ErrorContainer.style';

function ErrorContainer({ children }) {
  return <S.Container>{children}</S.Container>;
}

export default ErrorContainer;
