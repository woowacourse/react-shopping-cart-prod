import { useEffect } from 'react';

import cartAPI from 'apis/cart';
import { Link } from 'components/@shared';
import Logo from 'components/Logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions, userActions } from 'redux/actions';
import { CartStoreState, User } from 'types';
import { getAccessToken, isLogin } from 'utils/auth';

import { CART_MESSAGE, USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './Header.styled';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cart
  );
  const userName = useSelector((state: { user: User }) => state.user.username);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) return;

    cartAPI
      .load(accessToken)
      .then(res => {
        dispatch(cartActions.setCart(res));
      })
      .catch(error => {
        alert(CART_MESSAGE.FAIL_LOAD);
      });
  }, [dispatch]);

  const onClickLogoutButton = () => {
    if (!window.confirm(USER_MESSAGE.ASK_LOGOUT)) return;

    dispatch(userActions.resetUser());
    dispatch(cartActions.resetCart());

    sessionStorage.removeItem('accessToken');

    navigate(PATH.BASE);
  };

  const onClickEditUserInfoButton = () => {
    navigate(PATH.EDIT_USER_INFO);
  };

  return (
    <>
      <S.Header>
        <Link to={PATH.BASE}>
          <Logo />
        </Link>
        <S.RightMenu>
          <Link to={PATH.CART}>
            장바구니
            {cart.length > 0 && <S.Badge>{cart.length}</S.Badge>}
          </Link>
          <Link to={PATH.BASE}>주문목록</Link>
        </S.RightMenu>
      </S.Header>
      <S.SubHeader>
        <S.RightMenu gap="30px">
          {!isLogin() ? (
            <>
              <Link to={PATH.LOGIN}>로그인</Link>
              <Link to={PATH.SIGNUP}>회원가입</Link>
            </>
          ) : (
            <>
              {userName}님 환영합니다
              <S.ControlUserButton onClick={onClickLogoutButton}>
                로그아웃
              </S.ControlUserButton>
              <S.ControlUserButton onClick={onClickEditUserInfoButton}>
                회원 정보 수정
              </S.ControlUserButton>
            </>
          )}
        </S.RightMenu>
      </S.SubHeader>
    </>
  );
}

export default Header;
