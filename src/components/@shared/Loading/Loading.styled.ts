import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 20%;

  p {
    font-size: 20px;
    font-weight: 600;
  }
`;

export { LoadingContainer };
