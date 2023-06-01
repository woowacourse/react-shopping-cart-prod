import * as S from './styles/Header.styles';
import { useRecoilValue } from 'recoil';
import { cartCountState } from '../atom/cart';
import Logo from './Logo';
import { loginState } from '../atom/login';
import Login from './Login';
import SignUp from './SignUp';

export default function Header() {
  const cartCount = useRecoilValue(cartCountState);
  const loginAuth = useRecoilValue(loginState);

  return (
    <S.Wrapper>
      <S.ContentBox>
        <Logo />
        {loginAuth ? (
          <S.RightBox>
            <S.CartLink to="/cart">
              장바구니
              <S.CartCount>{cartCount}</S.CartCount>
            </S.CartLink>
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
