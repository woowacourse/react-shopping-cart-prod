import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.secondary};
  margin-bottom: 20px;
  padding: 16px 30px;
`;

export const Text = styled.div`
  padding-right: 24px;
  font-weight: 700;
  font-size: 16px;
  line-height: 34px;
  letter-spacing: 0.5px;
`;

export const CouponWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const CouponInfo = styled.div`
  flex: 1;
  padding: 0 4px;
  margin-right: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const PointWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: 52px;
  font-weight: 700;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  flex: 1;
  text-align: end;
  padding: 8px 15px 9px;
  margin-right: 12px;
  border: 1px solid ${({ theme }) => theme.color.secondary};
  border-radius: 4px;
`;

export const AllPointButton = styled.button`
  flex: 0 0 80px;
  height: 34px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.light};
`;

export const UserPoint = styled.p`
  padding: 4px 0 0 56px;
  font-size: 12px;
`;
