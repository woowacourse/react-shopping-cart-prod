import { styled } from 'styled-components';
import { theme } from '@styles/theme';
import { StepperStyleType } from '.';

export const CartBox = styled.div`
  display: flex;
`;

export const QuantityInput = styled.input<{ stepperstyle: StepperStyleType }>`
  width: ${({ stepperstyle }) => (stepperstyle === 'small' ? '42px' : '73px')};
  height: ${({ stepperstyle }) => (stepperstyle === 'small' ? '28px' : '60px')};

  border: 1px solid ${({ theme }) => theme.colors.secondaryColor};

  font-weight: 400;
  font-size: ${({ stepperstyle }) => (stepperstyle === 'small' ? '1.2rem' : '2.4rem')};
  letter-spacing: 0.5px;

  text-align: center;

  color: ${theme.colors.primaryColor};
`;

export const QuantityControlButton = styled.button<{ stepperstyle: StepperStyleType }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ stepperstyle }) => (stepperstyle === 'small' ? '24px' : '42px')};
  height: ${({ stepperstyle }) => (stepperstyle === 'small' ? '14px' : '30px')};

  border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
  border-left: none;

  font-size: ${({ stepperstyle }) => (stepperstyle === 'small' ? '1.2rem' : '2.4rem')};
  line-height: ${({ stepperstyle }) => (stepperstyle === 'small' ? '1.2rem' : '2.4rem')};

  color: ${theme.colors.primaryColor};

  &:first-child {
    border-bottom: none;
  }

  &:disabled {
    color: ${theme.colors.secondaryColor};
    cursor: not-allowed;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;
