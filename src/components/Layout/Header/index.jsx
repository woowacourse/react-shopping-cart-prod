import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserData } from 'actions/user';
import { snackbar } from 'actions/snackbar';

import { 아이콘_코드, 알림_메시지 } from 'constants/';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId: isLogin } = useSelector((state) => state.user);

  const onLogOutClick = () => {
    dispatch(removeUserData());
    dispatch(snackbar.pushMessageSnackbar(알림_메시지.로그아웃));
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
          <Styled.RightMenuButton icon={아이콘_코드.CART}>
            <CommonStyled.Text display="inline-block" wordBreak="keep-all" size="0.8rem">
              장바구니
            </CommonStyled.Text>
          </Styled.RightMenuButton>
        </Link>

        {isLogin ? (
          <>
            <Link to="/edit/identification">
              <Styled.RightMenuButton icon={아이콘_코드.USER}>
                <CommonStyled.Text display="inline-block" wordBreak="keep-all" size="0.8rem">
                  회원정보
                </CommonStyled.Text>
              </Styled.RightMenuButton>
            </Link>
            <Styled.RightMenuButton icon={아이콘_코드.LOGOUT} onClick={onLogOutClick}>
              <CommonStyled.Text display="inline-block" wordBreak="keep-all" size="0.8rem">
                로그아웃
              </CommonStyled.Text>
            </Styled.RightMenuButton>
          </>
        ) : (
          <Link to="/login">
            <Styled.RightMenuButton icon={아이콘_코드.USER}>
              <CommonStyled.Text display="inline-block" wordBreak="keep-all" size="0.8rem">
                로그인
              </CommonStyled.Text>
            </Styled.RightMenuButton>
          </Link>
        )}
      </Styled.RightMenu>
    </Styled.Container>
  );
};

export default Header;
