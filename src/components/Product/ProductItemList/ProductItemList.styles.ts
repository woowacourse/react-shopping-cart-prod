import styled from 'styled-components';

export const ProductListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  margin-top: 60px;
  column-gap: 5%;

  @media (min-width: 720px) and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 480px) and (max-width: 719px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 320px) and (max-width: 479px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
