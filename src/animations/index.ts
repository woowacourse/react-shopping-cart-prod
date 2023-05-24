import { keyframes } from 'styled-components';

export const appearAnimation = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

export const disappearAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
`;

export function QuickMenuAppear(position: Partial<Record<'right' | 'bottom' | 'top' | 'left', string>>) {
  return keyframes`
  from {
    pointer-events: none;
    opacity: 0;
    bottom: 0;
  }
  to {
    display: block;
    opacity: 1;
    ${position};
  }`;
}

export const QuickMenuDisAppear = keyframes`
  from {
    opacity: 1;
  }
  to {
    display: none;
    opacity: 0;
    pointer-events: none;
    bottom: 0;
  }
`;
