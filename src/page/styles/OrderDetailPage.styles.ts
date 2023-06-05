import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 1200px;
`;

export const OrderDetailHeader = styled.div`
  width: 1200px;
  border-bottom: 1px solid #333333;
  padding-bottom: 28px;

  line-height: 37px;
  letter-spacing: 0.5px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;

  color: #333333;

  @media (max-width: 1199px) {
    width: 660px;
  }

  @media (max-width: 670px) {
    width: 100%;
  }
`;
