import styled from "styled-components";

export const PointHeader = styled.div`
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

export const ThinBorder = styled.div`
  border: solid 1px black;
`;

export const CurrentPoint = styled.div`
  margin-top: 12px;
  font-size: 22px;

  text-align: center;
`;

export const PointHistoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

export const GoToOrderDetail = styled.button`
  text-align: center;
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
`;

export const PointHistoryText = styled.div`
  font-size: 18px;
  align-items: center;
  padding: 10px 0px 10px 10px;
`;
