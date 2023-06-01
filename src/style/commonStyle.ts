import { styled } from 'styled-components';

export const Title = styled.h1`
  width: 80vw;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  padding: 30px;
  border-bottom: 4px solid #333;
  @media all and (max-width: 479px) {
    display: none;
  }
`;
