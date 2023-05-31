import styled from 'styled-components';

export const Container = styled.div`
  align-self: flex-start;
  min-width: 360px;
  border: 1px solid #dddddd;
  color: #333333;
  background-color: #dddddd;
  display: grid;
  row-gap: 2px;
  @media only screen and (max-width: 1200px) {
    margin-bottom: 40px;
  }
`;

export const Title = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  background-color: #ffffff;
  padding: 20px 30px;
`;

export const ExpectedAmountLayout = styled.div`
  background-color: #ffffff;
  padding: 20px 0;
  display: grid;
  row-gap: 12px;
`;

export const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;

  &:nth-child(3) {
    padding-bottom: 20px;
    border-bottom: 1px solid #dddddd;
  }

  &:nth-child(4) {
    padding-bottom: 20px;
    border-bottom: 1px solid #dddddd;
  }

  &:nth-child(5) {
    margin: 12px 0 18px 0;
  }
`;

export const AmountCategory = styled.div`
  margin: 5px 0 0 30px;
`;

export const Amount = styled.div`
  margin: 5px 30px 0 0;
`;

export const DiscountCategory = styled.div`
  margin: 5px 0 0 30px;
  font-size: 16px;
  color: #999999;
`;

export const Discount = styled.div`
  margin: 5px 30px 0 0;
  font-size: 16px;
  font-weight: 600;
  color: rgb(6, 192, 158);
`;

export const ButtonContainer = styled.div`
  margin: 0 30px;
`;
