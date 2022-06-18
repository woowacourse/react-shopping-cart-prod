import styled from 'styled-components';

export const Styled = {
  ItemDetailPage: styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    width: 64rem;
  `,

  Title: styled.div`
    font-weight: 700;
    font-size: 3.2rem;
    width: 100%;
    padding: 0 3.5rem;
    margin-top: 2.1rem;
    margin-bottom: 3.3rem;
  `,

  Price: styled.div`
    display: flex;
    justify-content: space-between;
    border-top: solid 0.4rem ${({ theme }) => theme.colors.grey};
    width: 100%;
    padding: 0 3.5rem;
    padding-top: 3.3rem;
    margin-bottom: 5.7rem;
  `,

  PriceDescription: styled.span`
    font-weight: 400;
    font-size: 2.4rem;
  `,

  PriceValue: styled.span`
    font-weight: 400;
    font-size: 3.2rem;
  `,
};
