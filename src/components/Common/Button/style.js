import styled, { css } from 'styled-components';

export const buttonSize = {
  large: css`
    width: 380px;
    height: 58px;
    font-size: 22px;
  `,
  medium: css`
    width: 240px;
    height: 50px;
    font-size: 19px;
  `,
  small: css`
    width: 100px;
    height: 35px;
    font-size: 15px;
  `,
  default: css`
    width: 100%;
    height: 40px;
    font-size: 16px;
  `,
};

export const buttonColor = {
  primary: css`
    background-color: ${(props) => props.theme.COLOR.CYAN_300};
  `,
  secondary: css`
    background-color: ${(props) => props.theme.COLOR.GREY_500};
  `,
  tertiary: css`
    background-color: ${(props) => props.theme.COLOR.PRIMARY_RED};
  `,
};

export const Button = styled.button`
  color: ${({ theme }) => theme.COLOR.WHITE};
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.FONT.SECONDARY};
  ${({ size }) => buttonSize[size]}
  ${({ colorType }) => buttonColor[colorType]}
`;
