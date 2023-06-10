import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
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
    <Select onChange={changeServerURL}>
      <option>달리</option>
      <option>오션</option>
      <option>홍고</option>
    </Select>
  );
};

export default Selector;

const Select = styled.select`
  width: 70px;
  height: 30px;
`;
