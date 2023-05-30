import styled from 'styled-components';

export const Container = styled.div``;

export const ShoppingCartContentsLayout = styled.div`
  display: grid;
  grid-template-columns: auto 360px;
  column-gap: 100px;
  @media only screen and (max-width: 1200px) {
    // 테블릿
    grid-template-columns: auto;
    row-gap: 40px;
  }

  @media only screen and (max-width: 768px) {
    margin-bottom: 150px;
  }
`;

export const CartList = styled.div`
  margin-bottom: 60px;

  @media only screen and (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const CartListLayout = styled.div`
  display: grid;
  background-color: #cccccc;
  row-gap: 1.5px;
`;

export const PaymentLayout = styled.div`
  display: grid;
  row-gap: 20px;
  align-self: flex-start;
  min-width: 360px;
`;
