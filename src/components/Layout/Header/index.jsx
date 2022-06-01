import { Link } from 'react-router-dom';

import { 아이콘_코드 } from 'constants/';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Header = () => (
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

      {/* TODO: 주문목록은 로그인 상태일때만 보여주기
      <Styled.RightMenuButton icon={아이콘_코드.RECEIPT}>주문 목록</Styled.RightMenuButton> */}
      <Link to="/login">
        <Styled.RightMenuButton icon={아이콘_코드.USER}>로그인</Styled.RightMenuButton>
      </Link>
    </Styled.RightMenu>
  </Styled.Container>
);

export default Header;
