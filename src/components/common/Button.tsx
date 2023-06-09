import { ButtonHTMLAttributes } from 'react';

import { styled } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: 'primary';
  designType: 'square' | 'rectangle';
}

export const Button = ({ bgColor, designType, disabled, ...props }: Partial<Props>) => {
  return (
    <Style.Button className={designType} {...props} disabled={disabled}>
      {props.children}
    </Style.Button>
  );
};

const Style = {
  Button: styled.button<Partial<Props>>`
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;

    background-color: inherit;
    color: var(--grey-100);

    cursor: pointer;

    &.square {
      border-radius: 7px;

      color: var(--grey-600);
    }

    &.rectangle {
      width: 280px;
      height: 73px;

      border: ${(props) => props.bgColor ?? 'solid 1px var(--grey-300)'};
      background-color: ${(props) => props.bgColor ?? 'var(--primary-color)'};

      color: ${(props) => props.bgColor ?? 'var(--grey-100)'};

      font-size: 24px;

      @media screen and (max-width: 501px) {
        width: 75px;
        height: 100%;

        color: var(--grey-100);

        font-size: 14px;
        font-weight: 600;

        border: none;
        border-radius: 10px;
      }
    }

    &:disabled {
      color: var(--grey-300);
    }
  `,
};
