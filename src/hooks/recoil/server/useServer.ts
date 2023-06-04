import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import serverState from '@recoil/server/serverState';
import { SERVER_NAME, ServerName } from '@constants/serverUrlConstants';

export const useServer = () => {
  const [server, setServer] = useRecoilState(serverState);

  const handleServer = (newServer: ServerName) => {
    setServer(newServer);
  };

  const onServerChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    const result = SERVER_NAME.filter((item) => item === value)[0];

    handleServer(result);
  };

  return {
    server,
    handleServer,
    onServerChange,
  };
};
