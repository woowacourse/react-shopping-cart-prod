import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckBox from 'components/CheckBox';

import Wrapper from './style';

import {
  selectCart,
  clearCart,
  addOneQuantity,
  downOneQuantity,
  deleteOneCart,
} from 'reducers/carts';
import { modifyCartQuantity, deleteCarts } from 'reducers/addUpdateDeleteCart';
import { onMessage } from 'reducers/snackbar';

import debounce from 'utils';

import { SNACKBAR_MESSAGE } from 'constants';

const Cart = ({ id, imageUrl, name, quantity, price, selected }) => {
  const dispatch = useDispatch();

  const handleChangeCheckBox = useCallback(() => {
    dispatch(selected ? clearCart(id) : selectCart(id));
  }, [dispatch, selected, id]);

  const handleClickMinusButton = debounce(
    useCallback(async () => {
      if (quantity === 1) return;

      await dispatch(modifyCartQuantity(id)).unwrap();
      dispatch(downOneQuantity(id));
      dispatch(onMessage(SNACKBAR_MESSAGE.deleteProduct(name)));
    }, [dispatch, id, quantity]),
    150,
  );

  const handleClickAddButton = debounce(
    useCallback(async () => {
      await dispatch(addMoreCart(id)).unwrap();
      dispatch(addOneQuantity(id));
      dispatch(onMessage(SNACKBAR_MESSAGE.addProduct(name)));
    }, [dispatch, id]),
    150,
  );

  const handleClickDeleteButton = useCallback(async () => {
    await dispatch(deleteCart(id)).unwrap();
    dispatch(deleteOneCart(id));
    dispatch(onMessage(SNACKBAR_MESSAGE.clearProduct(name)));
  }, [dispatch, id]);

  return (
    <Wrapper>
      <div className="left">
        <CheckBox
          id={`cart${id}`}
          checked={selected}
          onChange={handleChangeCheckBox}
        />
        <Link to={`/product/${id}`}>
          <img
            className="cart-product"
            src={imageUrl}
            alt="장바구니에 담긴 상품"
          />
        </Link>
        <p className="title">{name}</p>
      </div>
      <div className="right">
        <img
          src="img/Recycle_Bin.png"
          alt="휴지통"
          onClick={handleClickDeleteButton}
        />
        <div className="quantity-wrapper">
          <div className="quantity">
            <p>{quantity}</p>
          </div>
          <div className="plus-minus-wrapper">
            <div className="plus" onClick={handleClickAddButton}>
              <div></div>
            </div>
            <div className="minus" onClick={handleClickMinusButton}>
              <div></div>
            </div>
          </div>
        </div>
        <p className="price">{price.toLocaleString()}원</p>
      </div>
    </Wrapper>
  );
};

export default Cart;
