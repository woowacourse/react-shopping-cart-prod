import styled from 'styled-components';

export const AmountContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #dddddd;

  &:nth-child(3) {
    border-bottom: none;
    margin-bottom: px;
  }
`;

export const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
`;

export const AmountCategory = styled.div`
  margin: 5px 0 0 30px;
`;

export const Amount = styled.div`
  margin: 5px 30px 0 0;
`;

export const DiscountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin-top: 14px;
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
  color: ${(props) => props.theme.color.lightMainColor};
`;
