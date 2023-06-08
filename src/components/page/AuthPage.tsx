import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function AuthPage() {
  return (
    <Wrapper>
      <LogoBox>
        <LogoImage src="/logoBlack.svg" />
        <Link to="/">
          <LogoTitle>SHOP</LogoTitle>
        </Link>
      </LogoBox>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  background: white;
`;

const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 224px;
`;

const LogoImage = styled.img`
  width: 64px;
  height: 64px;

  transform: translate(-10%);
`;

const LogoTitle = styled.h1`
  margin-top: 32px;

  font-size: 40px;
  font-weight: 900;
`;
