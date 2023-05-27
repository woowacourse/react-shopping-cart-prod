import { styled } from 'styled-components';

export const OrderSummary = styled.section`
  position: -webkit-sticky;
  position: sticky;
  top: 100px;

  width: 448px;
  height: fit-content;

  margin-top: 45px;

  border: 1px solid var(--grey-200);

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const OrderSummaryHeader = styled.h2`
  padding: 22px 30px;

  border-bottom: 3px solid var(--grey-200);

  color: var(--grey-400);

  font-size: 24px;

  letter-spacing: 0.5px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 36px;
`;

export const Prices = styled.div`
  padding: 0 6px;

  width: 100%;
`;

export const Price = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 42px;

  font-style: normal;
  font-weight: 700;
  font-size: 18px;

  letter-spacing: 0.5px;

  &:first-child {
    margin-bottom: 20px;
  }
`;

export const OrderSummaryM = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 80px;

  padding: 16px;

  background-color: var(--grey-500);
  color: var(--grey-100);

  border-top: 2px solid var(--grey-400);

  z-index: 100;

  @media screen and (min-width: 501px) {
    display: none;
  }
`;

export const PricesM = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  width: 100%;
`;

export const PriceM = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  font-size: 12px;

  & > div {
    display: inline-block;
  }

  & > div:last-child {
    font-weight: 600;
    margin-top: 10px;
  }
`;

export const OrderButton = styled.button`
  width: 100px;

  background-color: var(--primary-color);
  color: var(--grey-100);

  font-weight: 600;

  border: none;
  border-radius: 10px;
`;
