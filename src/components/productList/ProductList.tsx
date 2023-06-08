import type { ProductType } from '../../types';

import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import ProductItem from './ProductItem';
import ProductItemSkeleton from './ProductItemSkeleton';

import useToast from '../../hooks/useToast';
import { tokenState, cartState, serverNameState } from '../../recoil/state';
import api from '../../api';
import { API_ERROR_MESSAGE, SKELETONS_LENGTH } from '../../constants';

export default function ProductList() {
  const serverName = useRecoilValue(serverNameState);
  const token = useRecoilValue(tokenState);
  const setCart = useSetRecoilState(cartState);

  const [products, setProducts] = useState<ProductType[] | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    api
      .getProducts(serverName)
      .then(setProducts)
      .catch(() => {
        setProducts([]);
        showToast('error', API_ERROR_MESSAGE.getProducts);
      });
  }, [serverName]);

  useEffect(() => {
    if (token == null) {
      setCart([]);
      return;
    }

    api
      .getCart(serverName, token)
      .then(setCart)
      .catch(() => {
        showToast('error', API_ERROR_MESSAGE.getCart);
      });
  }, [serverName, token]);

  return (
    <Wrapper>
      {products === null
        ? Array.from({ length: SKELETONS_LENGTH }).map(() => <ProductItemSkeleton />)
        : products.map((product) => <ProductItem key={product.id} {...product} />)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  grid-column-gap: 48px;
  grid-row-gap: 64px;

  @media (max-width: 1272px) {
    grid-template-columns: repeat(3, 282px);
  }

  @media (max-width: 942px) {
    grid-template-columns: repeat(2, 282px);
  }

  @media (max-width: 612px) {
    grid-template-columns: repeat(1, 282px);
  }
`;
