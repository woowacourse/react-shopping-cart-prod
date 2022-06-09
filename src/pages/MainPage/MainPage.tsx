import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getCarts } from 'redux/thunks/cart';
import { getProducts } from 'redux/thunks/product';

import Loading from 'components/@shared/Loading';
import ProductCardGrid from 'components/ProductCardGrid/ProductCardGrid';

import CONDITION from 'constants/condition';
import { ProductStoreState } from 'types/index';
import { isLogin } from 'utils/auth';

function MainPage() {
  const condition = useSelector(
    (state: { product: ProductStoreState }) => state.product.condition
  );
  const productList = useSelector(
    (state: { product: ProductStoreState }) => state.product.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (productList.length < 1) {
      dispatch(getProducts());
    }

    //TODO: 코드가 더럽다.
    isLogin() && dispatch(getCarts());
  }, [dispatch, productList]);

  const renderSwitch = useCallback(() => {
    switch (condition) {
      case CONDITION.LOADING:
        return <Loading />;
      case CONDITION.COMPLETE:
        return <ProductCardGrid productList={productList} />;
      case CONDITION.ERROR:
        return (
          <Message>상품 정보를 가져오는데 오류가 발생하였습니다 😱</Message>
        );
    }
  }, [condition, productList]);

  return <StyledPage>{renderSwitch()}</StyledPage>;
}

const StyledPage = styled.div`
  margin: 60px 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  font-size: 25px;
`;

export default MainPage;
