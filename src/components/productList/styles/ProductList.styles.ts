import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  grid-column-gap: 48px;
  grid-row-gap: 64px;

  @media (max-width: 1272px) {
    grid-template-columns: repeat(3, 282px);
  }

  @media (max-width: 942px) {
    grid-template-columns: repeat(2, 282px);
  }

  @media (max-width: 612px) {
    grid-template-columns: repeat(1, 282px);
  }
`;
