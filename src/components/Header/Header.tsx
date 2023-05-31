/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import CartIcon from '../../assets/cart-icon.svg';
import CouponIcon from '../../assets/coupon-icon.svg';
import Logo from '../../assets/logo.png';
import OrderIcon from '../../assets/order-icon.svg';
import { useFetch } from '../../hooks/useFetch';
import { cartListState } from '../../store/cart';
import { originState } from '../../store/origin';
import { CartItemType } from '../../types';
import OriginSelector from '../OriginSelector/OriginSelector';
import styles from './style.module.css';

const Header = () => {
  const navigate = useNavigate();
  const [cartItemList, setCartItemList] = useRecoilState(cartListState);
  const origin = useRecoilValue(originState);

  const { fetchApi } = useFetch<CartItemType[]>(setCartItemList);
  useEffect(() => {
    fetchApi.get(`${origin}cart-items`);
  }, [origin]);

  const navigateToMainPage = useCallback(() => {
    navigate('/');
  }, []);

  const navigateToCartPage = useCallback(() => {
    navigate('/cartList');
  }, []);

  const navigateToOrderPage = useCallback(() => {
    navigate('/orderList');
  }, []);

  const navigateToCouponPage = useCallback(() => {
    navigate('/coupon');
  }, []);

  return (
    <header>
      <div className={styles.container}>
        <OriginSelector />
        <img src={Logo} alt="logo" className={styles.logo} onClick={navigateToMainPage} />
        <div className={styles.flex}>
          <button type="button">
            {cartItemList.length > 0 && (
              <div className={styles.cartItemCountBox}>
                <span className={styles.cartItemCount}>{cartItemList.length}</span>
              </div>
            )}
            <img
              src={CartIcon}
              alt="cart icon"
              className={styles.cartIcon}
              onClick={navigateToCartPage}
            />
            <span className={styles.label}>장바구니</span>
          </button>
          <button type="button">
            <img
              src={OrderIcon}
              alt="order icon"
              className={styles.cartIcon}
              onClick={navigateToOrderPage}
            />
            <span className={styles.label}>주문목록</span>
          </button>
          <button type="button">
            <img
              src={CouponIcon}
              alt="coupon icon"
              className={styles.cartIcon}
              onClick={navigateToCouponPage}
            />
            <span className={styles.label}>쿠폰 발급</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
