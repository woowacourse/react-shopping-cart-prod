import { styled } from 'styled-components';

export const CartBox = styled.div`
  display: flex;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.lightColor};

  border: ${({ theme }) => theme.secondaryColor} solid 1px;
  border-radius: 4px;
`;

export const QuantityInput = styled.input`
  height: 28px;
  width: 42px;
  padding: 0px 5px;
  background-color: transparent;
  text-align: center;
  font-size: 1.6rem;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.infoColor};
  }
`;

export const QuantityControlButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;
