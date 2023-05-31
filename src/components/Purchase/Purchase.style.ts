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
  border-bottom: solid 1px rgb(170, 170, 170);
  align-items: center;
`;

export const ProductItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

export const ProductItemList = styled.div`
  width: 100%;
`;
export const ProductItemInfo = styled.div`
  padding: 20px 10px 20px 10px;
  width: 100%;
`;
export const ProductItemName = styled.div`
  font-style: normal;
  font-size: 20px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;
export const ProductItemSubTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProductItemPriceText = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;

export const CouponSelectHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px 0px 10px 0px;
  cursor: pointer;
`;

export const CouponSelectTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;

export const CouponSelectOpenButton = styled.button`
  font-style: normal;
  font-size: 18px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;

export const CouponBoxWrapper = styled.div`
  border-bottom: gray solid 1px;
`;

export const CouponBoxContainer = styled.div`
  margin-bottom: 20px;
`;

export const CouponBox = styled.div`
  border-radius: 10px;
  background-color: cornflowerblue;
  color: white;
  width: 150px;
  height: 100px;
  margin: 10px;
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;

export const PointBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px 0px 10px 0px;
  border-bottom: gray solid 1px;
`;

export const PointInputTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;
`;

export const PointInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const PointInput = styled.input`
  font-style: normal;
  font-size: 18px;
  line-height: 37px;

  letter-spacing: 0.5px;

  width: 100px;
  border: 1px solid blue;
  border-radius: 10px;

  padding: 0px 10px;
`;

export const PointText = styled.div`
  font-style: normal;
  font-size: 18px;
  line-height: 37px;

  letter-spacing: 0.5px;
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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const PurchaseList = styled.div`
  padding: 10px;
  margin-bottom: 10px;
`;

export const PurchasePropertyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PurchasePrimaryText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  letter-spacing: 0.5px;
`;

export const PurchaseSecondaryText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  letter-spacing: 0.5px;

  color: gray;
`;

export const PurchaseResultText = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 27px;

  letter-spacing: 0.5px;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;

export const Option = styled.div`
  font-size: 16px;
  margin-top: 5px;
`;

export const Box = styled.div`
  border-bottom: solid 1px rgb(170, 170, 170);
  padding-bottom: 10px;
`;
