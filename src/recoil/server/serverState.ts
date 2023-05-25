import { atom, useRecoilState } from 'recoil';

export const SERVER_NAME = ['마코', '허브', '우가'] as const;

export const SERVER = {
  [SERVER_NAME[0]]: 'https://m4co.shop',
  [SERVER_NAME[1]]: 'https://h3rb.shop',
  [SERVER_NAME[2]]: 'https://wuga.shop',
} as const;

export type ServerName = keyof typeof SERVER;

const serverState = atom<ServerName>({
  key: 'serverState',
  default: SERVER_NAME[0],
});

export default serverState;

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
