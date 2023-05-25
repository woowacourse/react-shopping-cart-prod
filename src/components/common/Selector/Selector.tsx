import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { serverState } from '../../../service/atom';
import { servers } from '../../../service/apiURL';
import { queryClient } from '../../..';

const Selector = () => {
  const setServerURL = useSetRecoilState(serverState);

  const changeServerURL = (e: ChangeEvent<HTMLSelectElement>) => {
    const changedServer = e.target.value as keyof typeof servers;
    setServerURL(servers[changedServer]);
    queryClient.clear();
  };

  return (
    <select style={{ width: 70, height: 30, marginRight: 10 }} onChange={changeServerURL}>
      <option>달리</option>
      <option>홍고</option>
      <option>오션</option>
    </select>
  );
};

export default Selector;
