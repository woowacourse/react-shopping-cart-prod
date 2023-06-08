import { useRecoilState } from 'recoil';
import { serverAtom } from 'recoil/server';
import { SERVERS } from 'constants/index';
import { ServerName } from 'types';
import * as S from './SelectServer.styles';

const SelectServer = () => {
  const [server, setServer] = useRecoilState(serverAtom);

  const onChangeServer: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const serverName = event.target.value as ServerName;
    setServer(SERVERS[serverName]);
  };

  return (
    <S.SelectBox onChange={onChangeServer}>
      <option value="여우" selected={server === SERVERS['여우']}>
        여우
      </option>
      <option value="루쿠" selected={server === SERVERS['루쿠']}>
        루쿠
      </option>
      <option value="프론트" selected={server === SERVERS['프론트']}>
        프론트
      </option>
    </S.SelectBox>
  );
};

export default SelectServer;
