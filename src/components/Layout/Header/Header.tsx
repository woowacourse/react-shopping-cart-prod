import { CartStoreState, User } from 'types/index';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'components/@shared/Link';
import Logo from 'components/Logo/Logo';
import PATH from 'constants/path';
import RightMenu from './RightMenu';
import { isLogin } from 'utils/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'redux/actions';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cart
  );
  const userName = useSelector((state: { user: User }) => state.user.username);

  const onClickLogoutButton = () => {
    dispatch(userActions.resetUser());

    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');

    navigate(PATH.BASE);
  };

  const onClickEditUserInfoButton = () => {
    navigate(PATH.EDIT_USER_INFO);
  };

  return (
    <>
      <StyledHeader>
        <Link to={PATH.BASE}>
          <Logo />
        </Link>
        <RightMenu>
          <Link to={PATH.CART}>
            장바구니
            <Badge>{cart.length}</Badge>
          </Link>
          <Link to={PATH.BASE}>주문목록</Link>
        </RightMenu>
      </StyledHeader>
      <StyledSubHeader>
        <RightMenu gap="30px">
          {!isLogin() ? (
            <>
              <Link to={PATH.LOGIN}>로그인</Link>
              <Link to={PATH.SIGNUP}>회원가입</Link>
            </>
          ) : (
            <>
              {userName}님 환영합니다
              <StyledControlUserButton onClick={onClickLogoutButton}>
                로그아웃
              </StyledControlUserButton>
              <StyledControlUserButton onClick={onClickEditUserInfoButton}>
                회원 정보 수정
              </StyledControlUserButton>
            </>
          )}
        </RightMenu>
      </StyledSubHeader>
    </>
  );
}

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;

  font-size: 20px;
  height: 60px;
  padding: 0 10%;
  top: 0px;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.overEverything};

  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};

  ${RightMenu} {
    text-shadow: -0.5px 0 ${({ theme: { colors } }) => colors.gray},
      0 0.5px ${({ theme: { colors } }) => colors.gray},
      0.5px 0 ${({ theme: { colors } }) => colors.gray},
      0 -0.5px ${({ theme: { colors } }) => colors.gray};
  }
`;

const Badge = styled.div`
  display: inline-block;
  position: absolute;
  top: 10px;
  text-align: center;

  width: 15px;
  height: 15px;
  border: 0.5px solid ${({ theme: { colors } }) => colors.white};
  border-radius: 50%;

  background: ${({ theme: { colors } }) => colors.pink};
  color: ${({ theme: { colors } }) => colors.black};

  font-size: 14px;
  font-weight: normal !important;
`;

const StyledSubHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: sticky;

  font-size: 16px;
  height: 24px;
  padding: 0 10%;
  top: 60px;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.overEverything};

  background: ${({ theme: { colors } }) => colors.white};
  color: ${({ theme: { colors } }) => colors.black};
`;

const StyledControlUserButton = styled.button`
  border-radius: 12px;
  padding: 0 12px;

  background-color: ${({ theme: { colors } }) => colors.pink};
  color: ${({ theme: { colors } }) => colors.white};

  font-weight: 800;
  font-size: 14px;
`;

export default Header;
