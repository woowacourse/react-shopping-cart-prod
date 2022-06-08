import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { flexCenter } from 'styles/mixin';
import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import nayongIcon from 'assets/nyIcon.png';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { UserAction, UserActionType } from 'redux/actions/user';
import theme from 'styles/theme';

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
            <NyaongIcon src={nayongIcon} />
            <StyledBrandName>PokeMon 직판장</StyledBrandName>
          </StyledLogo>
        </Link>
        <StyledNav>
          <button onClick={() => navigate('/cart')}>장바구니</button>
          {Object.keys(data).length ? (
            <button onClick={toggleHambergur}>
              마이페이지
              <MyPageHambergurList isShow={isShowHambergur}>
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
  height: 10rem;

  background: linear-gradient(${theme.colors.red} 55%, ${theme.colors.grey} 45%);

  margin-bottom: 4rem;

  ${flexCenter}

  & > div {
    width: ${({ theme }) => theme.size.fullContentWidth};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledLogo = styled.div`
  ${flexCenter}
`;

const NyaongIcon = styled.img`
  width: 77px;
  height: 77px;
`;

const StyledBrandName = styled.span`
  color: ${theme.colors.yellow};
  -webkit-text-stroke: 2.5px blue;
  font-size: 5rem;
  font-weight: 1000;
  margin-left: 1rem;
`;

const StyledNav = styled.nav`
  & > button {
    color: ${theme.colors.yellow};
    font-size: 2.6rem;
    font-weight: 600;
    background-color: inherit;
  }

  & > button + button {
    margin-left: 4.4rem;
  }
`;

type Hambergur = { isShow: boolean };
const MyPageHambergurList = styled.div<Hambergur>`
  width: 17rem;
  flex-direction: column;
  position: absolute;
  top: 8rem;
  background-color: ${theme.colors.white};
  color: ${theme.colors.yellow};
  display: ${props => (props.isShow ? 'flex' : 'none')};
  flex-wrap: wrap;
  z-index: 10000;

  a {
    ${flexCenter}
    height: 6rem;
  }
  a:hover {
    background-color: ${theme.colors.hewvyWhite};
  }
`;
