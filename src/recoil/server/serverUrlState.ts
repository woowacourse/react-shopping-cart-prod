import { CrewName, SERVER_BY_CREW } from '@utils/serverUtils';
import { atom, useRecoilState } from 'recoil';

const serverUrlState = atom<string>({
  key: 'serverState',
  default: 'msw',
});

export default serverUrlState;

export const useServerUrl = () => {
  const [serverUrl, setServerUrl] = useRecoilState(serverUrlState);

  const setServerUrlBy = (crew: CrewName) => {
    setServerUrl(SERVER_BY_CREW[crew].url);
  };

  return {
    serverUrl,
    setServerUrlBy,
  };
};
