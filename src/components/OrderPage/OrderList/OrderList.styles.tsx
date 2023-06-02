import styled from 'styled-components';

export const Root = styled.div`
  & > section:not(:first-child) {
    margin-top: 5rem;
  }
`;
