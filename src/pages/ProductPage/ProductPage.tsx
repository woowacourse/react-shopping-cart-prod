import { useCallback, useEffect } from 'react';

import cartAPI from 'apis/cart';
import { Button, Loading } from 'components/@shared';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { cartActions } from 'redux/actions';
import { getProduct } from 'redux/thunks';
import { ProductStoreState } from 'types';
import { getAccessToken } from 'utils/auth';

import CONDITION from 'constants/condition';
import { CART_MESSAGE, USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './ProductPage.styled';

function ProductPage() {
  const { id } = useParams();
  const condition = useSelector(
    (state: { product: ProductStoreState }) => state.product.condition
  );
  const productDetail = useSelector(
    (state: { product: ProductStoreState }) => state.product.productDetail
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProduct(dispatch, id);
    }
  }, [dispatch, id]);

  const onClickCartButton = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();

      const accessToken = getAccessToken();

      if (!accessToken) {
        if (window.confirm(USER_MESSAGE.NEED_LOGIN)) {
          navigate(PATH.LOGIN, { replace: true });
        }

        return;
      }

      cartAPI
        .add(accessToken, id as string, 1)
        .then(res => {
          alert(CART_MESSAGE.SUCCESS_ADD);
          dispatch(cartActions.setCart(res));
        })
        .catch(error => {
          alert(CART_MESSAGE.FAIL_ADD);
        });
    },
    [id, navigate, dispatch]
  );

  const switchRender = useCallback(() => {
    switch (condition) {
      case CONDITION.LOADING:
        return <Loading />;
      case CONDITION.COMPLETE:
        return productDetail ? (
          <>
            <S.ImageContainer>
              <img src={productDetail.imageUrl} alt={productDetail.name} />
            </S.ImageContainer>
            <h2>{productDetail.name}</h2>
            <hr />
            <dl>
              <dt>가격</dt>
              <dd>{Number(productDetail.price)?.toLocaleString('ko-KR')} 원</dd>
            </dl>
            <dl>
              <dt>제품 설명</dt>
              <dd>{productDetail.description}</dd>
            </dl>
            <Button type="button" onClick={onClickCartButton} marginTop="20px">
              장바구니
            </Button>
          </>
        ) : null;
      case CONDITION.ERROR:
        return (
          <S.Message>상품 정보를 가져오는데 오류가 발생하였습니다 😱</S.Message>
        );
    }
  }, [condition, productDetail, onClickCartButton]);

  return <S.Page>{switchRender()}</S.Page>;
}

export default ProductPage;
