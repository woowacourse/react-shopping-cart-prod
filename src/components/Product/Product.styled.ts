import { styled } from 'styled-components';

export const Container = styled.li``;

export const ProductImage = styled.div<{ path: string }>`
  width: 100%;
  min-width: 130px;

  padding-bottom: 100%;

  background-image: ${(props) => `url(${props.path})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  border-radius: 4px;
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 13px;

  padding: 10px 0;
  letter-spacing: 0.5px;
`;

export const ProductName = styled.p`
  margin-bottom: 6px;
`;

export const ProductPrice = styled.p`
  font-size: 16px;
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
