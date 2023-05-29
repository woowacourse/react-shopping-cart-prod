const color = {
  /* grayscale */
  white: '#fff',
  gray100: '#f8f8f8',
  gray200: '#e9e9e9',
  gray300: '#ddd',
  gray400: '#888',
  gray500: '#525252',
  gray600: '#363636',
  black: '#333',

  /* colors */
  orange: '#ff6610',

  primary: '#1a7cff',

  error: '#e53e53',
} as const;

export const theme = {
  color,
} as const;

export type Theme = typeof theme;

export default theme;
