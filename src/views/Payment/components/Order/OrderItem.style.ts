import {styled} from "styled-components";

export const OrderContainer = styled.div`
  margin-bottom: 5rem;
`;

export const OrderNumber = styled.span`
  font-size: 1.6rem;

  color: ${({ theme }) => theme.darkColor};
  font-weight: 500;
  line-height: 1.3;
`;

export const DetailItemButton = styled.button`
  font-size: 1.4rem;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.secondaryColor};
`;

export const DetailItemSpan = styled.span`
  line-height: 1.7;
`;

export const WrapperTitle = styled.div`
  display: flex;

  justify-content: space-between;
  font-size: 1.6rem;

  color: ${({ theme }) => theme.darkColor};
  font-weight: 500;
  line-height: 1.3;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  margin-bottom: 1rem;

  border-bottom: ${({ theme }) => theme.primaryColor} 1.5px solid;
`;
