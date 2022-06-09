import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

const ControlButton = ({ onClick, children }) => {
  return <StyledRoot onClick={onClick}>{children}</StyledRoot>;
};

const StyledRoot = styled.button`
  ${flexCenter}

  width: 4.2rem;
  height: 3rem;
  border: solid grey 1px;
  cursor: pointer;
`;

export default ControlButton;
