import { useRecoilState } from 'recoil';
import { SERVER_NAMES } from '../constants';
import { ServerNameType } from '../types';
import * as S from './styles/Logo.styles';
import { serverNameState } from '../atom/state';

export default function Logo() {
  const [serverName, setServerName] = useRecoilState(serverNameState);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerName(e.target.value as ServerNameType);
  };

  return (
    <S.Wrapper>
      <S.HomeLink to="/">
        <img src="./logo.svg" />
        <S.LogoTitle>{serverName}</S.LogoTitle>
      </S.HomeLink>
      <S.Select value={serverName} onChange={onChangeSelect}>
        {SERVER_NAMES.map((serverName) => (
          <option key={serverName}>{serverName}</option>
        ))}
      </S.Select>
    </S.Wrapper>
  );
}
