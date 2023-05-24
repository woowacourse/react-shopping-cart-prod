import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import { API_BASE_URL_LIST } from '../../../constants/api';
import { currentServerState } from '../../../store/server';
import Select from '../Select/Select';

const ServerSelect = () => {
  const [currentServer, setCurrentServer] = useRecoilState(currentServerState);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentServer(event.target.value);
  };

  return <Select value={currentServer} options={API_BASE_URL_LIST} onChange={handleChange} />;
};

export default ServerSelect;
