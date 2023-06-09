import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid rgb(234, 235, 239);
  border-radius: 4px;
`;

export const Summary = styled.div`
  padding: 11px 16px 10px;
  background-color: rgb(247, 248, 250);
  font-size: 14px;
  line-height: 19px;
  color: rgb(66, 66, 66);
  font-weight: bold;
`;

export const PaymentItem = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid rgb(234, 235, 239);
`;

export const ItemImage = styled.img`
  width: 64px;
  height: 64px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

export const ItemName = styled.div`
  font-size: 14px;
`;

export const ItemPrice = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const ItemQuantity = styled.span`
  font-size: 12px;
  padding-left: 4px;
  color: rgb(130, 140, 148);
`;
