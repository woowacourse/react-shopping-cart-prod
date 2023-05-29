import styled from "styled-components";

export const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

export const OrderItemHeader = styled.div`
  display: flex;
  justify-content: space-between;

  background: #f6f6f6;
  border: 1px solid #aaaaaa;

  padding: 36px;
`;

export const OrderItemHeaderName = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.5px;

  color: #333333;
`;

export const OrderItemBox = styled.div`
  display: flex;
  padding: 40px 26px 40px 26px;

  background: #ffffff;
  border: 1px solid #aaaaaa;
`;

export const OrderItemImage = styled.img`
  width: 144px;
  height: 144px;
`;

export const OrderItemInfo = styled.div`
  margin-left: 33px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OrderItemName = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.5px;
  color: #333333;
`;

export const OrderItemPrice = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */

  letter-spacing: 0.5px;

  color: #888888;
`;
