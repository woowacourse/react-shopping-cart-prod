import React from "react";

import { ROUTES } from "constants";

import NavButton from "./NavButton";
import Title from "./Title";
import { HeaderContainer, NavButtonContainer, UserInfoButton } from "./styled";
import { UnderlinedButton } from "./NavButton/styled";

function Header() {
  const isLoggedIn = true;

  return (
    <HeaderContainer>
      <Title />
      <NavButtonContainer>
        <NavButton linkTo={ROUTES.PRODUCT_CART}>장바구니</NavButton>
        <NavButton linkTo={ROUTES.PRODUCT_ORDER_LIST}>주문목록</NavButton>
        {isLoggedIn ? (
          <>
            <NavButton linkTo={ROUTES.USER_INFO}>
              <UserInfoButton>me</UserInfoButton>
            </NavButton>
            <UnderlinedButton>로그아웃</UnderlinedButton>
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
