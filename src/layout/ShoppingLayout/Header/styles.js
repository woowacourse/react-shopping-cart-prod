import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BRAND_COLORS, COLORS } from 'styles/theme';

import logo from 'assets/image/logo.png';
import { ICON_CODE } from 'constants/';

const LeftMenu = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  cursor: pointer;
  background: unset;
  border: none;
  font-weight: bold;
  font-size: 1.1rem;

  &::before {
    content: '\\f0c9';

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    padding-right: 0.938rem;
  }
`;

const Logo = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
  background-image: url(${logo});
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
`;

const RightMenu = styled.ul`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 1rem;

  & > a {
    text-decoration: none;
  }

  & li {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 3rem;
    margin-left: 1rem;
    font-size: 0.85rem;
    letter-spacing: 1.5px;
    color: ${COLORS.GRAY_50};

    &::before {
      font-family: 'Font Awesome 6 Free';
      font-style: normal;
      font-size: 1rem;
      font-weight: 900;

      margin-right: 0.625rem;
    }

    &.cart::before {
      content: '\\${ICON_CODE.CART}';
    }

    &.login::before {
      content: '\\${ICON_CODE.USER}';
    }
  }

  & temp {
    cursor: pointer;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 0.7rem;
    letter-spacing: 1.5px;
    padding: 1rem;
    color: ${COLORS.GRAY_50};

    &:hover {
      color: ${COLORS.MINT_400};
    }

    &::before {
      font-family: 'Font Awesome 6 Free';
      font-style: normal;
      font-size: 1rem;
      font-weight: 900;

      margin-right: 0.625rem;
    }

    &.cart::before {
      content: '\\f07a';
    }

    &.login::before {
      content: '\\f007';
    }

    &::after {
      ${({ count }) =>
        count &&
        css`
          content: '${count}';
          color: ${BRAND_COLORS.PRIMARY_FONT};
          background-color: ${BRAND_COLORS.PRIMARY};

          width: 1.3rem;
          height: 1.3rem;
          font-size: 0.7rem;
          font-weight: bold;
          border-radius: 50%;

          display: flex;
          justify-content: center;
          align-items: center;

          margin-left: 0.5rem;
        `}
    }
  }
`;

const Container = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${COLORS.WHITE};
  padding: 1.7rem 1.2rem;
  border-bottom: 1px solid ${COLORS.GRAY_150};
`;

export { Container, Logo, LeftMenu, MenuButton, RightMenu };
