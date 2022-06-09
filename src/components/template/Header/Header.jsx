import React, { useState } from 'react';

import useLogout from 'hooks/useLogout';
import useWindowsSize from 'hooks/useWindowSize';

import { changeServerUrl } from 'api/customInstance';

import { Icon } from 'components/common';

import * as S from 'components/template/Header/Header.style';

import { ALERT_MESSAGES } from 'constants/messages';
import { ROUTE } from 'constants/route';

import { deviceSizeStandard } from 'styles/Theme';

const userHeaderLinks = [
  { path: ROUTE.SHOPPING_CART, name: '장바구니' },
  { path: ROUTE.ORDER_LIST, name: '주문목록' },
  {
    path: ROUTE.PASSWORD_CHECK,
    name: '내 정보',
    state: { isValid: true, nextPath: ROUTE.USER_INFO },
  },
];
const nonUserHeaderLinks = [
  { path: ROUTE.LOGIN, name: '로그인' },
  { path: ROUTE.REGISTER, name: '회원가입' },
];

function Header({ isLoggedIn }) {
  const savedServerNumber = window.sessionStorage.getItem('server');
  const [serverNumber, setServerNumber] = useState(savedServerNumber);
  const windowSize = useWindowsSize();
  const handleLogout = useLogout();

  const IconSizeBreakPoint = deviceSizeStandard.desktop;

  const navLinkInfo = isLoggedIn ? userHeaderLinks : nonUserHeaderLinks;

  const handleLogOutButtonClick = () => {
    if (!window.confirm(ALERT_MESSAGES.LOGOUT_CONFIRM)) {
      return;
    }
    handleLogout();
  };

  const handleServerChange = ({ target: { value } }) => {
    if (isLoggedIn && !window.confirm(ALERT_MESSAGES.SERVER_CHANGE)) {
      return;
    }

    handleLogout();
    setServerNumber(value);
    changeServerUrl(value);
  };

  return (
    <S.Container>
      <S.Inner>
        <S.NavLink to={ROUTE.HOME}>
          <S.Logo>
            <Icon
              iconName="Tent"
              size={windowSize >= IconSizeBreakPoint ? '50' : '30'}
              stroke="white"
            />
            BLVIC&apos;S CAMPING
          </S.Logo>
        </S.NavLink>
        <select name="server" onChange={handleServerChange} value={serverNumber}>
          <option value="0">크리스 서버</option>
          <option value="1">오찌 서버</option>
          <option value="2">쿼리치 서버</option>
          <option value="3">파랑 서버</option>
          <option value="4">모킹 서버</option>
        </select>
        <S.Nav>
          {navLinkInfo.map(({ path, name, ...props }) => (
            <S.NavLink key={name} to={path} {...props}>
              {name}
            </S.NavLink>
          ))}
          {isLoggedIn && (
            <S.NavButton onClick={handleLogOutButtonClick}>로그아웃</S.NavButton>
          )}
        </S.Nav>
      </S.Inner>
    </S.Container>
  );
}

export default Header;
