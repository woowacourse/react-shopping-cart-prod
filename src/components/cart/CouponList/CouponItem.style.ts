import { styled } from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 24rem;
  height: 16rem;

  border: ${({ selected }) =>
    selected ? `3px solid ${theme.colors.dangerColor} ` : `1px solid ${theme.colors.primaryColor}`};
  padding: 2.5rem 3rem;
  gap: 1rem;

  background: ${theme.colors.lightColor};
  box-shadow: ${theme.shadows.default};

  cursor: pointer;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 28rem;
    height: 18rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 34rem;
    height: 20rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 44rem;
    height: 24rem;
  }
`;

export const Name = styled.h3`
  font-weight: 700;
  font-size: 1.6rem;

  letter-spacing: -0.5px;

  color: ${theme.colors.primaryColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.8rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: 2.4rem;
  }
`;

export const MainValueText = styled.span`
  font-weight: 700;
  font-size: 3rem;

  letter-spacing: -0.5px;

  color: ${theme.colors.primaryColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.4rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 3.8rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: 5rem;
  }
`;

export const SubText = styled.span`
  font-weight: 700;
  font-size: 1.6rem;

  letter-spacing: -0.5px;

  color: ${theme.colors.primaryColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.8rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: 2.4rem;
  }
`;

export const Condition = styled.span`
  font-weight: 400;
  font-size: 1.4rem;
  letter-spacing: -0.5px;

  color: ${theme.colors.primaryColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.6rem;
  }
`;
