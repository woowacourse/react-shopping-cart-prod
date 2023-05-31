import styled from 'styled-components';

export const PurchaseWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.secondary};
  padding: 12px 30px;
`;

export const PurchaseTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 33px;

  letter-spacing: 0.5px;
`;

export const PurchaseText = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 27px;

  letter-spacing: 0.5px;
`;

export const PurchasePropertyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PurchaseButtonWrapper = styled.div`
  margin-top: 32px;
`;

export const PurchaseButton = styled.button`
  padding: 20px 0;
  background-color: black;
  border-radius: 4px;
  color: white;
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  margin-bottom: 10px;
  &:disabled {
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.light};
  }
`;

export const Vacant = styled.div`
  margin: 16px 0px 0px 0px;
`;
