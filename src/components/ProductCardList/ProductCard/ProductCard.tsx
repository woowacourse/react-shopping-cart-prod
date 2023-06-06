import { memo } from 'react';
import styled from 'styled-components';
import { ReactComponent as ShoppingCartImg } from '../../../assets/icon/shopping-cart.svg';
import { WIDTH } from '../../../constants/mediaQuery';
import { Product } from '../../../types/response';
import Counter from '../../common/Counter/Counter';
import ProductImg from './ProductImg/ProductImg';
import ProductInfo from './ProductInfo/ProductInfo';
import useFetchCart from '../../../hooks/useFetchCart';

type ProductCartProps = Product & {
  count: number | undefined;
  cartId: number | undefined;
};

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  count,
  cartId,
}: ProductCartProps) => {
  const { addToCart, updateCartItem, deleteCartItem } = useFetchCart();

  const onClickAddToCart = () => {
    addToCart(id);
  };

  const plusOne = () => {
    if (!cartId || !count) return;

    updateCartItem(cartId, count + 1);
  };

  const minusOne = () => {
    if (!cartId || !count) return;
    if (count === 1) {
      deleteCartItem(cartId);
      return;
    }

    updateCartItem(cartId, count - 1);
  };

  return (
    <Container>
      <ImageWrapper>
        <ProductImg imageUrl={imageUrl} isProductCard={true} />
      </ImageWrapper>
      <ProductDetail>
        <ProductInfo name={name} price={price} />
        {count && count > 0 ? (
          <Counter plusOne={plusOne} minusOne={minusOne} quantity={count} />
        ) : (
          <ShoppingCart onClick={onClickAddToCart}>
            <ShoppingCartImg />
          </ShoppingCart>
        )}
      </ProductDetail>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 282px;

  @media (max-width: ${WIDTH.MD}) {
    gap: 8px;

    width: 160px;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShoppingCart = styled.button`
  display: flex;

  cursor: pointer;

  @media (max-width: ${WIDTH.MD}) {
    width: 20px;
  }
`;

const ImageWrapper = styled.div`
  width: 282px;
  height: 282px;

  @media (max-width: ${WIDTH.MD}) {
    width: 160px;
    height: 160px;
  }
`;

export default memo(ProductCard);
