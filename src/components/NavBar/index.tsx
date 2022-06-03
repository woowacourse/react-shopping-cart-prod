import { Link } from 'react-router-dom';
import routes from '../../routes';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/modules/customer';

import { NavBarContainer, NavBarTitle, NavBarMenu } from './styles';
import Logo from '../../assets/Logo.png';

function NavBar() {
  const { isLoggedIn } = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    document.cookie = 'accessToken=';
    dispatch(logout());
  };

  return (
    <NavBarContainer>
      <NavBarTitle to={routes.home}>
        <img alt="Logo" src={Logo} />
        <h1>WOOWA SHOP</h1>
      </NavBarTitle>
      <NavBarMenu>
        <Link to={routes.cart}>장바구니</Link>
        <Link to={routes.orderList}>주문목록</Link>
        {!isLoggedIn && <Link to={routes.login}>로그인</Link>}
        {isLoggedIn && (
          <>
            <Link to={routes.userInfo}>회원 정보 수정</Link>
            <button onClick={onClickLogout}>로그아웃</button>
          </>
        )}
      </NavBarMenu>
    </NavBarContainer>
  );
}

export default NavBar;
