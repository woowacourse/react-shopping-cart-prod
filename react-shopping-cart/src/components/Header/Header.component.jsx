import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import HeaderContainer from 'components/@shared/HeaderContainer/HeaderContainer.component';
import HeaderLink from 'components/@shared/HeaderLink/HeaderLink.component';

import { logoutUser } from 'redux/actions/auth.action';

import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';

const LogInLogoButton = styled.button.attrs({
  type: 'button',
  for: 'select-box',
})`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  ${({ theme }) => `
    color: ${theme.colors['MINT_001']};
    background-color: ${theme.colors['WHITE_001']};
  `}
`;

const justFadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const justFadeout = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SelectList = styled.ul`
  display: ${({ show }) => !show && 'none'};
  position: absolute;
  top: 50px;
  right: 10px;
  border-radius: 4px;
  ${({ theme }) => `
    background-color: ${theme.colors['WHITE_001']};
    box-shadow: 2px 2px 3px ${theme.colors['GRAY_001']};
  `}

  &.fadeout-animation {
    animation: ${justFadeout} 0.5s;
  }

  &.fadein-animation {
    animation: ${justFadein} 0.5s;
  }
`;

const SelectListItem = styled.li`
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  ${({ theme }) => `
    background-color: ${theme.colors['WHITE_001']};
    border: 1px solid ${theme.colors['GRAY_001']};
  `}
`;

const ModifyInfoLink = styled(SelectListItem)`
  border-radius: 4px 4px 0 0;
`;

const LogoutButton = styled(SelectListItem)`
  margin-top: -1px;
  border-radius: 0 0 4px 4px;
`;

function Header() {
  const dispatch = useDispatch();
  const [showSelectBox, setShowSelectBox] = useState(false);
  const { accessToken } = useSelector(state => state.auth);
  const handleDeleteAccessToken = () => {
    dispatch(logoutUser());
  };

  return (
    <HeaderContainer as="header">
      <HeaderLink to="/" type="title">
        <FlexBox gap="15px">
          <ShoppingCart fill="#fff" width={50} height={44} />
          {' WOOWA SHOP'}
        </FlexBox>
      </HeaderLink>
      <FlexBox as="nav" gap="43px">
        <HeaderLink to="/cart" type="nav">
          장바구니
        </HeaderLink>
        <HeaderLink to="/" type="nav">
          주문목록
        </HeaderLink>
        {accessToken ? (
          <div style={{ position: 'relative' }}>
            <LogInLogoButton
              onClick={() => {
                setShowSelectBox(prev => !prev);
              }}
            />
            <SelectList
              show={showSelectBox}
              className={showSelectBox ? 'fadein-animation' : 'fadeout-animation'}
            >
              <ModifyInfoLink>
                <Link to="/">정보수정</Link>
              </ModifyInfoLink>
              <LogoutButton>
                <button type="button" onClick={handleDeleteAccessToken}>
                  로그아웃
                </button>
              </LogoutButton>
            </SelectList>
          </div>
        ) : (
          // <HeaderLink to="/" type="nav" onClick={handleDeleteAccessToken}>
          //   로그아웃
          // </HeaderLink>
          <HeaderLink to="/login" type="nav">
            로그인
          </HeaderLink>
        )}
      </FlexBox>
    </HeaderContainer>
  );
}

export default React.memo(Header);
