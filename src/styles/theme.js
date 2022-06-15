const COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY_100: '#e0e0e0',
  GRAY_200: '#c2c2c2',
  GRAY_230: '#e0e0e0',
  GRAY_260: '#ededed',
  GRAY_300: '#a3a3a3',
  GRAY_400: '#858585',
  GRAY_500: '#666666',
  GRAY_600: '#525252',
  BLUE_100: '#0066FF',
  MINT_100: '#4bd8d3',
  MINT_200: '#2AC1BC',
  BROWN_100: '#928477',
  BROWN_200: '#73675C',
  RED_100: '#FF7676',
};

const GRADIENT = {
  GRAY: `linear-gradient(
    90deg,
    ${COLORS.GRAY_230} 0px,
    ${COLORS.GRAY_260} 30px,
    ${COLORS.GRAY_230} 60px
  );`,
};

const BRAND_COLORS = {};

export { COLORS, BRAND_COLORS, GRADIENT };
