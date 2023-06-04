import type { ChangeEventHandler } from 'react';
import { useRecoilState } from 'recoil';

import { SERVER_KEYS, isServerKey } from '../../constants/server';
import { serverNameState } from '../../states/serverName';

const useServerName = () => {
  const [serverName, setServerName] = useRecoilState(serverNameState);

  const serverOptions = SERVER_KEYS.map((serverKey) => ({
    value: serverKey,
    text: serverKey,
    selected: serverKey === serverName,
  }));

  const changeServerName: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const serverKey = event.currentTarget.value;

    if (!isServerKey(serverKey)) return;

    setServerName(serverKey);
  };

  return { serverOptions, changeServerName };
};

export default useServerName;
