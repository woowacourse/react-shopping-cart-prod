import { useRecoilState } from 'recoil';
import serverState from '@recoil/server/serverState';
import { ServerName } from '@constants/serverUrlConstants';

export const useServer = () => {
  const [server, setServer] = useRecoilState(serverState);

  const handleServer = (newServer: ServerName) => {
    setServer(newServer);
  };

  return {
    server,
    handleServer,
  };
};
