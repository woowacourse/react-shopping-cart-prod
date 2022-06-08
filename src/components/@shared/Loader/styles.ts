import styled, { keyframes } from 'styled-components';
import { flexColumnCenter } from 'styles/mixin';

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
  width: 100vw;
  height: 50vh;
`;

const Spinner = styled.div<{ size?: string }>`
  border: 16px solid #f3f3f3;
  border-top: 16px solid ${({ theme }) => theme.colors.TEAL_400};
  border-radius: 50%;
  width: ${({ size }) => size || '100px'};
  height: ${({ size }) => size || '100px'};
  animation: ${Spin} 2s linear infinite;
`;

export { LoaderWrapper, Spinner };
