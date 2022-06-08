// @ts-nocheck

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useClose from 'hooks/useClose';
import useCart from 'hooks/useCart';

import { Image, CartIcon, QuantityController } from 'components';

import { doDeleteProductFromCart, doPutProductToCart } from 'actions/actionCreator';

import autoComma from 'utils/autoComma';
import Styled from 'components/ProductItem/index.style';
import { LINK, MESSAGE } from 'utils/constants';
import useSnackbar from 'hooks/useSnackbar';
import { useSelector, useDispatch } from 'react-redux';
import apiClient from 'apis/apiClient';

const ProductItem = ({ productId, name, price, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [renderSnackbar] = useSnackbar();
  const { isAuthenticated } = useSelector(state => state.authReducer);

  const [isInCart, product] = useCart(productId);
  const [quantity, setQuantity] = useState(isInCart ? product.quantity : 1);

  const [isControllerOpen, setIsControllerOpen] = useState(false);
  const [clearTimer, setAutoCloseTimer, extendTimer] = useClose();

  const quantityRef = useRef(quantity);
  quantityRef.current = quantity;

  // TODO 4. put 장바구니 내 상품 수량 수정
  const putCart = async (productId, updatedQuantity) => {
    try {
      const response = await apiClient.put(`/cart/products/${productId}`, {
        quantity: updatedQuantity,
      });
      dispatch(
        doPutProductToCart({
          productId: response.data.productId,
          name: response.data.name,
          image: response.data.image,
          price: response.data.price,
          quantity: response.data.quantity,
        }),
      );
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message, 'FAILED');
      navigate('/login');
    }
  };

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
    navigate(`${LINK.TO_DETAILS}/${productId}`);
  };

  const handleCartClick = e => {
    e.stopPropagation();

    if (!isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
      navigate('/login');
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
