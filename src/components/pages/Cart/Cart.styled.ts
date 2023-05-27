import { styled } from 'styled-components';

export const PageTitle = styled.div`
  text-align: center;

  margin-bottom: 16px;
  padding: 30px 0;

  font-size: 32px;
  font-weight: 700;

  border-bottom: 4px solid var(--grey-400);

  @media screen and (max-width: 500px) {
    font-size: 20px;
    padding: 16px 0;
  }
`;

export const Main = styled.div`
  display: flex;

  @media screen and (min-width: 501px) {
    padding-right: 20px;

    justify-content: space-between;
  }

  @media screen and (max-width: 500px) {
    font-size: 20px;

    margin-bottom: 80px;
  }
`;
