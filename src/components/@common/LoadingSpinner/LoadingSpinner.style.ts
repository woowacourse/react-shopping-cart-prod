import styled from 'styled-components';

export const Spinner = styled.span<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border: 5px solid ${({ theme }) => theme.color.white};
  border-bottom-color: ${({ theme }) => theme.color.green100};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
