import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'redux/user/action';
import { PATH } from 'Routers';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => !!state.user.data);

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
            <button onClick={handleClickLogout}>로그아웃</button>
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
  & > button {
    color: white;
    font-size: 2.4rem;
    background-color: inherit;
  }

  & > button + button {
    margin-left: 4.4rem;
  }
`;
