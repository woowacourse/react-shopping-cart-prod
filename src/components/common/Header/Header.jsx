import React from 'react';

import useWindowsSize from 'hooks/useWindowSize';

import { ROUTE } from 'route';

import { Icon } from 'components/common';
import * as Styled from 'components/common/Header/Header.style';

import { deviceSizeStandard } from 'styles/Theme';

import { useDispatch } from 'react-redux';
import { logoutUser } from 'store/actions/user.action';
import { useNavigate } from 'react-router-dom';

const userHeaderLinks = [
  { path: ROUTE.shoppingCart.path, name: '장바구니' },
  { path: ROUTE.orderList.path, name: '주문목록' },
  {
    path: ROUTE.passwordCheck.path,
    name: '내 정보',
    state: { isValid: true, nextPath: ROUTE.userInfo.path },
  },
];
const nonUserHeaderLinks = [
  { path: ROUTE.login.path, name: '로그인' },
  { path: ROUTE.register.path, name: '회원가입' },
];

function Header({ isLoggedIn }) {
  const windowSize = useWindowsSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const IconSizeBreakPoint = deviceSizeStandard.desktop;

  const navLinkInfo = isLoggedIn ? userHeaderLinks : nonUserHeaderLinks;

  const handleLogOut = () => {
    dispatch(logoutUser());

    navigate('/');
  };

  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.NavLink to={ROUTE.home.path}>
          <Styled.Logo>
            <Icon
              iconName="Tent"
              size={windowSize >= IconSizeBreakPoint ? '50' : '30'}
              stroke="white"
            />
            BLVIC&apos;S CAMPING
          </Styled.Logo>
        </Styled.NavLink>
        <Styled.Nav>
          {navLinkInfo.map(({ path, name, ...props }) => (
            <Styled.NavLink key={name} to={path} {...props}>
              {name}
            </Styled.NavLink>
          ))}
          {isLoggedIn && (
            <Styled.NavButton onClick={handleLogOut}>로그아웃</Styled.NavButton>
          )}
        </Styled.Nav>
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Header;
