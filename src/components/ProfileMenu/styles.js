import styled from '@emotion/styled';

import { BRAND_COLORS, COLORS, LAYOUT } from 'styles/theme';

import { ICON_CODE } from 'constants/';

const ProfileText = styled.li`
  cursor: pointer;

  & > b {
    font-weight: bold;
    letter-spacing: 0;
  }

  &::before {
    content: '🦖';
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.2rem;
    height: 2.2rem;
    font-size: 1rem;
    border-radius: 50%;
    background-color: ${COLORS.GRAY_150};

    margin-right: 0.8rem;
    padding: 0;
  }
`;

const ProfileMenu = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;

  width: 100%;
  padding: 0.9rem 0.8rem;
  font-size: 0.9rem;
  border-bottom: 1px solid ${COLORS.GRAY_150};
  border-radius: ${LAYOUT.BORDER_RADIUS}px;

  &:hover {
    background-color: ${COLORS.GRAY_250};
    color: ${BRAND_COLORS.PRIMARY};
  }

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: '';

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    margin-right: 0.8rem;
  }

  &.profile::before {
    content: '\\${ICON_CODE.USER}';
  }

  &.logout::before {
    content: '\\${ICON_CODE.LOGOUT}';
  }
`;

export { ProfileText, ProfileMenu };
