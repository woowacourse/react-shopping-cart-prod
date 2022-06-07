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
import { doPutProductToCart } from 'actions/actionCreator';
import apiClient from 'apis/apiClient';
import useLogout from 'hooks/useLogout';

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.authReducer);
  const [product, setProduct] = useState({ id: '', image: '', name: '', price: '' });
  const [renderSnackbar] = useSnackbar();
  const { logoutByError } = useLogout();

  const params = useParams();
  const id = Number(params.id);

  // TODO  1. get 상품 목록 가져오기
  const getProduct = async () => {
    const response = await apiClient.get(`/products/${id}`);
    setProduct(response.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const [isInCart, productInCart] = useCart(id);

  // TODO 4. put 장바구니 내 상품 수량 수정
  const putCartAPI = async (id, updatedQuantity) => {
    try {
      const response = await apiClient.put(`/cart/products/${id}`, { quantity: updatedQuantity });
      dispatch(doPutProductToCart({ id: response.data.id, quantity: response.data.quantity }));
    } catch (error) {
      const customError = error.response.data;
      logoutByError(customError);
      navigate('/login');
      renderSnackbar(customError.message, 'FAILED');
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
    // dispatch(doPutProductToCart({ id: id, quantity: isInCart ? productInCart.quantity + 1 : 1 }));
    navigate(LINK.TO_CART);
  };

  return (
    <Styled.Container>
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
    </Styled.Container>
  );
};

export default ProductDetailPage;
