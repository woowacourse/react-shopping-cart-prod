import { useRecoilState, useRecoilValue } from 'recoil';
import { SERVER_NAMES } from '../constants';
import { ServerNameType } from '../types';
import * as S from './styles/Logo.styles';
import { serverNameState } from '../atom/serverName';
import Image from '../components/common/Image';
import { loginState } from '../atom/login';

export default function Logo() {
  const [serverName, setServerName] = useRecoilState(serverNameState);
  const loginCredential = useRecoilValue(loginState);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerName(e.target.value as ServerNameType);
  };

  return (
    <S.Wrapper>
      <S.HomeLink to="/">
        <Image src="./logo.svg" />
        <S.LogoTitle>{serverName}</S.LogoTitle>
      </S.HomeLink>
      {!loginCredential && (
        <S.Select value={serverName} onChange={onChangeSelect}>
          {SERVER_NAMES.map((serverName) => (
            <option key={serverName}>{serverName}</option>
          ))}
        </S.Select>
      )}
    </S.Wrapper>
  );
}
