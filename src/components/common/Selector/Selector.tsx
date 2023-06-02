import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { serverState } from '../../../service/atom';
import { servers } from '../../../service/apiURL';
import { queryClient } from '../../..';
import { useNavigate } from 'react-router-dom';

const Selector = () => {
  const setServerURL = useSetRecoilState(serverState);
  const navigation = useNavigate();

  const changeServerURL = (e: ChangeEvent<HTMLSelectElement>) => {
    const changedServer = e.target.value as keyof typeof servers;
    setServerURL(servers[changedServer]);
    navigation('/');
    queryClient.clear();
  };

  return (
    <select style={{ width: 70, height: 30 }} onChange={changeServerURL}>
      <option>달리</option>
      <option>오션</option>
      <option>홍고</option>
    </select>
  );
};

export default Selector;
