import * as S from './styles/Header.styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartCountState } from '../atom/cart';
import Logo from './Logo';
import { loginState } from '../atom/login';
import Login from './Login';
import SignUp from './SignUp';

export default function Header() {
  const cartCount = useRecoilValue(cartCountState);
  const [loginCredential, setLoginCredential] = useRecoilState(loginState);

  return (
    <S.Wrapper>
      <S.ContentBox>
        <Logo />
        {loginCredential ? (
          <S.RightBox>
            <S.LinkBox to="/cart">
              장바구니
              <S.CartCount>{cartCount}</S.CartCount>
            </S.LinkBox>
            <S.LinkBox to="/coupon">쿠폰함</S.LinkBox>
            <S.LinkBox
              to="/"
              onClick={() => {
                setLoginCredential('');
              }}
            >
              로그아웃
            </S.LinkBox>
          </S.RightBox>
        ) : (
          <S.RightBox>
            <Login />
            <SignUp />
          </S.RightBox>
        )}
      </S.ContentBox>
    </S.Wrapper>
  );
}
