import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ICONS from 'constants/icons';
import Avatar from 'components/Avatar/Avatar';
import PlainLink from 'components/PlainLink/PlainLink';
import * as S from 'components/RightMenu/RightMenu.styled';

function RightMenu() {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const toggleDrawer = () => {
    setIsDrawerOpened((prev) => !prev);
  };

  const handleLogoutButton = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/signin');
  };

  if (userId && accessToken) {
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
        <Avatar
          profileImageUrl="http://gravatar.com/avatar/1654096752111?d=identicon"
          name="우"
        />
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
