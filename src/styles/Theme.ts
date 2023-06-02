import type { DefaultTheme } from 'styled-components';

import type { FontType, StyleType } from '../type/theme';

const colors: StyleType = {
  primary: '#000000',
  gray100: '#dddddd',
  gray200: '#aaaaaa',
  gray300: '#f6f6f6',
  gray400: '#888888',
  blue_green: '#04c09e',
  white: '#ffffff',
};

function FONT({ family, weight, size, lineHeight }: FontType): string {
  return `
  font-family:${family};
    font-weight : ${weight};
    font-size : ${size}px;
    line-height : ${lineHeight}px;
    `;
}

const fonts: StyleType = {
  h1: FONT({
    family: 'Noto Sans KR, sans-serif',
    weight: 600,
    size: 40,
    lineHeight: 58,
  }),
  h2: FONT({
    family: 'Noto Sans KR, sans-serif',
    weight: 500,
    size: 24,
    lineHeight: 12,
  }),
  price: FONT({
    family: 'Noto Sans KR, sans-serif',
    weight: 400,
    size: 16,
    lineHeight: 22,
  }),
  name: FONT({
    family: 'Noto Sans KR, sans-serif',
    weight: 400,
    size: 20,
    lineHeight: 27,
  }),
  title: FONT({
    family: 'Noto Sans KR, sans-serif',
    weight: 700,
    size: 32,
    lineHeight: 3.7,
  }),
  order_title: FONT({
    family: 'Noto Sans KR, sans-serif',
    weight: 400,
    size: 24,
    lineHeight: 33,
  }),
  order_info: FONT({
    family: 'Noto Sans KR, sans-serif',
    weight: 700,
    size: 20,
    lineHeight: 26,
  }),
};

export const theme: DefaultTheme = {
  colors,
  fonts,
};
