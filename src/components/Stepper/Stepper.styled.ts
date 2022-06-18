import styled, { css } from 'styled-components';
import * as T from 'components/Stepper/Stepper.types';

export const StepItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

export const Circle = styled.div<T.CircleProps>`
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  color: ${({ theme: { colors } }) => colors.blue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  ${({ theme: { colors }, selected }) =>
    selected &&
    css`
      background: ${colors.blue};
      color: ${colors.white};
      border: none;
    `}
`;

export const StepTitle = styled.p<T.StepTitleProps>`
  font-weight: normal;
  ${({ theme: { colors }, selected }) =>
    selected &&
    css`
      font-weight: bold;
    `}
`;

export const StepList = styled.ul`
  display: flex;
  gap: 2rem;

  ${StepItem} + ${StepItem} {
    :after {
      position: absolute;
      content: '';
      letter-spacing: 3px;
      line-height: 1px;
      width: 2rem;
      height: 1px;
      border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
      box-sizing: border-box;
      overflow: hidden;
      top: 20px;
      left: -2rem;
    }
  }
`;
