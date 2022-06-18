import theme from 'styles/theme';
import styled from 'styled-components';

export const Styled = {
  CartPage: styled.div`
    display: grid;
    grid-template-areas:
      'hd hd'
      'cl pa';
  `,

  Header: styled.div`
    grid-area: hd;
    text-align: center;
    border-bottom: 4px solid ${theme.colors.lightBlack};
    margin-bottom: 5.3rem;
    padding: 2.9rem;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 3.2rem;
    line-height: 3.7rem;

    text-align: center;
    letter-spacing: 0.5px;
  `,
};
