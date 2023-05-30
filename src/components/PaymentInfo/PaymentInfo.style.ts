import styled from 'styled-components';

export const TotalDiscountText = styled.div`
  color: ${({ theme }) => theme.color.info};
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;

  letter-spacing: 0.5px;
`;

export const DiscountPropertyWrapper = styled.div`
  padding-left: 12px;
  display: flex;
  justify-content: space-between;
`;

export const DiscountText = styled.div`
  color: ${({ theme }) => theme.color.secondary};
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;

  letter-spacing: 0.5px;
`;

export const DiscountWrapper = styled.div`
  margin: 10px 0;
`;
