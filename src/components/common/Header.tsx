import styled from 'styled-components';
import type { ThemedStyledProps } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { flexCenter } from 'styles/mixin';
import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { UserAction, UserActionType } from 'redux/actions/user';

const Header = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useAppSelector(state => state.userReducer);
  const [isShowHambergur, setIsShowHambergur] = useState(false);
  const dispatch = useAppDispatch<UserAction>();

  const toggleHambergur = () => {
    setIsShowHambergur(!isShowHambergur);
  };

  const handleSignOut = () => {
    localStorage.clear();
    dispatch({ type: UserActionType.SIGN_OUT_ACTION });
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
            <button onClick={toggleHambergur}>
              마이페이지
              <MyPageHambergurList isShow={isShowHambergur}>
                <Link to='/editProfile'>회원정보 수정</Link>
                <Link to='/editPassword'>비밀번호 변경</Link>
                <Link to='/resign'>회원 탈퇴</Link>
                <Link onClick={handleSignOut} to=''>
                  로그아웃
                </Link>
              </MyPageHambergurList>
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

type Hambergur = { isShow: boolean };
const MyPageHambergurList = styled.div<Hambergur>`
  width: 170px;
  flex-direction: column;
  position: absolute;
  top: 80px;
  background-color: #f5f5f5;
  color: black;
  display: ${props => (props.isShow ? 'flex' : 'none')};
  flex-wrap: wrap;
  z-index: 10000;

  a {
    ${flexCenter}
    height: 60px;
  }
  a:hover {
    background-color: #e3e3e3;
  }
`;
