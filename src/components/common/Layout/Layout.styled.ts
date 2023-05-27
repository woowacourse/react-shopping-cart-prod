import { styled } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

export const Container = styled.div`
  @media screen and (min-width: 501px) {
    width: 1320px;
  }

  width: 100%;

  margin-top: 80px;

  padding: 0px 16px;
`;
