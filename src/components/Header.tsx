import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { flexCenter } from 'styles/mixin';
import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { UserAction, userAction } from 'redux/actions/user';
import theme from 'styles/theme';

const Header = () => {
  const navigate = useNavigate();
  const { data } = useAppSelector(state => state.userReducer);
  const [isShowHamburger, setIsShowHamburger] = useState(false);
  const dispatch = useAppDispatch<UserAction>();

  const toggleHamburger = () => {
    setIsShowHamburger(!isShowHamburger);
  };

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(userAction.signOut.success());
  };

  return (
    <StyledRoot>
      <div>
        <Link to='/main/1'>
          <StyledLogo>
            <CartIcon fill='white' />
            <StyledBrandName>RoyStin Shop</StyledBrandName>
          </StyledLogo>
        </Link>
        <StyledNav>
          <button onClick={() => navigate('/cart')}>장바구니</button>
          <button>주문목록</button>
          {Object.keys(data).length ? (
            <button onClick={toggleHamburger}>
              마이페이지
              <HamburgerList isShow={isShowHamburger}>
                <Link to='/editPassword'>비밀번호 변경</Link>
                <Link to='/resign'>회원 탈퇴</Link>
                <Link onClick={handleSignOut} to=''>
                  로그아웃
                </Link>
              </HamburgerList>
            </button>
          ) : (
            <button onClick={() => navigate('/signIn')}>로그인</button>
          )}
        </StyledNav>
      </div>
    </StyledRoot>
  );
};

export default Header;

const StyledRoot = styled.header`
  width: 100%;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 6rem;
  ${flexCenter}

  & > div {
    width: ${({ theme }) => theme.size.fullContentWidth};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledLogo = styled.div``;

const StyledBrandName = styled.span`
  color: ${theme.colors.white};
  font-size: 4rem;
  font-weight: 900;
  margin-left: 1rem;
`;

const StyledNav = styled.nav`
  & > button {
    color: ${theme.colors.white};
    font-size: 2.4rem;
    background-color: inherit;
  }

  & > button + button {
    margin-left: 4.4rem;
  }
`;

type Hamburger = { isShow: boolean };
const HamburgerList = styled.div<Hamburger>`
  width: 17rem;
  flex-direction: column;
  position: absolute;
  top: 8rem;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  display: ${props => (props.isShow ? 'flex' : 'none')};
  flex-wrap: wrap;
  z-index: 10000;

  a {
    ${flexCenter}
    height: 6rem;
  }
  a:hover {
    background-color: ${theme.colors.heavyWhite};
  }
`;
