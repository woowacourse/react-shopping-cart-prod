import * as Styled from './style';
import PropTypes from 'prop-types';
import MenuItem from 'components/Common/MenuItem/MenuItem';
import bigCart from 'assets/svg/bigCart.svg';
import { PATH_NAME } from 'constants';
import { Link } from 'react-router-dom';
import useCart from 'hooks/useCart';

import DropDownOption from 'components/Common/DropDownOption/DropDownOption';
import DropDown from 'components/Common/DropDown/DropDown';
import Avatar from 'components/User/Avatar/Avatar';

const Header = () => {
  const { cartItems } = useCart();
  const isAuthenticated = true;

  return (
    <Styled.Wrapper>
      <Styled.Logo to="/">
        <Styled.LogoImage src={bigCart} alt="로고" />
        <Styled.LogoText>우아한 상회</Styled.LogoText>
      </Styled.Logo>
      <Styled.MenuContainer>
        <MenuItem>
          <Link to={PATH_NAME.CART}>장바구니</Link>
          <Styled.Badge>{cartItems?.length ?? 0}</Styled.Badge>
        </MenuItem>
        <MenuItem>주문목록</MenuItem>
        <AuthNav isAuthenticated={isAuthenticated} />
      </Styled.MenuContainer>
    </Styled.Wrapper>
  );
};

const AuthNav = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated ? (
        <Styled.AuthNavWrapper>
          <Avatar name={'호프'} />
          <Styled.DropDownWrapper>
            <DropDown>
              <DropDownOption>
                <Link to={PATH_NAME.MODIFY_PROFILE}>회원정보 수정</Link>
              </DropDownOption>
              <DropDownOption hasUnderLine={false}>로그아웃</DropDownOption>
            </DropDown>
          </Styled.DropDownWrapper>
        </Styled.AuthNavWrapper>
      ) : (
        <>
          <MenuItem>
            <Link to={PATH_NAME.LOGIN}>로그인</Link>
          </MenuItem>
          <MenuItem>
            <Link to={PATH_NAME.SIGN_UP}>회원가입</Link>
          </MenuItem>
        </>
      )}
    </>
  );
};

AuthNav.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Header;
