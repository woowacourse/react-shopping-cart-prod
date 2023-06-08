import { TextSkeletonStyle } from '@Styles/common/skeleton';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

type ContainerProps = {
  isUsed: boolean;
  isLoading: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: #fcfcfc;
  padding: 20px;
  border-radius: 8px;
  color: ${(props) => (props.isLoading ? 'transparent' : '#333333')};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: ${(props) => (props.isUsed ? '#d8d8d8' : '#fcfcfc')};
  opacity: ${(props) => (props.isUsed ? 0.3 : 1)};

  ${(props) => props.isLoading && TextSkeletonStyle}
`;

export const CouponLayout = styled.div`
  display: grid;
  row-gap: 10px;
`;

export const CouponDescription = styled.span`
  font-size: 18px;
`;

export const CouponName = styled.p`
  font-size: 30px;
  font-weight: 700;
`;

export const CouponSubMessage = styled.span`
  color: #4f4f4f;
`;

type CouponButtonProps = {
  isLoading: boolean;
};

export const CouponButton = styled.button<CouponButtonProps>`
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
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

export const DeleteButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 12px;
  background-color: transparent;
  color: #ff7975;
  cursor: pointer;
`;
