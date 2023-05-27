import { styled } from 'styled-components';

export const Container = styled.li`
  width: 282px;
`;

export const ProductImage = styled.div<{ path: string }>`
  width: 100%;
  padding-bottom: 100%;

  background-image: ${(props) => `url(${props.path})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 18px 12px 0 12px;
  letter-spacing: 0.5px;
`;

export const ProductName = styled.p`
  margin-bottom: 8px;
`;

export const ProductPrice = styled.p`
  font-size: 20px;
`;

export const StepperWrapper = styled.div``;

export const CartIconWrapper = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background-color: inherit;
  height: fit-content;

  cursor: pointer;
`;
