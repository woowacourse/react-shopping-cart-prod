import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 660px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 98px;

  @media (max-width: 659px) {
    width: 100%;
  }
`;

export const OrderDetailIdTitle = styled.div`
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background-color: #f6f6f6;
  border: 1px solid #aaaaaa;
  font-size: 18px;
`;

export const OrderItemDetailWrapper = styled.div`
  width: 100%;
`;
