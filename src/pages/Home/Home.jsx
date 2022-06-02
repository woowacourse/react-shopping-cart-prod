import React from 'react';

import * as S from 'pages/Home/Home.style';

import { Pagination } from 'components/common';

import { ProductList } from 'components/product';

function Home() {
  return (
    <S.Container>
      <ProductList />
      <Pagination />
    </S.Container>
  );
}

export default Home;
