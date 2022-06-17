import { useDispatch, useSelector } from "react-redux";

import { ROUTES, COOKIE_KEY } from "constants";
import { deleteCookie } from "util/cookie";
import { USER_ACTION } from "reducers/user";

import NavButton from "./NavButton";
import Title from "./Title";
import { HeaderContainer, NavButtonContainer, UserInfoButton } from "./styled";
import { UnderlinedButton } from "./NavButton/styled";
import { useNavigate } from "react-router-dom";

function Header() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const logout = () => {
    dispatch({ type: USER_ACTION.LOGOUT });
    deleteCookie(COOKIE_KEY.TOKEN);
    deleteCookie(COOKIE_KEY.USER_ID);
    navigator(ROUTES.ROOT, { replace: true });
  };

  return (
    <HeaderContainer>
      <Title />
      <NavButtonContainer>
        {isLoggedIn ? (
          <>
            <NavButton linkTo={ROUTES.PRODUCT_CART}>장바구니</NavButton>
            <NavButton linkTo={ROUTES.PRODUCT_ORDER_LIST}>주문목록</NavButton>
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
