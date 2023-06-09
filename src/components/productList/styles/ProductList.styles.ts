import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 240px);
  justify-items: center;
  gap: 40px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, 240px);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 240px);
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, 200px);
    gap: 0;
  }
`;
