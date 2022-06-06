import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MenuItem from 'components/Common/MenuItem/MenuItem';
import DropDownOption from 'components/Common/DropDownOption/DropDownOption';
import DropDown from 'components/Common/DropDown/DropDown';
import Avatar from 'components/User/Avatar/Avatar';

import useAuthentication from 'hooks/useAuthentication';
import useCart from 'hooks/useCart';
import bigCart from 'assets/svg/bigCart.svg';
import { PATH_NAME } from 'constants';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Header = () => {
  const { cartItems } = useCart();
  const { authenticated, name } = useSelector((state) => state.user);

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
        <AuthNav isAuthenticated={authenticated} name={name} />
      </Styled.MenuContainer>
    </Styled.Wrapper>
  );
};

const AuthNav = ({ isAuthenticated, name }) => {
  const { logout } = useAuthentication();

  const handleClickLogout = () => {
    logout();
  };
  return (
    <>
      {isAuthenticated ? (
        <Styled.AuthNavWrapper>
          <Avatar name={name} />
          <Styled.DropDownWrapper>
            <DropDown>
              <DropDownOption>
                <Link to={PATH_NAME.MODIFY_PROFILE}>회원정보 수정</Link>
              </DropDownOption>
              <DropDownOption hasUnderLine={false} onClick={handleClickLogout}>
                로그아웃
              </DropDownOption>
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
  name: PropTypes.string,
};

export default Header;
