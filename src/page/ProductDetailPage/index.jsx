// @ts-nocheck
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCart from 'hooks/domain/useCart';
import useSnackbar from 'hooks/useSnackbar';
import useProduct from 'hooks/domain/useProduct';

import { Image } from 'components';

import transformToLocalPriceFormat from 'utils/transformToLocalPriceFormat';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import Styled from './index.style';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { renderSnackbar } = useSnackbar();
  const { getProductAPI } = useProduct();
  const { isInCart, getProductQuantity, putProductInCart } = useCart();

  const params = useParams();
  const id = Number(params.id);
  const [product, setProduct] = useState(null);

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

  const handleCartButtonClick = () => {
    putProductInCart(
      id,
      product.name,
      product.price,
      product.image,
      isInCart(id) ? getProductQuantity(id) + 1 : 1,
      () => {
        renderSnackbar(MESSAGE.ADD_CART_SUCCESS, SNACKBAR.SUCCESS);
        navigate(PATHNAME.TO_CART);
      },
      error => {
        const { code } = error.response.data;

        if (code === 1003) {
          navigate(PATHNAME.TO_LOGIN);
        }
      },
    );
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
            <Styled.PutCartButton onClick={handleCartButtonClick}>장바구니</Styled.PutCartButton>
          </Styled.ProductContainer>
        </Styled.Container>
      )}
    </>
  );
};

export default ProductDetailPage;
