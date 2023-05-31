import styled from 'styled-components';

export const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  line-height: 37px;
  color: #333333;

  border-bottom: 2px solid #333333;
  padding-bottom: 30px;
`;

export const Container = styled.div``;

export const ShowDetailButton = styled.button`
  font-size: 20px;
  line-height: 24px;
  width: 140px;
  background-color: transparent;
  cursor: pointer;
`;

export const OrderItemsContainer = styled.ul`
  width: 100%;
`;

export const OrderID = styled.div`
  font-size: 20px;
  line-height: 24px;
  width: 140px;
`;

export const OrderTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border: 1px solid #aaaaaa;
  background-color: #f6f6f6;

  padding: 34px 30px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  min-width: 45%;
  max-width: 1320px;

  @media only screen and (max-width: 768px) {
    max-width: none;
  }
`;

export const PriceContainer = styled.div`
  border: 1px solid #aaaaaa;
  max-width: 45%;
  @media only screen and (max-width: 768px) {
    max-width: none;
    width: 100%;
  }
`;

export const PriceTitle = styled.div`
  padding: 34px 33px;

  font-size: 28px;
  font-weight: 700;
  line-height: 28px;
  border-bottom: 1px solid #aaaaaa;

  background-color: #f6f6f6;
`;

export const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 31px 40px;

  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
`;

export const AmountCategory = styled.div``;

export const Amount = styled.div``;
