import styled from 'styled-components';

export const ProductListWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 120px;
  gap: 80px;
`;

export const CartListWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  gap: 80px;
  @media all and (max-width: 479px) {
    gap: 30px;
  }
`;

export const OrderListWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0;
  gap: 40px;
  @media all and (max-width: 479px) {
    gap: 30px;
  }
`;

export const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const OrderDetailWrapper = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 40px;
  @media all and (max-width: 479px) {
    gap: 30px;
  }
`;
