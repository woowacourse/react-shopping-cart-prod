import styled, { keyframes } from 'styled-components';
import { flexColumnCenter } from '@/styles/mixin';

const Spin = keyframes`
0% { 
    transform: rotate(0deg); 
}
100% { 
    transform: rotate(360deg);
 }
`;

const LoaderWrapper = styled.div`
  ${flexColumnCenter};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  div {
    border: 16px solid #f3f3f3;
    border-top: 16px solid ${({ theme }) => theme.colors.TEAL_400};
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: ${Spin} 2s linear infinite;
  }
`;

export { LoaderWrapper };
