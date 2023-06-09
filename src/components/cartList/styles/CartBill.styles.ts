import styled from 'styled-components';

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;

  width: 448px;
  height: 600px;
  margin-top: 98px;

  @media (max-width: 1199px) {
    width: 660px;
    margin-top: 64px;
  }

  @media (max-width: 670px) {
    width: 100%;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 80px;
  border: 1px solid #dddddd;
  padding: 0 28px;

  font-size: 24px;
  font-weight: 400;
  color: #333333;
`;

export const CouponBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 172px;
  border: 1px solid #dddddd;
  padding: 38px 30px;
`;

export const BillBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 348px;
  border: 1px solid #dddddd;
  padding: 38px 30px;
`;

export const BillRow = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
  padding-left: 6px;

  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #333333;

  &:last-of-type {
    margin-top: 24px;
    margin-bottom: 44px;
  }

  > select {
    text-align: center;
    font-size: 20px;
    color: #333333;
  }
`;

export const CouponBillRow = styled(BillRow)`
  color: var(--primary-color);
`;

export const OrderButton = styled.button`
  width: 100%;
  height: 73px;
  background: #333333;

  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
`;
