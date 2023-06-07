import styled from 'styled-components';

export const Container = styled.div`
  align-self: flex-start;
  min-width: 360px;
  border: 1px solid #dddddd;
  color: ${(props) => props.theme.color.gray100};
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

export const DetailPriceButton = styled.div`
  position: relative;
  display: flex;
  justify-content: right;
  align-items: center;

  padding-right: 30px;
  width: calc(50% - 62px);
  font-size: 18px;
  color: rgb(136, 136, 136);

  cursor: pointer;

  &:hover {
    & > div {
      display: block;
    }
  }
`;

export const DetailPrice = styled.div`
  position: absolute;
  right: 17px;
  width: 202%;
  display: none;

  text-align: center;
  padding: 15px 10px;
  font-size: 16px;
  border: 1px solid #dddddd;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;
`;

export const Price = styled.span`
  color: ${(props) => props.theme.color.lightMainColor};
`;

export const ExpectedAmountLayout = styled.div`
  background-color: #ffffff;
  display: grid;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #dddddd;
`;

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

export const ButtonContainer = styled.div`
  margin: 10px 30px 20px 30px;
`;
