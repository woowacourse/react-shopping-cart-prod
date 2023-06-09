import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import * as S from './styles/ProductList.styles';
import Product from './Product';
import SkeletonProduct from './SkeletonProduct';
import { PRODUCT_SKELETONS_LENGTH } from '../../constants';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';
import { useGetProductList } from '../hooks/useGetProductList';
import { useGetCartList } from '../hooks/useGetCartList';
import { useGetCoupon } from '../hooks/useGetCoupon';

export default function ProductList() {
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const { products, getProductsThroughApi } = useGetProductList();
  const { getCartsThroughApi } = useGetCartList();
  const { getCouponThroughApi } = useGetCoupon();

  useEffect(() => {
    getProductsThroughApi(serverName);

    if (!loginCredential) return;

    getCartsThroughApi(serverName, loginCredential);
    getCouponThroughApi(serverName, loginCredential);
  }, [serverName, loginCredential]);

  return (
    <S.Wrapper>
      {products === null
        ? Array.from({ length: PRODUCT_SKELETONS_LENGTH }).map((_, idx) => (
            <SkeletonProduct key={idx} />
          ))
        : products.map((product) => <Product key={product.id} {...product} />)}
    </S.Wrapper>
  );
}
