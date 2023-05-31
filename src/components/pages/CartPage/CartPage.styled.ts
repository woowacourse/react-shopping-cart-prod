import { styled } from 'styled-components';

export const Main = styled.div`
  display: flex;

  @media screen and (min-width: 1080px) {
    justify-content: space-between;
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 80px;
  }
`;
