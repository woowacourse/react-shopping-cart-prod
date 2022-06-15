// @ts-nocheck
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCart from 'hooks/useCart';
import useGetProductAPI from 'page/ProductDetailPage/useGetProductApi';
import usePutCartAPI from 'hooks/usePutCartAPI';

import { Image } from 'components';
import Styled from 'page/ProductDetailPage/index.style';

import autoComma from 'utils/autoComma';
import { ROUTES } from 'utils/constants';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);

  const [isInCart, productInCart] = useCart(id);
  const { getProduct, product, isProductLoading } = useGetProductAPI();
  const { increaseQuantity, putCart } = usePutCartAPI();

  useEffect(() => {
    getProduct(id);
  }, [getProduct, id]);

  const handlePutCart = () => {
    if (isInCart) {
      increaseQuantity(id, productInCart.quantity);
    } else {
      putCart(id, 1);
    }

    navigate(ROUTES.CART);
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
          <Styled.PutCartButton onClick={handlePutCart}>장바구니</Styled.PutCartButton>
        </Styled.ProductContainer>
      )}
    </Styled.Container>
  );
};

export default ProductDetailPage;
