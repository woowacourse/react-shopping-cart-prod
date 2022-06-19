import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

export const Styled = {
  EditPasswordPage: styled.div`
    ${flexCenter}
    height: 100rem;
  `,

  Form: styled.form`
    ${flexCenter}
    display: flex;
    flex-direction: column;
    width: 60rem;
    gap: 5rem;
    height: 100rem;
    border: 1px solid ${({ theme }) => theme.colors.grey};
    border-radius: 5px;
  `,

  Title: styled.h1`
    font-weight: 600;
    font-size: 3.4rem;
    line-height: 3.6rem;

    text-align: center;
  `,

  SignUpButton: styled.button`
    width: 80%;
    height: 6.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
    font-size: 2.3rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white};
    border-radius: 6px;
  `,
};
