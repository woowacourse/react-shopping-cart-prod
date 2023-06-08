import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  min-height: 100%;
  display: grid;
  row-gap: 20px;
`;

export const NoExistCouponContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-gap: 20px;

  margin-bottom: 40px;
`;

export const NoExistCouponImage = styled.img``;

export const NoExistCouponText = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

export const NoExistCouponSubText = styled.span`
  font-size: 18px;
  color: #999999;
`;
