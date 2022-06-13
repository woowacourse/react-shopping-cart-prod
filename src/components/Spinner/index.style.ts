// @ts-nocheck
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
   0%,
   80%,
   100% {
    transform: scale(0);
   }
   40% {
    transform: scale(1);
   }
`;

const Styled = {
  Container: styled.div`
    text-align: center;
    position: absolute;
    z-index: 700;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      width: 14px;
      height: 14px;
      margin: 0 5px;
      background-color: ${({ theme }) => theme.colors.mint_001};

      border-radius: 100%;
      display: inline-block;
      animation: ${bounce} 1.4s infinite ease-in-out both;
    }
  `,

  BounceFirst: styled.div`
    animation-delay: -0.32s !important;
  `,

  BounceSecond: styled.div`
    animation-delay: -0.16s !important;
  `,

  BounceThird: styled.div``,
};

export default Styled;
