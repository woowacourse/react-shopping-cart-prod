import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import CartIcon from '../../assets/cart-icon.svg';
import Logo from '../../assets/logo.png';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin]);

  const navigateToMainPage = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToCartPage = useCallback(() => {
    navigate('/cartlist');
  }, [navigate]);

  return (
    <header>
      <div className={styles.container}>
        <OriginSelector />
        <img src={Logo} alt="logo" className={styles.logo} onClick={navigateToMainPage} />
        <div>
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
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
