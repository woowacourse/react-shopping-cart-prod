import styled from 'styled-components';

export const CartItemLayout = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.color.secondary};
  padding: 25px 0px;
`;

export const CartItemImage = styled.img`
  height: 144px;
  width: 144px;
  margin: 0px 10px;
`;

export const CartItemName = styled.div`
  font-size: 16px;
  width: 100%;
`;

export const CartItemTrashImage = styled.img`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

export const CartItemPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
`;

export const CartItemInfoWrapper = styled.div`
  width: 100%;
`;

export const CartItemControllerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-end;
  gap: 23px;
`;

export const CartItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const Label = styled.label`
  width: 28px;
  height: 28px;
  align-self: flex-start;
`;

export const Input = styled.input<{ icon: string }>`
  appearance: none;
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  transform: translateY(0%);
  cursor: pointer;

  &:checked {
    background: #333333;
    border: 1px solid #3288ff;
  }

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
