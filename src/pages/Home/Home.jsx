import React from 'react';

import { Pagination } from 'components/common';
import { ProductList } from 'components/product';

import * as S from 'pages/Home/Home.style';

function Home() {
  return (
    <S.Container>
      <ProductList />
      <Pagination />
    </S.Container>
  );
}

export default Home;
