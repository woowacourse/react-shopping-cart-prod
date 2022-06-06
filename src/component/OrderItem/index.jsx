import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {PATH} from 'constant';
import * as S from 'component/OrderItem/style';

function OrderItem({productInfo}) {
  const {image, name, quantity, id} = productInfo;

  return (
    <S.Layout>
      <Link to={`${PATH.DETAIL}/${id}`}>
        <S.ProductImage src={image} alt="구매 상품 이미지" />
      </Link>
      <S.ContentRow>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductQuantity>수량 : {quantity} 개</S.ProductQuantity>
      </S.ContentRow>
    </S.Layout>
  );
}

export default OrderItem;

OrderItem.propTypes = {
  productInfo: PropTypes.object,
};
