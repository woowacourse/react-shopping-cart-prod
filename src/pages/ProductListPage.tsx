import { styled } from 'styled-components';
import ProductListItem from '../components/ProductListItem';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import productsState from '../recoil/atoms/productsState';
import type { Product } from '../type';

const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 230px);
  column-gap: 48px;
  row-gap: 80px;
  justify-content: center;

  @media screen and (max-width: 1140px) {
    grid-template-columns: repeat(3, 230px);
  }

  @media screen and (max-width: 840px) {
    grid-template-columns: repeat(2, 230px);
  }

  @media screen and (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

type ProductListProps = {
  products: Product[];
};

const ProductList = (props: ProductListProps) => {
  const { products } = props;

  return (
    <ProductListContainer>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ProductListContainer>
  );
};

const ProductListPage = () => {
  return (
    <AwaitRecoilState state={productsState}>
      {(products) => <ProductList products={products} />}
    </AwaitRecoilState>
  );
};

export default ProductListPage;
