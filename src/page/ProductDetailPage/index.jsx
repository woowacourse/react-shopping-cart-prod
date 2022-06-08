// @ts-nocheck
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCart from 'hooks/useCart';
import useSnackbar from 'hooks/useSnackbar';

import { Image } from 'components';

import { doPutProductToCart } from 'modules/cart';
import autoComma from 'utils/autoComma';
import { LINK, MESSAGE, ERROR } from 'utils/constants';
import { getCookie } from 'utils/cookie';
import Styled from './index.style';

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [renderSnackbar] = useSnackbar();
  const isAuthenticated = getCookie('accessToken');

  const params = useParams();
  const id = Number(params.id);
  const [product, setProduct] = useState(null);
  const [isInCart, productInCart] = useCart(id);

  const getProduct = async () => {
    try {
      const response = await axios.get(`/products/${id}`);

      const { image, name, price } = response.data;

      setProduct({
        id,
        image,
        name,
        price,
      });
    } catch (error) {
      const { code, message } = error.response.data;

      if (code) {
        renderSnackbar(ERROR[code], 'FAILED');
      } else {
        renderSnackbar(message, 'FAILED');
      }
    }
  };

  useEffect(() => {
    getProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const putCartAPI = async quantity => {
    const accessToken = getCookie('accessToken');

    await axios.put(
      `/cart/products/${id}`,
      {
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  };

  const putCart = () => {
    if (!isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
      navigate('/login');
      return;
    }
    dispatch(
      doPutProductToCart({
        productId: id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: isInCart ? productInCart.quantity + 1 : 1,
      }),
    );
    putCartAPI(isInCart ? productInCart.quantity + 1 : 1);
    navigate(LINK.TO_CART);
  };

  return (
    <>
      {product && (
        <Styled.Container>
          <Styled.ProductContainer>
            <Image src={product.image} alt={product.name} size="400px" />
            <Styled.ProductName>{product.name}</Styled.ProductName>
            <Styled.Division />
            <Styled.PriceContainer>
              <Styled.PriceTag>금액</Styled.PriceTag>
              <Styled.ProductPrice>{autoComma(product.price)}원</Styled.ProductPrice>
            </Styled.PriceContainer>
            <Styled.PutCartButton onClick={putCart}>장바구니</Styled.PutCartButton>
          </Styled.ProductContainer>
        </Styled.Container>
      )}
    </>
  );
};

export default ProductDetailPage;
