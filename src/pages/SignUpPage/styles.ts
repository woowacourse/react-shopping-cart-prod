import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';
import styled from 'styled-components';

export const Styled = {
  SignUpPage: styled.div`
    ${flexCenter}
    height: 100rem;
  `,

  Form: styled.form`
    ${flexCenter}
    display: flex;
    flex-direction: column;
    width: 60rem;
    gap: 5rem;
    height: 90rem;
    border: 1px solid ${({ theme }) => theme.colors.grey};
    border-radius: 5px;
  `,

  Title: styled.h1`
    font-weight: 600;
    font-size: 34px;
    line-height: 36px;

    text-align: center;
  `,

  SignUpButton: styled.button`
    width: 80%;
    height: 65px;
    background-color: ${theme.colors.primary};
    font-size: 23px;
    font-weight: bold;
    color: ${theme.colors.white};
    border-radius: 6px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightMint};
    }
  `,
};
