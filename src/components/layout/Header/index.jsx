import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "constants";
import { USER_ACTION } from "reducers/user";

import NavButton from "./NavButton";
import Title from "./Title";
import { HeaderContainer, NavButtonContainer, UserInfoButton } from "./styled";
import { UnderlinedButton } from "./NavButton/styled";
import { useNavigate } from "react-router-dom";

function Header() {
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const logout = () => {
    dispatch({ type: USER_ACTION.LOGOUT });
    navigator(ROUTES.ROOT);
  };

  return (
    <HeaderContainer>
      <Title />
      <NavButtonContainer>
        {accessToken ? (
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
