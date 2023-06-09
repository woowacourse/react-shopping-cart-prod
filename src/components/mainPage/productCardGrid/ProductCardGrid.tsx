import styled from 'styled-components';

import { ProductCard } from '../productCard/ProductCard';
import { productItemsState } from '../../../recoil/atoms/productItemsAtom';
import { useRecoilValue } from 'recoil';
import { APIAtom } from '../../../recoil/atoms/serverAtom';

export const ProductCardGrid = () => {
  const apiEndPoint = useRecoilValue(APIAtom);
  const products = useRecoilValue(productItemsState(apiEndPoint));

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
    grid-template-columns: repeat(4, 300px);
    justify-items: center;
    column-gap: 47px;
    row-gap: 86px;

    @media screen and (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 27px;
      row-gap: 56px;
    }
  `,
};
