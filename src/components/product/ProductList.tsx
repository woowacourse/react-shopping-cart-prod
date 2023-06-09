import { styled } from 'styled-components';

import { useQuery } from '../../hooks/useQuery';
import { useApiBaseUrlValue } from '../../recoils/recoilApiBaseUrl';

import { Product } from './Product';

import { ProductType as IProduct } from '../../types';
import { FETCH_URL } from '../../constants';

const ProductList = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data: products } = useQuery<IProduct[]>(baseUrl + FETCH_URL.PRODUCTS, false);

  return (
    <Style.Container>
      {products?.map((product) => (
        <Product key={product.id} item={product} />
      ))}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    display: grid;

    padding-bottom: 45px;

    grid-template-columns: repeat(4, 1fr);
    gap: 80px 46px;

    @media (max-width: 1300px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1023px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 679px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
};

export default ProductList;
