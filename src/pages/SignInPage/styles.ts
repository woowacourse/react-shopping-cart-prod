import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

export const Styled = {
  SignInPage: styled.div`
    ${flexCenter}
    height: 100rem;
  `,

  Form: styled.form`
    ${flexCenter}
    display: flex;
    flex-direction: column;
    width: 60rem;
    gap: 5rem;
    height: 70rem;
    border: 1px solid ${theme.colors.grey};
    border-radius: 5px;
  `,

  Title: styled.h1`
    font-weight: 600;
    font-size: 3.4rem;
    line-height: 3.6rem;

    text-align: center;
  `,

  SignInButton: styled.button`
    width: 80%;
    height: 6.5rem;
    background-color: ${theme.colors.primary};
    font-size: 2.3rem;
    font-weight: bold;
    color: ${theme.colors.white};
    border-radius: 6px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightMint};
    }
  `,

  Footer: styled.div`
    display: flex;
    width: 80%;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 2rem;
    line-height: 2.4rem;
    letter-spacing: 0.5px;
  `,
};
