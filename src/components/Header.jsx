import styled from 'styled-components';
import { GiShoppingCart } from 'react-icons/gi';
import { COLORS } from '../styles/theme';
import { Link } from 'react-router-dom';
import { ROUTES_PATH, STORAGE_KEY } from '../constants';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Header() {
  const cartList = useSelector(({ cart }) => cart.data);
  const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

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
          <StyledNavButton>주문목록</StyledNavButton>
          {accessToken ? (
            <Link to={ROUTES_PATH.USER_INFO}>
              <FaUserCircle className="userIcon" />
              <StyledCartCount>{cartList.length}</StyledCartCount>
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
  background: ${COLORS.PRIMARY};
  box-shadow: 0px 4px 4px ${COLORS.BOX_SHADOW};
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
  color: ${COLORS.WHITE};
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
    color: ${COLORS.WHITE};
    cursor: pointer;
  }
`;

const StyledNavButton = styled.button`
  margin: 0 5px;
  border: none;
  background: none;
  font-weight: 500;
  font-size: 18px;
  color: ${COLORS.WHITE};
`;

const StyledCartCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 16px;
  right: 9.3%;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.ORANGE};
`;

export default Header;
