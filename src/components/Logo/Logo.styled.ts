import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import styled from 'styled-components';

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: inherit;

  font-size: 25px;
  font-weight: 900;
`;

const Image = styled(ZzangguLogo)`
  margin-top: 4px;
`;

export { Logo, Image };
