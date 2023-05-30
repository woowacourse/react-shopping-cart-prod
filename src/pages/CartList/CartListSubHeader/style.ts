import styled from 'styled-components';

export const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  color: #333333;
  border-bottom: 2px solid #333333;
  padding-bottom: 30px;
`;

export const CartListSubHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 460px;
  margin: 34px 0px 15px 0px;
  @media only screen and (max-width: 1200px) {
    // 테블릿
    grid-template-columns: 1fr auto;
  }
`;
