import { getCredential } from '@utils/serverUtils';
import { atom, useRecoilState } from 'recoil';

const credentialState = atom({
  key: 'credentialState',
  default: getCredential(1),
});

export default credentialState;

export const useCredential = () => {
  const [credential, setCredential] = useRecoilState(credentialState);

  const setCredentialBy = (userId: number) => {
    setCredential(getCredential(userId));
  };

  return { credential, setCredentialBy };
};
