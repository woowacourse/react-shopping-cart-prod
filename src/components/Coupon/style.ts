import styled from 'styled-components';

type ContainerProps = {
  isUsed: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: #fcfcfc;
  padding: 20px;
  border-radius: 8px;
  color: #333333;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  opacity: ${(props) => props.isUsed && '0.6'};
`;

export const CouponLayout = styled.div`
  display: grid;
  row-gap: 10px;
`;

export const CouponDescription = styled.div`
  font-size: 18px;
`;

export const CouponName = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

export const CouponSubMessage = styled.div`
  color: #4f4f4f;
`;

export const CouponButton = styled.button`
  align-self: center;
  border: none;
  background-color: #06c09e;
  color: #ffffff;
  width: 60px;
  height: 60px;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
`;
