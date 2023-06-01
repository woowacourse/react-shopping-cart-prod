import { DefaultTheme } from 'styled-components';

const colors = {
  /** 
  #333333
  */
  primaryColor: '#333333',
  /** 
  #AAAAAA
  */
  secondaryColor: '#AAAAAA',
  /** 
  #2e7ff2
  */
  successColor: '#2e7ff2',
  /** 
  #dc3545
  */
  dangerColor: '#dc3545',
  /** 
  #ffc107
  */
  warningColor: '#ffc107',
  /** 
  #04C09E
  */
  infoColor: '#04C09E',
  /** 
  #FFFFFF
  */
  lightColor: '#FFFFFF',
  /** 
  #000000
  */
  darkColor: '#000000',
  /** 
  #888888
  */
  grayInfoColor: '#888888',
  /** 
  #F6F6F6
  */
  grayColor: '#F6F6F6',
};

const breakpoints = {
  /** 
  0px
  */
  xs: '0',
  /** 
  576px
  */
  sm: '576px',
  /** 
  768px
  */
  md: '768px',
  /** 
  992px
  */
  lg: '992px',
  /** 
  1200px
  */
  xl: '1200px',
  /** 
  1400px
  */
  xxl: '1400px',
};

const shadows = {
  /** 
  0 2px 4px rgba(0, 0, 0, 0.2)
  */
  normal: '0 2px 4px rgba(0, 0, 0, 0.2)',
  /** 
  0 4px 10px rgba(0, 0, 0, 0.3)
  */
  large: '0 4px 10px rgba(0, 0, 0, 0.3)',
};

const effects = {
  /** 
  translateX(0.3rem) translateY(-0.3rem)
  */
  hoverScale: 'translateX(0.3rem) translateY(-0.3rem)',
  /** 
  scale(1.03)
  */
  hoverScaleUp: 'scale(1.03)',
};

const transitions = {
  /** 
  0.3s ease-in-out
  */
  default: '0.3s ease-in-out',
  /** 
  0.3s ease-in-out color
  */
  hoverColor: '0.3s ease-in-out color',
};

export type ColorType = typeof colors;
export type BreakPointType = typeof breakpoints;
export type ShadowType = typeof shadows;
export type EffectType = typeof effects;
export type TransitionType = typeof transitions;

export const theme: DefaultTheme = {
  colors,
  breakpoints,
  shadows,
  effects,
  transitions,
};
