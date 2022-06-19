import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {PATH} from 'constant';
import * as S from 'component/OrderItem/style';

function OrderItem({cartInfo}) {
  const {imageUrl, name, quantity, id} = cartInfo;

  return (
    <S.OrderItemLayout>
      <Link to={`${PATH.DETAIL}/${id}`}>
        <img src={imageUrl} alt="장바구니 상품 이미지" width="144px" height="144px" />
      </Link>
      <S.ItemNameParagraph>{name}</S.ItemNameParagraph>
      <S.ItemQuantityParagraph>{quantity}</S.ItemQuantityParagraph>
    </S.OrderItemLayout>
  );
}

OrderItem.propTypes = {
  cartInfo: PropTypes.object,
};

export default OrderItem;
