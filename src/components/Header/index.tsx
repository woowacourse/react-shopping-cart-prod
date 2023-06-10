import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-cart.svg';
import { ReactComponent as User } from '../../assets/user.svg';
import { MESSAGE } from '../../constants';
import userServerUrlList from '../../data/serverData';
import useToast from '../../hooks/useToast';
import { $CartList, $CurrentServerUrl } from '../../recoil/atom';
import { setLocalStorage, getLocalStorage } from '../../utils/localStorage';
import DropDown from '../Common/DropDown';
import styles from './index.module.scss';

function Header() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const cartList = useRecoilValue($CartList(currentServerUrl));
  const setCurrentServerUrl = useSetRecoilState($CurrentServerUrl);
  const Toast = useToast();

  const { keys: userNameList, index: currentOptionIndex } = useMemo(() => {
    const keys = Object.keys(userServerUrlList);
    const index = keys.findIndex(name => name === getLocalStorage('name', 'MSW'));

    return { keys, index };
  }, []);

  const serverSelectChange = (target: HTMLLIElement) => {
    const { textContent } = target;
    const updateOption = userServerUrlList[textContent ?? ''];

    if (updateOption === undefined) {
      Toast.error(MESSAGE.SERVER_NOT_FOUND);
      throw new Error(MESSAGE.SERVER_NOT_FOUND);
    }

    if (textContent) {
      setLocalStorage('name', textContent);
      setCurrentServerUrl(updateOption);
      Toast.success(MESSAGE.SERVER_CHANGED_SUCCESSFUL(textContent));
    }
  };

  return (
    <header className={styles.container}>
      <Link to="/">
        <Logo width={240} />
      </Link>
      <nav className={styles.nav}>
        <DropDown
          options={userNameList}
          selectedListHandler={serverSelectChange}
          currentOptionIndex={currentOptionIndex}
        />
        <Link to="/order">
          <button type="button" className={styles.order}>
            <User />
          </button>
        </Link>
        <span>|</span>
        <Link to="/cart">
          <button className={styles['cart-button']} type="button" onClick={() => Toast.reset}>
            <ShoppingCart width={24} height={24} />
            <div className={styles['cart-count']}>{cartList.length}</div>
          </button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
