import styled from 'styled-components';
import viewports from '../../constants/viewports.ts';

export const CartPageContainer = styled.div`
  height: calc(100vh - 80px);
  padding: 25px 0;
  disaply: flex;
  justify-content: center;

  @media screen and (max-width: ${viewports.sm}) {
    padding: 30px 0;
  }
`;

export const CartMainText = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  color: var(--color-brownish-red);

  @media screen and (max-width: ${viewports.md}) {
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

  @media screen and (max-width: ${viewports.sm}) {
    margin-top: 15px;
    margin-bottom: 30px;
  }
`;

export const CartSelectListContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 100px;
  padding: 0 79px;

  @media screen and (max-width: ${viewports.md}) {
    flex-direction: column;
    padding: 0 24px;
    gap: 0;
  }

  @media screen and (max-width: ${viewports.sm}) {
    span {
      font-size: 16px;
    }
  }
`;
