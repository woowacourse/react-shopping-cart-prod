import React from 'react';

import { CartProductList, OrderContainer } from 'components/cart';
import { PageTitle } from 'components/common';

import * as Styled from 'pages/ShoppingCart/ShoppingCart.style';

function ShoppingCart() {
  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <Styled.ContentContainer>
        <CartProductList />
        <OrderContainer />
      </Styled.ContentContainer>
    </>
  );
}

export default ShoppingCart;
