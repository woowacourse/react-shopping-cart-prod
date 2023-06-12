import {styled} from "styled-components";

export const ButtonWrapper = styled.div`
  display: flex;
  position: fixed;
  width: 80%;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
`;

export const CouponListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin: 0 auto;

  max-width: 320px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 640px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 960px;
  }
`;

export const CouponContainerTitle = styled.div`
  font-size: 2rem;
  text-align: left;
  font-weight: 600;
  padding-left: 2rem;
  padding-bottom: 0.6rem;
  margin-bottom: 2rem;

  border-bottom: 2px solid ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryColor};
`;
