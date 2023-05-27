import styled from 'styled-components';
import { Product } from '../../../types/Product';

import { ProductCard } from '../productCard/ProductCard';

interface ProductCardListProps {
  products: Product[];
}

export const ProductCardGrid = ({ products }: ProductCardListProps) => {
  return (
    <Style.Container>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    display: grid;
    max-width: 1080px;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fill, minmax(140px, 240px));
    justify-content: center;
    justify-items: center;
    column-gap: 30px;
    row-gap: 40px;
  `,
};
