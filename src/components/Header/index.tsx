import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
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
  const userNameList = Object.keys(userServerUrlList);
  const index = userNameList.findIndex(name => name === getLocalStorage('name', '로지'));

  const serverSelectChange = (target: HTMLLIElement) => {
    const { textContent } = target;
    const updateOption = userServerUrlList[textContent ?? ''];

    if (updateOption === undefined) {
      Toast.error('해당 서버가 존재하지 않습니다.');
      throw new Error('해당 서버가 존재하지 않습니다.');
    }

    setLocalStorage('name', textContent);
    setCurrentServerUrl(updateOption);
    Toast.success(`${textContent} 서버로 변경 되었습니다!`);
  };

  return (
    <header className={styles.container}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.cart}>
        <DropDown options={userNameList} selectedListHandler={serverSelectChange} currentOptionIndex={index} />
        <Link to="/cart">
          <button type="button" onClick={() => Toast.reset}>
            장바구니
          </button>
        </Link>
        <div className={styles['cart-count']}>{cartList.length}</div>
        <Link to="/order">
          <button type="button" className={styles.order}>
            주문 목록
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
