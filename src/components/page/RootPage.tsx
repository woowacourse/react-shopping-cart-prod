import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../common/Header';

export default function RootPage() {
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
  padding: 60px 16px;

  overflow: scroll;
`;
