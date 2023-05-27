import { CrewName, SERVER_BY_CREW, getCredential } from '@utils/serverUtils';
import { atom, useRecoilState } from 'recoil';

const credentialState = atom({
  key: 'credentialState',
  default: getCredential('마코', 1),
});

export default credentialState;

export const useCredential = () => {
  const [credential, setCredential] = useRecoilState(credentialState);

  const setCredentialBy = (crew: CrewName, userId: number) => {
    const { user } = SERVER_BY_CREW[crew];
    if (!user.some((user) => user.id === userId)) {
      throw new Error('crew server의 user id를 찾을 수 없습니다.');
    }
    const { username, password } = user[userId];

    setCredential(btoa(`${username}:${password}`));
  };

  return { credential, setCredentialBy };
};
