import { useCallback, useEffect } from 'react';

import cartAPI from 'apis/cart';
import Button from 'components/@shared/Button';
import Loading from 'components/@shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from 'redux/thunks';
import styled from 'styled-components';
import { ProductStoreState } from 'types/index';
import { getAccessToken } from 'utils/auth';

import CONDITION from 'constants/condition';
import { CART_MESSAGE, USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

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
      getProduct(dispatch, Number(id));
    }
  }, [dispatch, id]);

  const onClickCartButton = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();

      const accessToken = getAccessToken();

      if (!accessToken) {
        alert(USER_MESSAGE.NEED_LOGIN);
        navigate(PATH.LOGIN, { replace: true });

        return;
      }

      cartAPI
        .add(accessToken, Number(id), 1)
        .then(res => {
          alert(CART_MESSAGE.SUCCESS_ADD);
        })
        .catch(error => {
          alert(CART_MESSAGE.FAIL_ADD);
        });
    },
    [id, navigate]
  );

  const renderSwitch = useCallback(() => {
    switch (condition) {
      case CONDITION.LOADING:
        return <Loading />;
      case CONDITION.COMPLETE:
        return productDetail ? (
          <>
            <StyledImageContainer>
              <img src={productDetail.imageUrl} alt={productDetail.name} />
            </StyledImageContainer>
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
          <Message>상품 정보를 가져오는데 오류가 발생하였습니다 😱</Message>
        );
    }
  }, [condition, productDetail, onClickCartButton]);

  return <StyledPage>{renderSwitch()}</StyledPage>;
}

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 400px;
  margin: 40px auto;
  gap: 20px;

  h2 {
    line-height: 30px;

    font-size: 20px;
    font-weight: 600;
  }

  hr {
    width: 100%;
  }

  dl {
    display: flex;
    justify-content: space-between;

    width: 100%;

    font-size: 15px;
  }

  dt {
    width: 100px;
  }
`;

const StyledImageContainer = styled.div`
  aspect-ratio: 1 / 1;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const Message = styled.div`
  font-size: 25px;
`;

export default ProductPage;
