import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 1200px;

  > div:last-of-type {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  @media (max-width: 1199px) {
    > div:last-of-type {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    width: 100%;
  }
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
    width: 100%;
  }
`;
