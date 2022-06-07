import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTES, JWT_COOKIE_KEY, USER_ID_KEY } from "constants";

import { USER_ACTION } from "reducers/user";
import { deleteCookie } from "util/cookie";

import NavButton from "./NavButton";
import Title from "./Title";
import { HeaderContainer, NavButtonContainer, UserInfoButton } from "./styled";
import { UnderlinedButton } from "./NavButton/styled";

function Header({ isLogin }) {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const logout = () => {
    localStorage.removeItem(USER_ID_KEY);
    deleteCookie(JWT_COOKIE_KEY);
    dispatch({ type: USER_ACTION.LOGOUT });
    navigator(ROUTES.ROOT, { replace: true });
  };

  return (
    <HeaderContainer>
      <Title />
      <NavButtonContainer>
        <NavButton linkTo={ROUTES.PRODUCT_CART}>장바구니</NavButton>
        <NavButton linkTo={ROUTES.PRODUCT_ORDER_LIST}>주문목록</NavButton>
        {isLogin ? (
          <>
            <NavButton linkTo={ROUTES.USER_INFO}>
              <UserInfoButton>me</UserInfoButton>
            </NavButton>
            <UnderlinedButton onClick={logout}>로그아웃</UnderlinedButton>
          </>
        ) : (
          <>
            <NavButton linkTo={ROUTES.LOGIN}>로그인</NavButton>
            <NavButton linkTo={ROUTES.REGISTER}>회원가입</NavButton>
          </>
        )}
      </NavButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
