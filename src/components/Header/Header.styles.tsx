import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background: var(--color-header);
  height: 80px;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1750px) {
    padding: 0 80px;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  display: flex;
  justify-content: space-between;
`;

export const LogoButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LogoImage = styled.img`
  max-width: 400px;
  height: 91px;
  margin: 0 16px 14px 0;
`;

export const ShoppingCartButton = styled.button`
  display: flex;
  background: transparent;
  border: none;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: rotate(5deg);
  }
`;
export const ShoppingCartButtonText = styled.span`
  font-weight: 500;
  font-size: 24px;
  line-height: 12px;
  color: var(--color-brownish-red);
  margin-right: 6px;
`;

export const ShoppingCartQuantity = styled.div`
  background-color: var(--color-shopping-cart-quantity);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
`;
