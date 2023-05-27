import { ChangeEvent, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import HTTPError from '../../../api/HTTPError';
import { getAuthorizedOptionHeaders } from '../../../api/authorizedOptionHeaders';
import { getCartAPI } from '../../../api/cartAPI';
import { API_BASE_URL_LIST } from '../../../constants/api';
import { cartListState } from '../../../store/cart';
import { currentMemberState } from '../../../store/member';
import { currentServerState } from '../../../store/server';
import Select from '../Select/Select';

interface ServerSelectProps {
  onChange?: () => void;
}

const ServerSelect = ({ onChange }: ServerSelectProps) => {
  const currentServer = useRecoilValue(currentServerState);
  const [error, setError] = useState<Error | HTTPError | null>(null);

  if (error !== null) throw error;

  const handleServerChange = useRecoilCallback(
    ({ snapshot, set }) =>
      async (event: ChangeEvent<HTMLSelectElement>) => {
        set(currentServerState, event.target.value);
        const currentMember = await snapshot.getPromise(currentMemberState);
        const authorizedHeaders = getAuthorizedOptionHeaders(currentMember);
        const cartAPI = getCartAPI(event.target.value, authorizedHeaders);

        try {
          const cartList = await cartAPI.getCartList();
          set(cartListState, cartList);
          onChange?.();
        } catch (error) {
          if (error instanceof Error) {
            setError(error);
          }
        }
      },
    []
  );

  return <Select value={currentServer} options={API_BASE_URL_LIST} onChange={handleServerChange} />;
};

export default ServerSelect;
