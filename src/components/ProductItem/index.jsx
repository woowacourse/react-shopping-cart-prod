// @ts-nocheck

import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useClose from 'hooks/useClose';
import useCart from 'hooks/useCart';
import usePutCartAPI from 'hooks/usePutCartAPI';
import useSnackbar from 'hooks/useSnackbar';

import { Image, CartIcon, QuantityController } from 'components';

import { doDeleteProductFromCart } from 'reducers/cart.reducer';

import autoComma from 'utils/autoComma';
import Styled from 'components/ProductItem/index.style';
import { MESSAGE, ROUTES } from 'utils/constants';

const ProductItem = ({ productId, name, price, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [renderSnackbar] = useSnackbar();
  const { isAuthenticated } = useSelector(state => state.authReducer);

  const [isInCart, productInCart] = useCart(productId);
  const [quantity, setQuantity] = useState(isInCart ? productInCart.quantity : 1);

  const [isControllerOpen, setIsControllerOpen] = useState(false);
  const [clearTimer, setAutoCloseTimer, extendTimer] = useClose();

  const { putCart } = usePutCartAPI();

  const quantityRef = useRef(quantity);
  quantityRef.current = quantity;

  const updateCart = () => {
    setIsControllerOpen(false);
    clearTimer();

    if (quantityRef.current > 0) {
      putCart(productId, quantityRef.current);
      renderSnackbar(MESSAGE.ADD_CART_SUCCESS, 'SUCCESS');
      return;
    }

    dispatch(doDeleteProductFromCart({ productId }));
    renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  };

  const handleItemClick = () => {
    navigate(`${ROUTES.DETAILS}/${productId}`);
  };

  const handleCartClick = e => {
    e.stopPropagation();

    if (!isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
      navigate(ROUTES.LOGIN);
      return;
    }

    if (isControllerOpen) {
      updateCart();
      renderSnackbar(MESSAGE.ADD_CART_SUCCESS, 'SUCCESS');
    } else {
      setIsControllerOpen(true);
      setAutoCloseTimer(updateCart);
    }
  };

  const handleQuantityControllerClick = e => {
    e.stopPropagation();
    extendTimer(updateCart);
  };

  return (
    <Styled.Container onClick={handleItemClick}>
      <Image src={image} alt={name} />

      <Styled.ProductController>
        <div>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{autoComma(price)}원</Styled.ProductPrice>
        </div>
        <Styled.CartController onClick={handleCartClick}>
          {isInCart ? <Styled.Quantity>{quantity}</Styled.Quantity> : <CartIcon />}
        </Styled.CartController>
      </Styled.ProductController>

      {isControllerOpen && (
        <QuantityController
          handleClick={handleQuantityControllerClick}
          quantity={quantity}
          increase={() => setQuantity(prev => prev + 1)}
          decrease={() => setQuantity(prev => (prev > 0 ? prev - 1 : prev))}
        />
      )}
    </Styled.Container>
  );
};

ProductItem.propTypes = {
  /**
   * 해당 상품의 id
   */
  productId: PropTypes.number.isRequired,
  /**
   * 상품의 이름
   */
  name: PropTypes.string.isRequired,
  /**
   * 상품의 가격
   */
  price: PropTypes.number.isRequired,
  /**
   * 상품의 이미지 경로
   */
  image: PropTypes.string.isRequired,
};

export default ProductItem;
