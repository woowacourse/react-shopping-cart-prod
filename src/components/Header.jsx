import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { FaUserCircle } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { ROUTES_PATH } from '../constants';

function Header() {
  const accessToken = useSelector(({ user }) => user.accessToken);

  return (
    <StyledHeader>
      <StyledHeaderWrapper>
        <Link to={ROUTES_PATH.HOME}>
          <StyledTitleWrapper>
            <GiShoppingCart />
            <StyledTitle>WOOWA SHOP</StyledTitle>
          </StyledTitleWrapper>
        </Link>
        <StyledNavWrapper>
          <Link to={ROUTES_PATH.CART}>
            <StyledNavButton>장바구니</StyledNavButton>
          </Link>
          {accessToken ? (
            <Link to={ROUTES_PATH.USER_INFO}>
              <FaUserCircle className="userIcon" />
            </Link>
          ) : (
            <>
              <Link to={ROUTES_PATH.LOGIN}>
                <StyledNavButton>로그인</StyledNavButton>
              </Link>
              <Link to={ROUTES_PATH.SIGN_UP}>
                <StyledNavButton>회원가입</StyledNavButton>
              </Link>
            </>
          )}
        </StyledNavWrapper>
      </StyledHeaderWrapper>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  top: 0;
  background: ${(props) => props.theme.main.PRIMARY};
  box-shadow: 0px 4px 4px ${(props) => props.theme.main.BOX_SHADOW};
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  font-weight: 900;
  font-size: 40px;
  text-align: center;
  color: ${(props) => props.theme.main.WHITE};
  cursor: pointer;
`;

const StyledTitle = styled.span`
  margin-left: 12px;
`;

const StyledNavWrapper = styled.div`
  display: flex;
  align-items: center;
  .userIcon {
    margin-left: 20px;
    font-size: 35px;
    color: ${(props) => props.theme.main.WHITE};
    cursor: pointer;
  }
`;

const StyledNavButton = styled.button`
  margin: 0 5px;
  border: none;
  background: none;
  font-weight: 500;
  font-size: 18px;
  color: ${(props) => props.theme.main.WHITE};
`;

export default Header;
