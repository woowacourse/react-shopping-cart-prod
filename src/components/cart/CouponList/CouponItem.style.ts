import { styled } from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div<{ isSelect: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 44rem;
  height: 24rem;

  border: ${({ isSelect }) =>
    isSelect ? `3px solid ${theme.colors.dangerColor} ` : `1px solid ${theme.colors.primaryColor}`};
  padding: 2.5rem 3rem;
  gap: 1rem;

  background: ${theme.colors.lightColor};
  box-shadow: ${theme.shadows.default};
`;

export const Name = styled.h3`
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 4rem;

  letter-spacing: -0.5px;

  color: ${theme.colors.primaryColor};
`;

export const MainValueText = styled.span`
  font-weight: 700;
  font-size: 6rem;

  letter-spacing: -0.5px;

  color: ${theme.colors.primaryColor};
`;

export const SubText = styled.span`
  font-weight: 700;
  font-size: 3rem;
  line-height: 8.5rem;

  letter-spacing: -0.5px;

  color: ${theme.colors.primaryColor};
`;

export const Condition = styled.span`
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2.6rem;
  letter-spacing: -0.5px;

  color: ${theme.colors.primaryColor};
`;
