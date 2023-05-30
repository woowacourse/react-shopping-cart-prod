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
    // 테블릿
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
  padding: 20px 30px;
  display: grid;
  row-gap: 30px;
`;

export const AmountWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  :nth-child(3) {
    padding: 10px 0px;
  }
`;

export const AmountCategory = styled.div``;

type AmountProps = {
  isDiscounted?: boolean;
};

export const Amount = styled.div<AmountProps>`
  opacity: ${(props) => props.isDiscounted && 0.6};
  text-decoration: ${(props) => props.isDiscounted && 'line-through'};
`;

export const DiscountAmount = styled.div`
  position: absolute;
  right: 0;
  bottom: -22px;
`;
