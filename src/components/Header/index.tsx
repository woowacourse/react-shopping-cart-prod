import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import useToast from '../../hooks/useToast';
import { $CartIdList, $CurrentServerUrl } from '../../recoil/atom';
import styles from './index.module.scss';

function Header() {
  const cartIdList = useRecoilValue($CartIdList);
  const setCurrentServerUrl = useSetRecoilState($CurrentServerUrl);
  const Toast = useToast();

  const serverOptions: Record<string, string | undefined> = {
    로지: process.env.REACT_APP_SERVER_BASE_URL_LOGI,
    아마란스: process.env.REACT_APP_SERVER_BASE_URL_AMARANTH,
    에코: process.env.REACT_APP_SERVER_BASE_URL_ECO,
  };

  const options = Object.keys(serverOptions).map((key, index) => (
    <option key={index} value={key}>
      {key}
    </option>
  ));

  const serverSelectChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    const { value } = event.currentTarget;
    const updateOption = serverOptions[value];

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
        <select onChange={serverSelectChange}>{options}</select>
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
