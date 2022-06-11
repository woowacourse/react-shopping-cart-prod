import { Link, useNavigate } from 'react-router-dom';
import routes from '@/routes';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/modules/user';

import { NavBarContainer, NavBarTitle, NavBarMenu } from './styles';

import Logo from '@/assets/Logo.png';

function NavBar() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    document.cookie = 'accessToken=';

    dispatch(logout());
    navigate(routes.home);
  };

  return (
    <NavBarContainer>
      <NavBarTitle to={routes.home}>
        <img alt="Logo" src={Logo} />
        <h1>WOOWA SHOP</h1>
      </NavBarTitle>
      <NavBarMenu>
        {!isLoggedIn && (
          <>
            <Link to={routes.login}>로그인</Link>
            <Link to={routes.signup}>회원가입</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to={routes.cart}>장바구니</Link>
            <Link to={routes.userInfo}>회원 정보 수정</Link>
            <button onClick={onClickLogout}>로그아웃</button>
          </>
        )}
      </NavBarMenu>
    </NavBarContainer>
  );
}

export default NavBar;
