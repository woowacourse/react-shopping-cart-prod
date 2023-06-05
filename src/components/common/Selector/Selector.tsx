import { ChangeEvent } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { appliedCouponState, checkCartListState, serverState } from '../../../service/atom';
import { servers } from '../../../service/apiURL';
import { queryClient } from '../../..';
import styled from '@emotion/styled';

const Selector = () => {
  const setServerURL = useSetRecoilState(serverState);
  const resetAppliedCoupon = useResetRecoilState(appliedCouponState);
  const checkCartList = useResetRecoilState(checkCartListState);

  const changeServerURL = (e: ChangeEvent<HTMLSelectElement>) => {
    const changedServer = e.target.value as keyof typeof servers;
    resetAppliedCoupon();
    checkCartList();
    setServerURL(servers[changedServer]);
    queryClient.clear();
  };

  return (
    <>
      <Select onChange={changeServerURL}>
        <option>달리</option>
        <option>홍고</option>
        <option>오션</option>
      </Select>
    </>
  );
};

export default Selector;

const Select = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 90px;
  height: 40px;
  margin-right: 10px;
  border-radius: 3px;
  outline: none;
  color: #414141;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;
