import React from 'react';

import { CartProductList, OrderContainer } from 'components/cart';
import { PageTitle } from 'components/common';

import * as S from 'pages/ShoppingCart/ShoppingCart.style';

function ShoppingCart() {
  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <S.ContentContainer>
        <CartProductList />
        <OrderContainer />
      </S.ContentContainer>
    </>
  );
}

export default ShoppingCart;
