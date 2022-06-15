import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserData } from 'actions/user';
import { snackbar } from 'actions/snackbar';

import { 아이콘_코드 } from 'constants/';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');

  const onLogOutClick = () => {
    dispatch(removeUserData());
    dispatch(snackbar.pushMessageSnackbar('로그아웃 되었습니다'));
    navigate('/');
  };

  const onCartButtonClick = () => {
    if (accessToken) {
      navigate('/cart');
      return;
    }
    dispatch(snackbar.pushMessageSnackbar('로그인 후 사용해주세요'));
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
        <Styled.RightMenuButton icon={아이콘_코드.CART} onClick={onCartButtonClick}>
          장바구니
        </Styled.RightMenuButton>

        {userId && userId.length > 0 ? (
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
