// @ts-nocheck
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCartStore from 'hooks/useCartStore';
import useCart from 'hooks/db/useCart';
import useAuth from 'hooks/db/useAuth';
import useSnackbar from 'hooks/useSnackbar';
import useProduct from 'hooks/db/useProduct';

import { Image } from 'components';

import { doPutProductToCart } from 'modules/cart';
import transformToLocalPriceFormat from 'utils/transformToLocalPriceFormat';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import Styled from './index.style';

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [renderSnackbar] = useSnackbar();
  const { getProductAPI } = useProduct();
  const { putCartAPI } = useCart();
  const { isAuthenticated } = useAuth();

  const params = useParams();
  const id = Number(params.id);
  const [product, setProduct] = useState(null);
  const [isInCart, productInCart] = useCartStore(id);

  const getProduct = async () => {
    try {
      const { image, name, price } = await getProductAPI(id);

      setProduct({
        id,
        image,
        name,
        price,
      });
    } catch (error) {
      navigate(PATHNAME.TO_HOME);
    }
  };

  useEffect(() => {
    getProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const putCart = async () => {
    if (!isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, SNACKBAR.FAILED);
      navigate(PATHNAME.TO_LOGIN);
      return;
    }

    try {
      await putCartAPI(id, isInCart ? productInCart.quantity + 1 : 1);

      dispatch(
        doPutProductToCart({
          productId: id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: isInCart ? productInCart.quantity + 1 : 1,
        }),
      );
      navigate(PATHNAME.TO_CART);
    } catch (error) {}
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
              <Styled.ProductPrice>
                {transformToLocalPriceFormat(product.price)}원
              </Styled.ProductPrice>
            </Styled.PriceContainer>
            <Styled.PutCartButton onClick={putCart}>장바구니</Styled.PutCartButton>
          </Styled.ProductContainer>
        </Styled.Container>
      )}
    </>
  );
};

export default ProductDetailPage;
