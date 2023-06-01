import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 60px;

  @media only screen and (max-width: 1200px) {
    // 테블릿
    grid-template-columns: 1fr;
  }

  @media only screen and (max-width: 768px) {
    // 모바일
    margin-bottom: 150px;
  }
`;
