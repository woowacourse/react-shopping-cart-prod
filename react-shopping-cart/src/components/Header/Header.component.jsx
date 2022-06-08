import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import HeaderContainer from 'components/@shared/HeaderContainer/HeaderContainer.component';
import HeaderLink from 'components/@shared/HeaderLink/HeaderLink.component';
import Logo from 'components/@shared/Logo/Logo.component';

import { logoutUser } from 'redux/actions/auth.action';
import { deleteAllItem } from 'redux/actions/orderList.action';

import useDeleteUser from 'hooks/api/auth/useDeleteUser';
import useUserName from 'hooks/api/auth/useUserName';

function Header() {
  const dispatch = useDispatch();
  const [showSelectBox, setShowSelectBox] = useState(false);
  const { accessToken } = useSelector(state => state.auth);

  const { name } = useUserName();
  const { deleteUser } = useDeleteUser(true);

  const handleSelectBox = () => {
    setShowSelectBox(prev => !prev);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(`회원 탈퇴하시겠습니까?`) && window.confirm('정말?')) {
      await deleteUser();
      handleDeleteAccessToken();
    }
  };

  const handleDeleteAccessToken = async () => {
    await dispatch(deleteAllItem());
    await dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <HeaderContainer as="header">
      <HeaderWrapper>
        <HeaderLink to="/" type="title">
          <Logo width={50} height={44} fontSize="extraLarge" color={'WHITE_001'} />
        </HeaderLink>
        <FlexBox as="nav" gap="43px">
          <HeaderLink to="/cart" type="nav">
            장바구니
          </HeaderLink>
          <HeaderLink to="/" type="nav">
            주문목록
          </HeaderLink>
          {accessToken ? (
            <ProfileThumbnailBox>
              <LogInLogoButton onClick={handleSelectBox}>{name && name[0]}</LogInLogoButton>
              <SelectList show={showSelectBox}>
                <FirstListItem>
                  <Link to="/user/modify">정보수정</Link>
                </FirstListItem>
                <SelectListItem color="red">
                  <button type="button" onClick={handleDeleteAccount}>
                    회원탈퇴
                  </button>
                </SelectListItem>
                <LastListItem>
                  <button type="button" onClick={handleDeleteAccessToken}>
                    로그아웃
                  </button>
                </LastListItem>
              </SelectList>
            </ProfileThumbnailBox>
          ) : (
            <HeaderLink to="/login" type="nav">
              로그인
            </HeaderLink>
          )}
        </FlexBox>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default React.memo(Header);

const HeaderWrapper = styled(FlexBox).attrs({
  justifyContent: 'space-between',
  width: '100%',
})`
  min-width: 630px;
`;

const ProfileThumbnailBox = styled(FlexBox).attrs({
  alignItems: 'center',
})`
  position: relative;
`;

const LogInLogoButton = styled.button.attrs({
  type: 'button',
})`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-weight: bold;
  ${({ theme }) => `
    color: ${theme.colors['MINT_001']};
    background-color: ${theme.colors['WHITE_001']};
  `}
`;

const SelectList = styled.ul`
  display: ${({ show }) => !show && 'none'};
  position: absolute;
  top: 50px;
  right: 10px;
  border-radius: 4px;
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
  `};

  button {
    color: ${({ color }) => color};
    font-weight: bold;
  }
`;

const FirstListItem = styled(SelectListItem)`
  border-radius: 4px 4px 0 0;
`;

const LastListItem = styled(SelectListItem)`
  margin-top: -1px;
  border-radius: 0 0 4px 4px;
`;
