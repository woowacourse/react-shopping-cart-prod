import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-top: 2px solid #333;
  padding: 20px 0;
  background-color: #fff;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Input = styled.input`
  appearance: none;
  border: 1px solid gray;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  &:checked {
    border: 4px solid ${({ theme }) => theme.color.info};
  }
`;

export const Coupon = styled.div`
  display: flex;
  align-items: center;
  width: 280px;
  padding: 20px;
  margin-right: 32px;
  border: 2px solid #495057;
  border-radius: 8px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

export const CouponImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

export const DiscountPercentage = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.info};
`;

export const Name = styled.div`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 0;
`;

export const ApplyButton = styled.button`
  width: 284px;
  padding: 16px;
  border-radius: 4px;
  color: #fff;
  background-color: ${({ theme }) => theme.color.primary};
`;
