import { useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { selectedHostState } from '../../recoil/atoms';
import { ProductInfo } from '../../types';
import { useCart } from '../../hooks/useCart';
import Product from './Product';

interface Props {
  products: ProductInfo[];
}

export default function ProductList({ products }: Props) {
  const { initCartList } = useCart();
  const host = useRecoilValue(selectedHostState);

  useEffect(() => {
    initCartList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  return (
    <Style.Container>
      {products.map((product) => (
        <li key={product.id}>
          <Product productInfo={product} />
        </li>
      ))}
    </Style.Container>
  );
}

const Style = {
  Container: styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 45px;
    grid-row-gap: 60px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      grid-template-columns: repeat(3, 1fr);
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
};
