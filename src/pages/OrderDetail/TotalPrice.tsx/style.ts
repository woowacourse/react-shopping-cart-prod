import styled from 'styled-components';

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  min-width: 45%;
  max-width: 1320px;
  margin: 50px 0;

  @media only screen and (max-width: 768px) {
    max-width: none;
  }
`;

export const PriceContainer = styled.div`
  border: 1px solid #aaaaaa;
  max-width: 45%;
  min-width: 450px;
  @media only screen and (max-width: 768px) {
    max-width: none;
    width: 100%;
    min-width: 300px;
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
