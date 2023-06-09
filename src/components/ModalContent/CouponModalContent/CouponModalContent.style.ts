import styled, { css } from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid ${({ theme }) => theme.color.gray900};
  background-color: ${({ theme }) => theme.color.white};
`;

export const CouponWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 400px;
  overflow-y: auto;
  gap: 20px;
  margin: 40px 0;
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
    border: 4px solid ${({ theme }) => theme.color.green100};
  }
`;

export const Coupon = styled.div<{ unavailable: boolean }>`
  display: flex;
  align-items: center;
  width: 280px;
  height: 124px;
  padding: 20px;
  margin-right: 32px;
  border: 2px solid ${({ theme }) => theme.color.gray700};
  border-radius: 8px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  ${({ unavailable }) =>
    unavailable &&
    css`
      & *:not(:last-child) {
        color: ${({ theme }) => theme.color.gray700};
      }
      &:hover {
        transform: none;
      }
    `}
`;

export const CouponImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

export const DiscountPercentage = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.green100};
`;

export const Name = styled.div`
  display: -webkit-box;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const DiscountAmount = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-top: 4px;
  color: ${({ theme }) => theme.color.blue200};
`;

export const Unavailable = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.red};
  margin-top: 4px;
`;

export const ApplyButton = styled.button`
  width: 284px;
  padding: 16px;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.gray900};
`;

export const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: 12rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.black};
`;

export const EmptyDescription = styled.div`
  margin-top: 40px;
  font-size: 16px;
`;
