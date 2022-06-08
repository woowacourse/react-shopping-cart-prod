// @ts-nocheck
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useCart from 'hooks/useCart';
import useSnackbar from 'hooks/useSnackbar';

import { Image } from 'components';
import Styled from 'page/ProductDetailPage/index.style';

import autoComma from 'utils/autoComma';
import { LINK, MESSAGE } from 'utils/constants';
import { doPutProductToCart } from 'reducers/cart.reducer';
import apiClient from 'apis/apiClient';
import useGetProductAPI from 'hooks/useGetProductApi';

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.authReducer);
  const { getProduct, product, isProductLoading } = useGetProductAPI();
  const [renderSnackbar] = useSnackbar();

  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    getProduct(id);
  }, [getProduct, id]);

  const [isInCart, productInCart] = useCart(id);

  // TODO 4. put 장바구니 내 상품 수량 수정
  const putCartAPI = async (id, updatedQuantity) => {
    try {
      const response = await apiClient.put(`/cart/products/${id}`, { quantity: updatedQuantity });
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

  const putCart = () => {
    if (!isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
      navigate('/login');
      return;
    }
    const updatedQuantity = isInCart ? productInCart.quantity + 1 : 1;
    putCartAPI(id, updatedQuantity);
    navigate(LINK.TO_CART);
  };

  return (
    <Styled.Container>
      {isProductLoading ? (
        '로딩중'
      ) : (
        <Styled.ProductContainer>
          <Image src={product.image} alt={product.name} size="350px" />
          <Styled.ProductName>{product.name}</Styled.ProductName>
          <Styled.Division />
          <Styled.PriceContainer>
            <Styled.PriceTag>금액</Styled.PriceTag>
            <Styled.ProductPrice>{autoComma(product.price)}원</Styled.ProductPrice>
          </Styled.PriceContainer>
          <Styled.PutCartButton onClick={putCart}>장바구니</Styled.PutCartButton>
        </Styled.ProductContainer>
      )}
    </Styled.Container>
  );
};

export default ProductDetailPage;
