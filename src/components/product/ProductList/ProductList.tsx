import { useRecoilValueLoadable } from 'recoil';
import { styled } from 'styled-components';
import { productsQuery } from '../../../recoil/selectors';
import ProductItem from '../ProductItem/ProductItem';
import ErrorComponent from '../../common/Error/ErrorComponent';
import Spinner from '../../common/Spinner/Spinner';

const ProductList = () => {
  const products = useRecoilValueLoadable(productsQuery);

  if (products.state === 'loading') {
    return <Spinner />;
  }

  if (products.state === 'hasError') {
    return <ErrorComponent>{products.contents.message}</ErrorComponent>;
  }

  return (
    <section>
      <ProductListContainer>
        {products.contents.map((product) => (
          <li key={product.id}>
            <ProductItem {...product} />
          </li>
        ))}
      </ProductListContainer>
    </section>
  );
};

export const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(282px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 48px;

  place-items: center;

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(282px, 1fr));
  }
`;

export default ProductList;
