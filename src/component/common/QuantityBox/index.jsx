import React from 'react';
import PropTypes from 'prop-types';

import * as S from 'component/common/QuantityBox/style';
import {useDispatch} from 'react-redux';
import {CART} from 'store/modules/cart';
export default function QuantityBox({quantity = 1, productId}) {
  const dispatch = useDispatch();
  const handleIncrease = () => dispatch({type: CART.INCREASE_QUANTITY, payload: productId});
  const handleDecrease = () => dispatch({type: CART.DECREASE_QUANTITY, payload: productId});

  return (
    <S.Layout>
      <S.QuantityFont>{quantity}</S.QuantityFont>
      <S.ButtonBox>
        <S.EditQuantityButton onClick={handleIncrease}>▲</S.EditQuantityButton>
        <S.EditQuantityButton onClick={handleDecrease}>▼</S.EditQuantityButton>
      </S.ButtonBox>
    </S.Layout>
  );
}

QuantityBox.propTypes = {
  quantity: PropTypes.number,
  productId: PropTypes.number,
};
