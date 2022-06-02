import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'redux/user/action';
import { PATH } from 'Routers';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

import Avatar from './Avatar';
import Dropdown from './Dropdown';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => !!state.user.data);
  const name = useAppSelector(state => state.user.data?.name);
  const [isShowDropdown, toggleShowDropdown] = useReducer(prev => !prev, false);

  const handleClickLogout = () => {
    navigate(PATH.home);
    dispatch(logout());
    localStorage.removeItem('access-token');
  };

  return (
    <StyledRoot>
      <Link to={PATH.getMain(1)}>
        <StyledLogo>
          <CartIcon fill='white' />
          <StyledBrandName>Woowa Shop</StyledBrandName>
        </StyledLogo>
      </Link>
      <StyledNav>
        {isLogin ? (
          <>
            <button onClick={() => navigate(PATH.cart)}>장바구니</button>
            <button>주문목록</button>
            <StyledAvatarWrapper>
              <Avatar name={name} onClick={toggleShowDropdown} />
              {isShowDropdown && (
                <Dropdown closeDropdown={toggleShowDropdown}>
                  <li onClick={() => navigate('/edit')}>회원정보수정</li>
                  <li onClick={handleClickLogout}>로그아웃</li>
                </Dropdown>
              )}
            </StyledAvatarWrapper>
          </>
        ) : (
          <button onClick={() => navigate(PATH.login)}>로그인</button>
        )}
      </StyledNav>
    </StyledRoot>
  );
};

export default Header;

const StyledRoot = styled.header`
  width: 100%;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const StyledLogo = styled.div``;

const StyledBrandName = styled.span`
  color: white;
  font-size: 4rem;
  font-weight: 900;
  margin-left: 1rem;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 4.4rem;
  & > button {
    color: white;
    font-size: 2.4rem;
    background-color: inherit;
  }
`;

const StyledAvatarWrapper = styled.div`
  position: relative;
`;
