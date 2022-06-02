import React from 'react';

import * as S from 'pages/ShoppingCart/ShoppingCart.style';

import { PageTitle } from 'components/common';

import { CartProductList, OrderContainer } from 'components/cart';

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
