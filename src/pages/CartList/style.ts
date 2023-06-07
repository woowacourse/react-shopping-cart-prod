import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

export const ShoppingCartContentsLayout = styled.div`
  display: grid;
  grid-template-columns: auto 360px;
  column-gap: 100px;
  @media only screen and (max-width: 1200px) {
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

export const CartListLayout = styled.ul`
  display: grid;
  row-gap: 1.5px;

  & > div {
    border-bottom: 1px solid ${(props) => props.theme.color.gray400};
  }
`;
