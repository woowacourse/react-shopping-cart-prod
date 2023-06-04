import styled from 'styled-components';

export const PaymentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

export const PaymentInfoWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 1;
  }
`;

export const PaymentInfo = styled.div``;

export const InfoTitle = styled.div`
  height: 56px;
  border-bottom: 1px solid rgb(234, 235, 239);
  font-size: 18px;
  font-weight: 500;
  line-height: 56px;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 12px;
`;

export const ContentItem = styled.div`
  display: flex;
  font-size: 14px;
`;

export const ItemTitle = styled.div`
  width: 60px;
  color: rgb(117, 117, 117);
`;

export const PurchaseBoxWrapper = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
  min-width: 360px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 0 0 40%;
  }
`;

export const Sticky = styled.div`
  position: sticky;
  top: 100px;
  transition: top 0.1s ease 0s;
`;
