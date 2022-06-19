import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

type Hamburger = { isShow: boolean };

export const Styled = {
  Header: styled.header`
    width: 100%;
    height: 8rem;
    background-color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 6rem;
    ${flexCenter}

    & > div {
      width: ${({ theme }) => theme.size.fullContentWidth};
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,

  BrandName: styled.span`
    color: ${theme.colors.white};
    font-size: 4rem;
    font-weight: 900;
    margin-left: 1rem;
  `,

  Nav: styled.nav`
    & > button {
      color: ${theme.colors.white};
      font-size: 2.4rem;
      background-color: inherit;
    }

    & > button + button {
      margin-left: 4.4rem;
    }
  `,

  HamburgerList: styled.div<Hamburger>`
    width: 17rem;
    flex-direction: column;
    position: absolute;
    top: 8rem;
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    display: ${props => (props.isShow ? 'flex' : 'none')};
    flex-wrap: wrap;
    z-index: 10000;

    a {
      ${flexCenter}
      height: 6rem;
    }
    a:hover {
      background-color: ${theme.colors.heavyWhite};
    }
  `,
};
