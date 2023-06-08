const color = {
  /* grayscale */
  WHITE: '#fff',
  GRAY_100: '#f8f8f8',
  GRAY_200: '#e9e9e9',
  GRAY_300: '#ddd',
  GRAY_350: '#ccc',
  GRAY_400: '#888',
  GRAY_500: '#525252',
  GRAY_600: '#363636',
  BLACK: '#333',

  /* colors */
  ORANGE: '#ff6610',

  PRIMARY: '#1a7cff',
  PRIMARY_LIGHT: 'rgba(26, 124, 255, 0.9)',

  ERROR: '#e53e53',
} as const;

const zIndex = {
  HEADER: 1,
  MENU: 2,
  MODAL_BACKDROP: 10,
  MODAL_CONTAINER: 20,
  TOAST: 30,
} as const;

export const theme = {
  color,
  zIndex,
} as const;

export type Theme = typeof theme;

export default theme;
