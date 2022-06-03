import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import styled from 'styled-components';

function Logo() {
  return (
    <StyledLogo>
      <LogoImage width="60" height="60" />
      <h1>나만 알고 싶은 짱구 스토어</h1>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: inherit;

  font-size: 25px;
  font-weight: 900;
`;

const LogoImage = styled(ZzangguLogo)`
  margin-top: 4px;
`;

export default Logo;
