import styled from 'styled-components';

export const Container = styled.section`
  width: 360px;
  padding: 24px;
  margin-top: 24px;
  border: 1px solid ${(props) => props.theme.color.gray};
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  padding-bottom: 20px;
  font: ${(props) => props.theme.font.medium};
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};
`;

export const CouponList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
`;

export const CouponWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CouponName = styled.p`
  font: ${(props) => props.theme.font.small};
  margin-left: 10px;
`;
