import React from 'react';

import * as S from 'components/common/PageTitle/PageTitle.style';

function PageTitle({ children }) {
  return <S.Title>{children}</S.Title>;
}

export default PageTitle;
