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

  padding: 16px 16px 30px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: var(--grey-200);
`;

export const Prices = styled.div`
  width: 100%;

  margin-bottom: 20px;
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 0;

  font-size: 14px;

  letter-spacing: 0.5px;
`;

export const TotalProductsPrice = styled(Price)``;

export const ShippingPrice = styled(Price)`
  border-bottom: 1px solid var(--grey-300);
`;

export const PaymentPrice = styled(Price)`
  position: relative;
`;

export const EarnPoint = styled.p`
  position: absolute;
  bottom: -4px;
  right: 0;

  opacity: 0.5;

  font-size: 12px;
`;

export const Point = styled(Price)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--primary-color);

  font-size: 12px;
`;

export const PointInput = styled.input`
  height: 25px;
  width: 140px;

  background-color: var(--grey-200);

  padding-right: 5px;

  outline: none;
  border: none;
  border-bottom: 1px solid var(--grey-400);

  font-weight: 600;
  text-align: right;
`;

export const UseAllPointButton = styled.button`
  font-size: 12px;

  padding: 5px 4px;

  color: var(--grey-100);

  background-color: var(--grey-400);

  border: none;

  cursor: pointer;
`;

export const ShippingPolicy = styled.p`
  position: absolute;
  right: 0;
  bottom: 12px;

  color: var(--red);

  font-size: 11px;
`;

export const OrderSummaryM = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 85px;

  padding: 10px;

  background-color: var(--grey-100);

  border-top: 2px solid var(--grey-200);

  z-index: 100;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const OrderButtonM = styled.button`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--primary-color);

  padding: 0 20px;

  width: 100%;
  height: 48px;

  color: var(--grey-100);

  font-weight: 900;

  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const SelectedProductLength = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 22px;
  height: 22px;

  background-color: white;

  color: var(--primary-color);

  border-radius: 50%;
`;

export const ButtonRole = styled.div`
  position: absolute;

  font-size: 18px;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const TotalPriceM = styled.div``;
