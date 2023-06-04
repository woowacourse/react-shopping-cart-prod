import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Header from '../common/Header';

import useToast from '../../hooks/useToast';
import { couponsState, serverNameState, tokenState } from '../../recoil/state';
import api from '../../api';

export default function RootPage() {
  const serverName = useRecoilValue(serverNameState);
  const token = useRecoilValue(tokenState);
  const setCoupons = useSetRecoilState(couponsState);

  const { showToast } = useToast();

  useEffect(() => {
    if (token === null) return;

    try {
      api.getCoupons(serverName, token).then(setCoupons);
    } catch {
      showToast('error', '쿠폰가져오기 실패');
    }
  }, [serverName, token]);

  return (
    <Wrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding-top: 80px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding-top: 48px;

  overflow: scroll;
`;
