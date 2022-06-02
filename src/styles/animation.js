import { keyframes } from '@emotion/react';

const refresh = keyframes`
  0% {
    background-position: calc(-100px);
  }
  40%,
  100% {
    background-position: 320px;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export { refresh, rotate };
