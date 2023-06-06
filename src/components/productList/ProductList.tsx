import { CartType, CouponInfo, ProductType } from '../../types';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as S from './styles/ProductList.styles';
import Product from './Product';
import SkeletonProduct from './SkeletonProduct';
import * as api from '../../api';
import useToast from '../hooks/useToast';
import { cartState } from '../../atom/cart';
import { API_ERROR_MESSAGE, SKELETONS_LENGTH } from '../../constants';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';
import { couponState } from '../../atom/coupon';

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const setCart = useSetRecoilState(cartState);
  const setCoupons = useSetRecoilState(couponState);
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const { showToast } = useToast();

  useEffect(() => {
    api
      .getProducts<ProductType[]>(serverName)
      .then(setProducts)
      .catch(() => {
        showToast('error', API_ERROR_MESSAGE.getProducts);
      });

    if (!loginCredential) return;

    api
      .getCart<CartType>(serverName, loginCredential)
      .then(setCart)
      .catch(() => {
        products && showToast('error', API_ERROR_MESSAGE.getCart);
      });

    api
      .getCoupon<CouponInfo[]>(serverName, loginCredential)
      .then((coupons) => {
        setCoupons(coupons.filter((coupon) => !coupon.isUsed));
      })
      .catch(() => {
        products && showToast('error', API_ERROR_MESSAGE.coupon);
      });
  }, [serverName, loginCredential]);

  return (
    <S.Wrapper>
      {products === null
        ? Array.from({ length: SKELETONS_LENGTH }).map((_, idx) => <SkeletonProduct key={idx} />)
        : products.map((product) => <Product key={product.id} {...product} />)}
    </S.Wrapper>
  );
}
