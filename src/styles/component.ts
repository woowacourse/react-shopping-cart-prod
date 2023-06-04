import { css } from 'styled-components';

export type ComponentVariant = 'small' | 'medium';

export interface AmountCounterStyleProps {
  variant: ComponentVariant;
}

export const amountCounterStyles = {
  small: {
    group: {
      height: '28px',
    },
    input: {
      width: '42px',
      fontSize: '16px',
    },
    button: {
      width: '24px',
      height: '14px',
    },
  },
  medium: {
    group: {
      height: '42px',
    },
    input: {
      width: '54px',
      fontSize: '20px',
    },
    button: {
      width: '32px',
      height: '24px',
    },
  },
} as const;

export interface ButtonStyleProps {
  variant: ComponentVariant;
  primary: boolean;
  autoSize: boolean;
  border: boolean;
}

export const buttonStyles = {
  small: {
    width: '100px',
    height: '35px',
    fontSize: '16px',
  },
  medium: {
    width: '300px',
    height: '73px',
    fontSize: '20px',
  },
} as const;

export interface ImageStyleProps {
  variant: ComponentVariant;
}

export const imageStyles = {
  small: {
    width: '180px',
    height: '120px',
  },
  medium: {
    width: '270px',
    height: '180px',
  },
} as const;

export interface SelectBoxStyleProps {
  variant: Extract<ComponentVariant, 'small'>;
  autoSize: boolean;
}

export const selectBoxStyles = {
  small: {
    width: '60px',
    height: '30px',
    padding: '0 4px',
  },
} as const;

export interface ToastStyleProps {
  variant: 'success' | 'error';
}

export const toastStyle = {
  success: css`
    border: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  `,
  error: css`
    border: 2px solid ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.error};
  `,
} as const;
