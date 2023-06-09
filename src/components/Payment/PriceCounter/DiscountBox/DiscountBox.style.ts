import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray400};
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
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 4px;
  margin-right: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const CouponName = styled.span`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const DeleteCouponButton = styled.button`
  flex: 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  height: 16px;
  line-height: 16px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray900};
  font-size: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white};

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.gray900};
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.gray900};
  }
`;

export const PointWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Label = styled.label`
  flex: 0 0 52px;
  width: 52px;
  font-weight: 700;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  flex: 1;
  width: 100%;
  text-align: end;
  padding: 8px 15px 9px;
  margin-right: 12px;
  border: 1px solid ${({ theme }) => theme.color.gray400};
  border-radius: 4px;
`;

export const AllPointButton = styled.button`
  flex: 0 0 80px;
  height: 34px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.color.gray900};
  color: ${({ theme }) => theme.color.white};
`;

export const UserPoint = styled.p`
  padding: 4px 0 0 56px;
  font-size: 12px;
`;

export const Skeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
