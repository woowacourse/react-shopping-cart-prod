import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getCarts } from 'redux/thunks/cart';
import { getProducts } from 'redux/thunks/product';

import Loading from 'components/@shared/Loading';
import CartContent from 'components/CartContent/CartContent';

import CONDITION from 'constants/condition';
import { CartStoreState, Product, ProductStoreState } from 'types/index';

function CartPage() {
  const condition = useSelector(
    (state: { product: ProductStoreState }) => state.product.condition
  );
  const productList = useSelector(
    (state: { product: ProductStoreState }) => state.product.productList
  );
  const cartItems = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cartItems
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (productList.length < 1) {
      dispatch(getProducts());
    }
  }, [dispatch, productList.length]);

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  const renderSwitch = () => {
    switch (condition) {
      case CONDITION.LOADING:
        return <Loading />;
      case CONDITION.COMPLETE:
        return <CartContent cartItems={cartItems} />;
      case CONDITION.ERROR:
        return (
          <Message>상품 정보를 가져오는데 오류가 발생하였습니다 😱</Message>
        );
    }
  };

  return (
    <StyledPage>
      <h2>장바구니</h2>
      <hr />
      {renderSwitch()}
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 800px;
  margin: 50px auto;

  h2 {
    margin-bottom: 20px;

    font-size: 20px;
    font-weight: 900;
  }

  hr {
    width: 100%;
  }
`;

const Message = styled.div`
  margin-top: 20px;

  font-size: 25px;
`;

export default CartPage;
