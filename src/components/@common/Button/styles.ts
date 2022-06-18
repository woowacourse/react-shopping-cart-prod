import styled from 'styled-components';
import theme from 'styles/theme';

export type Size = 'large' | 'medium' | 'small';
export type Theme = typeof theme;

type ButtonProps = {
  size: Size;
  backgroundColor: keyof Theme['colors'];
};

export const Styled = {
  Button: styled.button<ButtonProps>`
    background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    color: ${theme.colors.white};
    ${({ size }) => {
      switch (size) {
        case 'large':
          return `
          width: 63.8rem; 
          height: 9.8rem;
          font-size: 3.2rem;
        `;
        case 'medium':
          return `
          width: 38.8rem; 
          height: 7.3rem;
          font-size: 2.4rem;
        `;
        case 'small':
          return `
          width: 13.8rem; 
          height: 4.7rem;
          font-size: 2.0rem;
        `;
      }
    }};
  `,
};
