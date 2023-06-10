import styled from "styled-components";

export const PurchaseBoxWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px;

  @media screen and (min-width: ${({theme}) => theme.breakpoints.lg}) {
    width: 33.33%;
  }
`;

export const PurchaseWrapper = styled.div`
  border: 1px solid ${({theme}) => theme.color.secondary};
  padding: 30px;
`;

export const PurchaseTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;

  letter-spacing: 0.5px;
`;

export const PurchaseText = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 27px;

  letter-spacing: 0.5px;

  @media screen and (min-width: ${({theme}) => theme.breakpoints.lg}) {
    font-size: 16px;
  }

  @media screen and (min-width: ${({theme}) => theme.breakpoints.xl}) {
    font-size: 19px;
  }
`;

export const DiscountText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 27px;

  letter-spacing: 0.5px;
`;

export const RealPriceText = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 27px;

  letter-spacing: 0.5px;

  @media screen and (min-width: ${({theme}) => theme.breakpoints.lg}) {
    font-size: 18px;
  }
  @media screen and (min-width: ${({theme}) => theme.breakpoints.xl}) {
    font-size: 22px;
  }
`;

export const PurchasePropertyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PurchaseButtonWrapper = styled.div`
  margin-top: 20px;
`;

interface PurchaseButtonProps {
  disabled?: boolean;
}

export const PurchaseButton = styled.button<PurchaseButtonProps>`
  padding: 26px 0px 26px 0px;
  background-color: black;
  color: white;
  width: 100%;

  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 21px;

  ${({disabled}) => disabled && `
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const Vacant = styled.div`
  margin: 30px 0px 0px 0px;
`;
