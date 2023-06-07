import styled from 'styled-components';

export const CartWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const CartIcon = styled.img`
  width: 28px;
  height: 28px;
`;
export const CartCountWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.green100};
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.white};
`;
