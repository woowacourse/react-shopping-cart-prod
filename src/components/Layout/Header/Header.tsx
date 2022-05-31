import { CartStoreState } from 'types/index';
import Link from 'components/@shared/Link';
import Logo from 'components/Logo/Logo';
import PATH from 'constants/path';
import RightMenu from './RightMenu';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function Header() {
  const cart = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cart,
  );

  return (
    <>
      <StyledHeader>
        <Link to={PATH.BASE}>
          <Logo />
        </Link>
        <RightMenu>
          <Link to={PATH.BASE}>내 정보</Link>
          <Link to={PATH.CART}>
            장바구니
            <Badge>{cart.length}</Badge>
          </Link>
          <Link to={PATH.BASE}>주문목록</Link>
        </RightMenu>
      </StyledHeader>
      <StyledSubHeader>
        <RightMenu gap="30px">
          <Link to={PATH.BASE}>로그인</Link>
          <Link to={PATH.BASE}>회원가입</Link>
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

export default Header;
