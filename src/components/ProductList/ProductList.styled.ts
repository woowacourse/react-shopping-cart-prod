import { styled } from 'styled-components';

export const ProductList = styled.ul`
  margin-top: 60px;
  padding-bottom: 45px;

  @media screen and (min-width: 501px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 45px;
    grid-row-gap: 60px;
  }

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 40px;

    & > li:not(:last-child) {
      margin-bottom: 45px;
    }
  }
`;
