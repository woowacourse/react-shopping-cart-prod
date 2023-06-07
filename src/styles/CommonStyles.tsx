import styled from 'styled-components';
import VIEWPORTS from '../constants/VIEWPORTS.ts';

export const ButtonWithHoverScalingEffect = styled.button`
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

export const MainPageText = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  color: var(--color-brownish-red);

  @media screen and (max-width: ${VIEWPORTS.md}) {
    font-size: 20px;
  }
`;

export const MainTextBorder = styled.hr`
  width: 100%;
  height: 4.3px;
  margin-top: 29px;
  border: none;
  border-radius: 10px;

  background: linear-gradient(90deg, transparent, var(--color-header), transparent);
  background-size: 200% 200%;
  animation: lineAnimation 2s linear infinite;

  @keyframes lineAnimation {
    0% {
      background-position: 100% 0%;
    }
    100% {
      background-position: -100% 0%;
    }
  }

  @media screen and (max-width: ${VIEWPORTS.sm}) {
    margin-top: 15px;
    margin-bottom: 30px;
  }
`;
