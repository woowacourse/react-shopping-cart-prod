import styled, { keyframes } from 'styled-components';

interface Props {
  message: string;
}

function SnackBar({ message }: Props) {
  return <StyleSnackBar>{message}</StyleSnackBar>;
}

const FadeIn = keyframes`
 from {
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(-50px);
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 1;
  }
  to {
    transform: translateY(50px);
    opacity: 0;
  }
`;

const StyleSnackBar = styled.div`
  min-width: 250px;
  margin-left: -125px;
  background-color: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 0;
  animation: ${FadeIn} 0.5s, ${FadeOut} 0.5s 1.5s;
  animation-fill-mode: forwards;
`;

export default SnackBar;
