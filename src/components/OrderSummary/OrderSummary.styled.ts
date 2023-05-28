import { styled } from 'styled-components';

export const OrderSummary = styled.section`
  position: -webkit-sticky;
  position: sticky;
  top: 100px;

  min-width: 344px;
  height: fit-content;

  margin: 45px 0 0 30px;

  border: 1px solid var(--grey-300);
  border-radius: 8px;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const OrderSummaryHeader = styled.h2`
  padding: 22px 16px;

  border-bottom: 3px solid var(--grey-300);

  color: var(--grey-400);

  letter-spacing: 1px;
`;

export const Content = styled.div`
  width: 100%;

  padding: 30px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: var(--grey-200);
`;

export const Prices = styled.div`
  width: 100%;
`;

export const Price = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 12px 0;

  font-size: 14px;

  letter-spacing: 0.5px;

  &:first-child {
    padding-top: 0;
  }

  &:nth-child(2) {
    padding-bottom: 26px;
  }

  &:last-child {
    padding: 26px 0;
    border-top: 2px solid var(--grey-300);
    border-bottom: 2px solid var(--grey-300);
    margin-bottom: 24px;
  }
`;

export const OrderSummaryM = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 70px;

  padding: 16px;

  background-color: var(--grey-200);

  color: var(--grey-400);

  border-top: 2px solid var(--grey-400);

  z-index: 100;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const PriceInfoM = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

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

export const PriceSummaryM = styled.div`
  display: flex;
  align-items: center;

  & > span {
    padding: 0 15px;
  }
`;

export const TotalPriceM = styled(PriceM)``;

export const OrderButton = styled.button`
  width: 100px;

  background-color: var(--primary-color);
  color: var(--grey-100);

  font-weight: 600;

  border: none;
  border-radius: 10px;
`;
