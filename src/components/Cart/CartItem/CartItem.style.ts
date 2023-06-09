import styled from 'styled-components';

export const CartItemLayout = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.color.gray400};
  padding: 25px 0px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const CartItemImage = styled.img`
  height: 144px;
  width: 144px;
  margin: 0px 10px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    align-self: center;
  }
`;

export const CartItemName = styled.div`
  font-size: 16px;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
  }
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
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
  border: 1px solid ${({ theme }) => theme.color.green200};
  border-radius: 2px;
  transform: translateY(0%);
  cursor: pointer;

  &:checked {
    background: ${({ theme }) => theme.color.gray900};
    border: 1px solid ${({ theme }) => theme.color.blue300};
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
