// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useClose from 'hooks/useClose';
import useSnackbar from 'hooks/useSnackbar';
import useCart from 'hooks/domain/useCart';
import useAuth from 'hooks/domain/useAuth';

import { Image, CartIcon, QuantityController } from 'components';

import transformToLocalPriceFormat from 'utils/transformToLocalPriceFormat';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import Styled from './index.style';

const ProductItem = ({ id, name, price, image }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { renderSnackbar } = useSnackbar();
  const { isInCart, getProductQuantity, putProductInCart, deleteProductInCart } = useCart();

  const [isControllerOpen, setIsControllerOpen] = useState(false);
  const [clearTimer, setAutoCloseTimer, extendTimer] = useClose();

  const [quantity, setQuantity] = useState(1);
  const quantityRef = useRef(quantity);
  quantityRef.current = quantity;

  useEffect(() => {
    if (isInCart(id)) setQuantity(getProductQuantity(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInCart(id)]);

  const updateCart = async () => {
    setIsControllerOpen(false);
    clearTimer();
    const isPositiveQuantity = quantityRef.current > 0;

    if (isPositiveQuantity) {
      putProductInCart(
        id,
        name,
        price,
        image,
        quantityRef.current,
        renderSnackbar(MESSAGE.ADD_CART_SUCCESS, SNACKBAR.SUCCESS),
      );
      return;
    }

    deleteProductInCart(id, renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, SNACKBAR.SUCCESS));
  };

  const handleItemClick = () => {
    navigate(`${PATHNAME.TO_DETAILS}/${id}`);
  };

  const handleCartClick = e => {
    e.stopPropagation();

    if (!isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, SNACKBAR.FAILED);
      navigate(PATHNAME.TO_LOGIN);
      return;
    }

    if (isControllerOpen) {
      updateCart();
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
          <Styled.ProductPrice>{transformToLocalPriceFormat(price)}원</Styled.ProductPrice>
        </div>
        <Styled.CartController onClick={handleCartClick}>
          {isInCart(id) ? <Styled.Quantity>{quantity}</Styled.Quantity> : <CartIcon />}
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
  id: PropTypes.number.isRequired,
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
