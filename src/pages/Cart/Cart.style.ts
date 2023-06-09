import styled from 'styled-components';

export const PurchaseBoxWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
  min-width: 360px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 0 0 40%;
  }
`;

export const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

export const EmptyCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 700px;
`;

export const EmptyCartTitle = styled.div`
  font-size: 20rem;
  font-weight: bold;
  text-align: center;
`;

export const EmptyCartDescription = styled.div`
  font-size: 2rem;
  text-align: center;
`;

export const EmptyCartButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0px 20px 0px;
`;

export const EmptyCartButton = styled.button`
  text-align: center;
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
`;
