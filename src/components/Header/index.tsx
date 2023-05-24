import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import useToast from '../../hooks/useToast';
import { $CartIdList, $CurrentServerUrl } from '../../recoil/atom';
import styles from './index.module.scss';
import DropDown from '../Common/DropDown';

function Header() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const cartIdList = useRecoilValue($CartIdList(currentServerUrl));
  const setCurrentServerUrl = useSetRecoilState($CurrentServerUrl);
  const Toast = useToast();

  const serverOptions: Record<string, string | undefined> = {
    로지: process.env.REACT_APP_SERVER_BASE_URL_LOGI,
    아마란스: process.env.REACT_APP_SERVER_BASE_URL_AMARANTH,
    에코: process.env.REACT_APP_SERVER_BASE_URL_ECO,
  };

  const serverSelectChange = (target: HTMLLIElement) => {
    const { textContent } = target;
    const updateOption = serverOptions[textContent ?? ''];

    if (updateOption === undefined) {
      Toast.error('해당 서버가 존재하지 않습니다.');
      throw new Error('해당 서버가 존재하지 않습니다.');
    }

    setCurrentServerUrl(updateOption);
  };

  return (
    <header className={styles.container}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.cart}>
        <DropDown options={Object.keys(serverOptions)} selectedListHandler={serverSelectChange} />
        <Link to="/cart">
          <button type="button" onClick={Toast.reset}>
            장바구니
          </button>
        </Link>
        <div className={styles['cart-count']}>{cartIdList.length}</div>
      </div>
    </header>
  );
}

export default Header;
