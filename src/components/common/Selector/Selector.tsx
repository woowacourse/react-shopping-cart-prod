import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { serverState } from '../../../service/atom';
import { servers } from '../../../service/apiURL';
import { queryClient } from '../../..';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

const Selector = () => {
  const setServerURL = useSetRecoilState(serverState);
  const navigation = useNavigate();
=======

const Selector = () => {
  const setServerURL = useSetRecoilState(serverState);
>>>>>>> upstream/hafnium1923

  const changeServerURL = (e: ChangeEvent<HTMLSelectElement>) => {
    const changedServer = e.target.value as keyof typeof servers;
    setServerURL(servers[changedServer]);
<<<<<<< HEAD
    navigation('/');
=======
>>>>>>> upstream/hafnium1923
    queryClient.clear();
  };

  return (
<<<<<<< HEAD
    <select style={{ width: 70, height: 30 }} onChange={changeServerURL}>
      <option>달리</option>
      <option>오션</option>
      <option>홍고</option>
=======
    <select style={{ width: 70, height: 30, marginRight: 10 }} onChange={changeServerURL}>
      <option>달리</option>
      <option>홍고</option>
      <option>오션</option>
>>>>>>> upstream/hafnium1923
    </select>
  );
};

export default Selector;
