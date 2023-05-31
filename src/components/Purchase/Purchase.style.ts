import styled from "styled-components";

export const PurchaseTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;

  margin: 10px 0px 10px 0px;
`;

export const FatBorder = styled.hr`
  border: solid 4px black;
`;

export const ProductItemLayout = styled.div`
  display: flex;
  border-bottom: solid 1px gray;
`;

export const ProductItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

export const ProductItemList = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;
export const ProductItemInfo = styled.div`
  padding: 20px 0px 20px 0px;
`;
export const ProductItemName = styled.div`
  font-style: normal;
  font-size: 20px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;
export const ProductItemSubTotalPrice = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;

export const CouponSelectTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;

  letter-spacing: 0.5px;
`;

export const CouponBoxContainer = styled.div``;

export const CouponBox = styled.div`
  border-radius: 10px;
  background-color: cornflowerblue;
  color: white;
  width: 150px;
  height: 100px;
  margin-right: 10px; /* Add margin between the coupons */
`;

export const Button = styled.button`
  width: 100%;
  background-color: ${({ color }) => color};
  border-radius: 10px;
  color: white;
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
`;

export const TempText = styled.div`
  font-size: 18px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;
