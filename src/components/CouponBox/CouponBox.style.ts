import styled from "styled-components";

interface CouponWrapperProps {
  disabled?: boolean;
}

export const CouponWrapper = styled.div<CouponWrapperProps>`
  border-radius: 10px;
  border: cornflowerblue solid 1px;

  margin: 10px 0px 10px 0px;
  padding: 20px;

  display: flex;
  gap: 15px;

  cursor: pointer;

  &:hover {
    background-color: gainsboro;
  }

  ${({ disabled }) => disabled && `
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const CouponInfo = styled.div``;

export const CouponTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const CouponDescription = styled.div`
  font-size: 14px;
`;
