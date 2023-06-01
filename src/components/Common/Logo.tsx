import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const Logo = ({ children }: PropsWithChildren) => {
  return <StyledLogo>{children}</StyledLogo>;
};

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Logo;
