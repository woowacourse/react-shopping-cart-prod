import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

export const Styled = {
  Input: styled.input`
    display: none;
    cursor: pointer;

    &:checked + label::after {
      ${flexCenter}
      content: '✔';
      font-size: 2.5rem;

      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};

      width: 3rem;
      height: 3rem;
      position: absolute;

      left: -0.3rem;
      top: -0.3rem;
    }
  `,

  Label: styled.label`
    caret-color: transparent;
    display: inline-block;
    width: 3rem;
    height: 3rem;
    border: 3px solid ${theme.colors.darkGrey};
    position: relative;
    cursor: pointer;
  `,
};
