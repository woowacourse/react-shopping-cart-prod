import styled from "styled-components";

export const PointSelectorHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PointSelectorInput = styled.div`
  display: flex;
  justify-content: end;
`;

export const PointSelectorWrapper = styled.div`
  padding: 10px 0px 10px 0px;
  border-bottom: gray solid 1px;
`;

export const PointInputTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;

export const PointInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
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
  font-size: 14px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;

export const PointDescription = styled.div`
  font-style: normal;
  font-size: 18px;
  line-height: 37px;

  letter-spacing: 0.5px;
`;

export const PointButton = styled.button`
  text-align: center;
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
`;
