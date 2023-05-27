import { memo } from 'react';
import styled from 'styled-components';
import { ReactComponent as ShoppingCartImg } from '../../assets/icon/shopping-cart.svg';
import useCartAtom from '../../hooks/useCartAtom';
import { WIDTH } from '../../styles/mediaQuery';
import { Product } from '../../types/product';
import Counter from '../common/Counter/Counter';
import ProductImg from './ProductImg/ProductImg';
import ProductInfo from './ProductInfo/ProductInfo';
import useFetch from '../../hooks/useFetch';

type ProductCartProps = Product & {
  count: number;
};
const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  count,
}: ProductCartProps) => {
  const { plusOne, minusOne } = useCartAtom(id, {
    id,
    name,
    price,
    imageUrl,
  });
  const { addToCart } = useFetch();

  const onClickAddToCart = () => {
    addToCart(id);
  };

  return (
    <Container>
      <ProductImg imageUrl={imageUrl} />
      <ProductDetail>
        <ProductInfo name={name} price={price} />
        {count > 0 ? (
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

export default memo(ProductCard);
