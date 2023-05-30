import * as S from './styles/Header.styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartCountState, serverNameState } from '../atom/state';
import { SERVER_NAMES } from '../constants';
import { ServerNameType } from '../types';

export default function Header() {
  const cartCount = useRecoilValue(cartCountState);
  const [serverName, setServerName] = useRecoilState(serverNameState);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerName(e.target.value as ServerNameType);
  };

  return (
    <S.Wrapper>
      <S.ContentBox>
        <S.HomeLink to="/">
          <img src="./logo.svg" />
          <S.LogoTitle>SHOP</S.LogoTitle>
        </S.HomeLink>
        <S.RightBox>
          <S.Select value={serverName} onChange={onChangeSelect}>
            {SERVER_NAMES.map((serverName) => (
              <option key={serverName}>{serverName}</option>
            ))}
          </S.Select>
          <S.CartLink to="/cart">
            장바구니
            <S.CartCount>{cartCount}</S.CartCount>
          </S.CartLink>
        </S.RightBox>
      </S.ContentBox>
    </S.Wrapper>
  );
}
