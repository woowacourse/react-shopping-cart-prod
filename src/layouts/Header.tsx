import * as S from './styles/Header.styles';
import { useRecoilValue } from 'recoil';
import { cartCountState } from '../atom/state';
import Logo from './Logo';

export default function Header() {
  const cartCount = useRecoilValue(cartCountState);

  return (
    <S.Wrapper>
      <S.ContentBox>
        <Logo />
        <S.RightBox>
          <S.CartLink to="/cart">
            장바구니
            <S.CartCount>{cartCount}</S.CartCount>
          </S.CartLink>
        </S.RightBox>
      </S.ContentBox>
    </S.Wrapper>
  );
}
