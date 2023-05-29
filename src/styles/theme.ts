const color = {
  white: '#fff',
  gray100: '#f8f8f8',
  gray200: '#e9e9e9',
  gray300: '#ddd',
  gray400: '#727272',
  gray500: '#525252',
  gray600: '#363636',
  black: '#333',

  primary: '#1a7cff',

  red: '#ce0000',
} as const;

export const theme = {
  color,
} as const;

export type Theme = typeof theme;

export default theme;
