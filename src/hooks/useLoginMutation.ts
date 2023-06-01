import { useRecoilValue, useSetRecoilState } from 'recoil';
import clientState from '../recoil/atoms/clientState';
import userAuthorizationState from '../recoil/user/userAuthorizationState';
import type { Authorization } from '../types/Authorization';
import useMutation from './useMutation';

const useLoginMutation = () => {
  const client = useRecoilValue(clientState);
  const setAuthorization = useSetRecoilState(userAuthorizationState);

  const { mutate: login, ...mutationParams } = useMutation((authorization: Authorization) =>
    client
      .withAuthorization(authorization)
      .get('/profile')
      .acceptOrThrow(200)
      .then((response) => {
        setAuthorization(authorization);
        return response.data;
      }),
  );

  return { login, ...mutationParams };
};

export default useLoginMutation;
