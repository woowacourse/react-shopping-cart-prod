import styled from 'styled-components';

export const CartListSubHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 460px;
  margin: 34px 0px 15px 0px;
  @media only screen and (max-width: 1200px) {
    // 테블릿
    grid-template-columns: 1fr auto;
  }
`;
