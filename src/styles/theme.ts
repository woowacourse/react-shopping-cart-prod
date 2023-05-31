const color = {
  /* grayscale */
  white: '#fff',
  gray100: '#f8f8f8',
  gray200: '#e9e9e9',
  gray300: '#ddd',
  gray350: '#ccc',
  gray400: '#888',
  gray500: '#525252',
  gray600: '#363636',
  black: '#333',

  /* colors */
  orange: '#ff6610',

  primary: '#1a7cff',
  primaryLight: 'rgba(26, 124, 255, 0.9)',

  error: '#e53e53',
} as const;

const zIndex = {
  header: 1,
  modalBackdrop: 10,
  modalContainer: 20,
};

export const theme = {
  color,
  zIndex,
} as const;

export type Theme = typeof theme;

export default theme;
