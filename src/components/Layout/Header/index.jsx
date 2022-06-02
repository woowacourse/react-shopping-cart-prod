import { Link, useNavigate } from 'react-router-dom';

import { 아이콘_코드 } from 'constants/';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Header = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const isLogin = !!accessToken;

  const onLogOutClick = () => {
    localStorage.removeItem('accessToken');
    alert('로그아웃 되었습니다');
    navigate('/');
  };

  return (
    <Styled.Container>
      <CommonStyled.FlexWrapper>
        <Styled.LeftMenuButton>전체 카테고리</Styled.LeftMenuButton>
      </CommonStyled.FlexWrapper>

      <Link to="/">
        <Styled.Logo />
      </Link>

      <Styled.RightMenu>
        <Link to="/cart">
          <Styled.RightMenuButton icon={아이콘_코드.CART}>장바구니</Styled.RightMenuButton>
        </Link>

        {isLogin ? (
          <>
            <Styled.RightMenuButton icon={아이콘_코드.RECEIPT}>주문 목록</Styled.RightMenuButton>
            <Link to="/identification">
              <Styled.RightMenuButton icon={아이콘_코드.USER}>회원정보</Styled.RightMenuButton>
            </Link>
            <Styled.RightMenuButton icon={아이콘_코드.USER} onClick={onLogOutClick}>
              로그아웃
            </Styled.RightMenuButton>
          </>
        ) : (
          <Link to="/login">
            <Styled.RightMenuButton icon={아이콘_코드.USER}>로그인</Styled.RightMenuButton>
          </Link>
        )}
      </Styled.RightMenu>
    </Styled.Container>
  );
};

export default Header;
