import { styled } from 'styled-components';

export const CartContainer = styled.button`
  color: ${({ theme }) => theme.lightColor};
  position: relative;
`;

export const CartWrapper = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  padding-right: 2rem;
`;

export const CartCountWrapper = styled.div`
  position: absolute;
  top: -0.6rem;
  left: 1rem;
  border-radius: 50%;
  background-color: #04c09e;
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const CartCount = styled.div`
  font-size: 1rem;
  color: #fff;
`;

export const CartWrapper2 = styled.div`
  display: flex;
  align-items: center;
`;
