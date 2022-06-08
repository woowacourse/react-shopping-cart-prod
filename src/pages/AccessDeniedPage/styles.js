import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  grid-gap: 1rem;

  justify-content: center;

  a {
    color: unset;
  }
`;

export { Container, ButtonContainer };
