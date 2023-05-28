import { ChangeEvent } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { API_BASE_URL_LIST } from '../../../constants/api';
import { cartListQuery, cartListState } from '../../../store/cart';
import { currentServerState } from '../../../store/server';
import Select from '../Select/Select';

interface ServerSelectProps {
  onChange?: () => void;
}

const ServerSelect = ({ onChange }: ServerSelectProps) => {
  const currentServer = useRecoilValue(currentServerState);

  const handleServerChange = useRecoilCallback(
    ({ set, reset, refresh }) =>
      (event: ChangeEvent<HTMLSelectElement>) => {
        set(currentServerState, event.target.value);
        reset(cartListState);
        refresh(cartListQuery);
        onChange?.();
      }
  );

  return <Select value={currentServer} options={API_BASE_URL_LIST} onChange={handleServerChange} />;
};

export default ServerSelect;
