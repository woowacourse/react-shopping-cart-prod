import React from 'react';
import PropTypes from 'prop-types';
import {Link, useNavigate} from 'react-router-dom';
import {PATH} from 'constant';
import * as S from 'component/OrderItem/style';

function OrderItem({productInfo, showButton = false}) {
  const {imageUrl, name, quantity, id} = productInfo;

  const navigation = useNavigate();

  const onClickCartButton = () => navigation(PATH.CART);

  return (
    <S.Layout>
      <S.FlexRowContainer>
        <Link to={`${PATH.DETAIL}/${id}`}>
          <S.ProductImage src={imageUrl} alt="구매 상품 이미지" />
        </Link>
        <S.ContentRow>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductQuantity>수량 : {quantity} 개</S.ProductQuantity>
        </S.ContentRow>
      </S.FlexRowContainer>
      <S.CartButton showButton={showButton} onClick={onClickCartButton}>
        장바구니
      </S.CartButton>
    </S.Layout>
  );
}

export default OrderItem;

OrderItem.propTypes = {
  productInfo: PropTypes.object,
  showButton: PropTypes.bool,
};
