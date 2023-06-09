import styled, { css } from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacer.spacing3} ${theme.spacer.spacing4}`};
  padding-bottom: 20px;
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
  z-index: 2;
`;

const HeaderContent = styled.div`
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > label {
    margin-left: ${({ theme }) => theme.spacer.spacing2};
    margin-right: 72px;
  }

  @media screen and (max-width: 600px) {
    & > label {
      width: 86px;
      margin-right: 48px;
      padding-right: 6px;

      & > select {
        padding: 12px 10px;
      }
    }
  }
`;

const Logo = styled.img`
  height: 40px;

  @media screen and (max-width: 600px) {
    height: 28px;
  }
`;

const Badge = styled.span`
  position: absolute;
  height: 14px;
  right: 8px;
  top: 6px;
  padding: 0px ${({ theme }) => theme.spacer.spacing1};

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.color.orange};
  color: ${({ theme }) => theme.color.white};
  text-align: center;
  font-size: 10px;
  line-height: 12px;
  border-radius: 7px;
  letter-spacing: -0.2px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  transform: translateX(calc(50% - 7px));
`;

const CartIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing1};
`;

const ButtonLabel = styled.span`
  font-size: 10px;
  font-weight: 400;
`;

const buttonStyle = css`
  position: absolute;
  width: initial;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    right: -8px;
  }
`;

export {
  HeaderContainer,
  HeaderContent,
  RightContainer,
  Logo,
  Badge,
  CartIcon,
  ButtonLabel,
  buttonStyle,
};
