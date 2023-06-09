import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSProp, styled } from 'styled-components';

interface Props {
  message: string;
  duration: number;
  css?: CSSProp;
}

const Toast = ({ message, duration, css }: Props) => {
  const [isShowing, setIsShowing] = useState(true);

  setTimeout(() => setIsShowing(false), duration);

  const millisecondsToSeconds = Math.floor(duration / 1000);

  return createPortal(
    <S.Message
      role='alert'
      aria-live='assertive'
      show={`${isShowing}`}
      duration={millisecondsToSeconds}
      css={css}
    >
      {message}
    </S.Message>,
    document.body
  );
};

const S = {
  Message: styled.p<{ show: 'true' | 'false'; duration: number; css?: CSSProp }>`
    display: ${({ show }) => (show === 'true' ? 'block' : 'none')};
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    padding: 16px 36px;
    border-radius: 12px;
    text-align: center;
    color: #fff;
    background: var(--highlight-color);
    animation: ${({ duration }) => `fadeIn ${duration + 1}s, bottomPopUp 1s forwards`};

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    @keyframes bottomPopUp {
      from {
        bottom: 0;
      }
      to {
        bottom: 20%;
      }
    }

    ${({ css }) => css}
  `,
};

export default Toast;
