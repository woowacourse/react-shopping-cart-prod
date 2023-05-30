import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
    }
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: start;
  justify-content: center;
  gap: 10px;
  animation: ${fadeIn} 0.8s ease-in-out;
`;
