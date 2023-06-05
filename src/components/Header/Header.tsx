/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CartIcon from '../../assets/cart-icon.svg';
import CouponIcon from '../../assets/coupon-icon.svg';
import Logo from '../../assets/logo.png';
import OrderIcon from '../../assets/order-icon.svg';
import { useCartCount } from '../../hooks/useFetchUrl';
import OriginSelector from '../OriginSelector/OriginSelector';
import styles from './style.module.css';

const Header = () => {
  const cartCount = useCartCount();
  const navigate = useNavigate();

  const navigateToMainPage = useCallback(() => {
    navigate('/');
  }, []);

  const navigateToCartPage = useCallback(() => {
    navigate('/cartList');
  }, []);

  const navigateToOrderPage = useCallback(() => {
    navigate('/orders');
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
            {cartCount > 0 && (
              <div className={styles.cartItemCountBox}>
                <span className={styles.cartItemCount}>{cartCount}</span>
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
