import styled from 'styled-components';
import theme from 'styles/theme';

export const Styled = {
  PaymentsAmount: styled.div`
    grid-area: pa;

    width: 44.8rem;
    height: 31.8rem;
  `,

  Header: styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 2.4rem;
    line-height: 3.3rem;

    letter-spacing: 0.5px;

    padding: 2rem;
    border: 0.1rem silver solid;
  `,

  Bottom: styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;

    padding: 2rem;
    border: 1px silver solid;
  `,

  TotalPrice: styled.div`
    display: flex;
    width: 100%;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.7rem;

    text-align: center;
    letter-spacing: 0.5px;

    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 6rem;
  `,

  UnderLineBox: styled.div`
    background: linear-gradient(${theme.colors.white} 70%, ${theme.colors.primary} 30%);
  `,

  OrderButton: styled.button`
    width: 38.8rem;
    height: 7.3rem;
    font-size: 2.4rem;
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
  `,
};
