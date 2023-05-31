import { styled } from 'styled-components';

export const CartBox = styled.div`
  display: flex;
  height: 28px;
`;

export const QuantityInput = styled.input`
  height: 28px;
  width: 42px;
  padding: 0px 5px;
  border: 1px solid ${({ theme }) => theme.colors.secondaryColor};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.infoColor};
  }
`;

export const QuantityControlButton = styled.button`
  height: 14px;
  width: 24px;
  padding: 0px;
  border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
  line-height: 0px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;
