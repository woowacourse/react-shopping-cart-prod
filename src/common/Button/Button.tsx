import { css, styled } from 'styled-components';

type ButtonSize = 's' | 'm' | 'l';

const ButtonSizes = {
  s: {
    padding: '1rem',
    fontSize: '1.2rem',
  },
  m: {
    padding: '1em',
    fontSize: '1.4rem',
  },
  l: {
    padding: '1.6rem',
    fontSize: '1.6rem',
  },
};

interface ButtonProps {
  size: ButtonSize;
  primary: boolean;
}

const Button = styled.button<ButtonProps>`
  font-weight: 600;
  width: 100%;
  border: ${({ theme }) => theme.primaryColor} 1px solid;
  border-radius: 3px;

  ${({ size }) => css`
    padding: ${ButtonSizes[size].padding};
    font-size: ${ButtonSizes[size].fontSize};
  `}

  ${({ primary, theme }) =>
    primary
      ? css`
          background-color: ${theme.primaryColor};
          color: ${theme.lightColor};
        `
      : css`
          background-color: ${theme.lightColor};
          color: ${theme.primaryColor};
        `}

    &:disabled {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.primaryColor};
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;
