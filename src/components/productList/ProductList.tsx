import type { ProductType } from '../../types';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as S from './styles/ProductList.styles';
import Product from './Product';
import SkeletonProduct from './SkeletonProduct';
import * as api from '../../api';
import useToast from '../hooks/useToast';
import { cartState, serverNameState } from '../../atom/state';
import { API_ERROR_MESSAGE, SKELETONS_LENGTH } from '../../constants';

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const setCart = useSetRecoilState(cartState);
  const serverName = useRecoilValue(serverNameState);
  const { showToast } = useToast();

  useEffect(() => {
    api
      .getProducts(serverName)
      .then(setProducts)
      .catch(() => {
        showToast('error', API_ERROR_MESSAGE.getProducts);
      });

    api
      .getCart(serverName)
      .then(setCart)
      .catch(() => {
        products && showToast('error', API_ERROR_MESSAGE.getCart);
      });
  }, [serverName]);

  return (
    <S.Wrapper>
      {products === null
        ? Array.from({ length: SKELETONS_LENGTH }).map((_, idx) => <SkeletonProduct key={idx} />)
        : products.map((product) => <Product key={product.id} {...product} />)}
    </S.Wrapper>
  );
}
