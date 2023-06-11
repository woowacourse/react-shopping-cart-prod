import { styled } from "styled-components";

export const PageTitle = styled.div`
  text-align: center;

  margin-bottom: 30px;
  padding: 24px 0;

  font-size: 24px;
  font-weight: 700;

  border-bottom: 3px solid var(--grey-400);

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;