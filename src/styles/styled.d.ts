import { BreakPointType, ColorType } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    colors: ColorType;
    breakpoints: BreakPointType;
    shadows: ShadowType;
    effects: EffectType;
    transitions: TransitionType;
  }
}
