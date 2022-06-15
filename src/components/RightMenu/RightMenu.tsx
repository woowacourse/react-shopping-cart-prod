import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StoreState } from 'types';

import Avatar from 'components/Avatar/Avatar';
import PlainLink from 'components/PlainLink/PlainLink';
import * as S from 'components/RightMenu/RightMenu.styled';

import { actions } from 'redux/actions';

import ICONS from 'constants/icons';

type SelectedState = StoreState['userState'];

function RightMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: userId, info } = useSelector<StoreState, SelectedState>(
    ({ userState }) => userState
  );
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  const toggleDrawer = () => {
    setIsDrawerOpened((prev) => !prev);
  };

  const handleLogoutButton = () => {
    localStorage.removeItem('accessToken');
    dispatch(actions.initUserState());
    navigate('/signin');
  };

  if (userId !== null && accessToken) {
    return (
      <S.RightMenuBox>
        <S.Nav>
          <S.Button onClick={toggleDrawer}>{ICONS.MENU}</S.Button>
          <S.Ul isDrawerOpened={isDrawerOpened}>
            <li>
              <PlainLink to="/cart">장바구니</PlainLink>
            </li>
            <li>
              <PlainLink to="/orders">주문목록</PlainLink>
            </li>
            <li>
              <PlainLink to="/profile">내 정보 수정</PlainLink>
            </li>
            <li>
              <S.LogoutButton onClick={handleLogoutButton}>
                로그아웃
              </S.LogoutButton>
            </li>
          </S.Ul>
        </S.Nav>
        <Avatar profileImageUrl={info?.profileImageUrl} name={info?.name} />
      </S.RightMenuBox>
    );
  }

  return (
    <S.Nav>
      <S.Button onClick={toggleDrawer}>{ICONS.MENU}</S.Button>
      <S.Ul isDrawerOpened={isDrawerOpened}>
        <li>
          <PlainLink to="/cart">장바구니</PlainLink>
        </li>
        <li>
          <PlainLink to="/signin">로그인</PlainLink>
        </li>
        <li>
          <PlainLink to="/signup/1">회원가입</PlainLink>
        </li>
      </S.Ul>
    </S.Nav>
  );
}

export default RightMenu;
