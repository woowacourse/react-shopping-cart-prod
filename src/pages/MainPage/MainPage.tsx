import { useCallback, useEffect } from 'react';

import { Loading } from 'components/@shared';
import ProductCardGrid from 'components/ProductCardGrid/ProductCardGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from 'redux/thunks';
import { ProductStoreState } from 'types';

import CONDITION from 'constants/condition';

import * as S from './MainPage.styled';

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
      getProducts(dispatch);
    }
  }, [dispatch, productList]);

  const switchRender = useCallback(() => {
    switch (condition) {
      case CONDITION.LOADING:
        return <Loading />;
      case CONDITION.COMPLETE:
        return <ProductCardGrid productList={productList} />;
      case CONDITION.ERROR:
        return (
          <S.Message>상품 정보를 가져오는데 오류가 발생하였습니다 😱</S.Message>
        );
    }
  }, [condition, productList]);

  return <S.Page>{switchRender()}</S.Page>;
}

export default MainPage;
