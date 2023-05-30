import { memo, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CartIcon from '../../assets/cart-icon.svg';
import Logo from '../../assets/logo.png';
import orderListIcon from '../../assets/order-list-icon.svg';
import { CART_PAGE_LOCATE, MAIN_PAGE_LOCATE, ORDER_LIST_PAGE_LOCATE } from '../../constants';
import useCartList from '../../hooks/useCartList';
import { cartListState } from '../../store/cart';
import { originState } from '../../store/origin';
import { CartItemType } from '../../types';
import OriginSelector from '../utils/OriginSelector/OriginSelector';
import styles from './style.module.css';

const Header = () => {
  const navigate = useNavigate();
  const cartItemList = useRecoilValue(cartListState);

  const { fetchCartList } = useCartList();

  useQuery<CartItemType[]>('cartItemData', fetchCartList);

  const origin = useRecoilValue(originState);

  useEffect(() => {
    fetchCartList();
  }, [fetchCartList, origin]);

  const navigateToMainPage = useCallback(() => {
    navigate(MAIN_PAGE_LOCATE);
  }, [navigate]);

  const navigateToCartPage = useCallback(() => {
    navigate(CART_PAGE_LOCATE);
  }, [navigate]);

  const navigateToOrderListPage = useCallback(() => {
    navigate(ORDER_LIST_PAGE_LOCATE);
  }, [navigate]);

  return (
    <header>
      <div className={styles.container}>
        <OriginSelector />
        <img src={Logo} alt="logo" className={styles.logo} onClick={navigateToMainPage} />
        <div className={styles.navigateButtons}>
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
          <button type="button" onClick={navigateToOrderListPage}>
            <img src={orderListIcon} alt="order-list-icon" className={styles.orderListIcon} />
            <span className={styles.label}>주문목록</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
