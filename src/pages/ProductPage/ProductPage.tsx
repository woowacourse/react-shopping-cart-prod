import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getProduct } from 'redux/thunks/product';

import Loading from 'components/@shared/Loading';

import cartAPI from 'apis/cart';
import noImage from 'assets/noImage.png';
import CONDITION from 'constants/condition';
import { CART_MESSAGE } from 'constants/message';
import PATH from 'constants/path';
import { ProductStoreState } from 'types/index';
import { isLogin } from 'utils/auth';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const condition = useSelector(
    (state: { product: ProductStoreState }) => state.product.condition
  );
  const productDetail = useSelector(
    (state: { product: ProductStoreState }) => state.product.productDetail
  );

  const onClickCartButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // TODO: 반복되는 로직이므로 함수로 추출해야할듯
    if (!isLogin()) {
      navigate(PATH.LOGIN);

      return;
    }

    if (id) {
      cartAPI.addCartItem({ productId: Number(id), quantity: 1 });
      alert(CART_MESSAGE.SUCCESS_ADD);
    }
  };

  const onProductImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = noImage;
  };

  const renderSwitch = () => {
    switch (condition) {
      case CONDITION.LOADING:
        return <Loading />;
      case CONDITION.COMPLETE:
        return productDetail ? (
          <>
            <StyledImageContainer>
              <img
                src={productDetail.imageUrl}
                alt={productDetail.name}
                onError={onProductImageError}
              />
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
            <StyledAddToCartButton onClick={onClickCartButton}>
              장바구니
            </StyledAddToCartButton>
          </>
        ) : null;
      case CONDITION.ERROR:
        return (
          <Message>상품 정보를 가져오는데 오류가 발생하였습니다 😱</Message>
        );
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getProduct(Number(id)));
    }
  }, []);

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

const StyledAddToCartButton = styled.button`
  width: 170px;
  height: 50px;
  margin-top: 20px;

  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};

  font-size: 15px;
  font-weight: 600;
`;

const Message = styled.div`
  font-size: 25px;
`;

export default ProductPage;
