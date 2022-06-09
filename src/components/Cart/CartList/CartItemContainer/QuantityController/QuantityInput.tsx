import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import { ReactNode } from 'react';

const QuantityInput = ({ children }: { children: ReactNode }) => {
  return <StyledRoot>{children}</StyledRoot>;
};

const StyledRoot = styled.div`
  ${flexCenter}

  font-size: 2.4rem;
  grid-area: qp;
  width: 7.3rem;
  height: 6rem;
  border: solid grey 1px;
`;

export default QuantityInput;
