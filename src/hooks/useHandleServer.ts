import { useRecoilState } from 'recoil';
import { serverAtom } from '../stores/serverStore.ts';
import { ServerNames } from '../types/request.ts';

const useHandleServer = () => {
  const [server, setServer] = useRecoilState(serverAtom);

  const handleServer = (server: ServerNames) => {
    setServer(server);
  };

  return { server, handleServer };
};

export default useHandleServer;
