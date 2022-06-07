import { Link } from 'react-router-dom';
import routes from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserState, UserState } from 'redux/modules/user';
import { show } from 'redux/modules/snackBar';

import { deleteCookie } from 'utils';
import Logo from 'assets/Logo.png';
import { MESSAGES } from 'constants/index';
import { NavBarContainer, NavBarTitle, NavBarMenu } from './styles';

function NavBar() {
  const { isLoggedIn }: UserState = useSelector(selectUserState);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    deleteCookie('accessToken');
    dispatch(logout());
    dispatch(show(MESSAGES.COMPLETE_LOGOUT));
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
