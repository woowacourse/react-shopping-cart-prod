import styled from "styled-components";

export const PaidBoxLayout = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50%;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 33%;
  }
`;

export const PaidBoxHeader = styled.div`
  background: #f6f6f6;
  border: 1px solid #aaaaaa;
  padding: 30px;

  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;

  letter-spacing: 0.5px;

  color: #333333;
`;

export const PaidInfo = styled.div`
  background: #ffffff;
  border: 1px solid #aaaaaa;
  padding: 40px;
`;

export const PaidProperty = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PaidText = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height, or 100% */

  letter-spacing: 0.5px;

  color: #333333;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 20px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 22px;
  }
`;
