import styled, { CSSProperties } from 'styled-components';

type Flex = {
  flexDirection?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
};

type Sizing = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  minHeight?: CSSProperties['minHeight'];
  maxHeight?: CSSProperties['maxHeight'];
  minWidth?: CSSProperties['minWidth'];
  maxWidth?: CSSProperties['maxWidth'];
};

interface BoxProps {
  flex?: Flex;
  sizing?: Sizing;
}

const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${({ flex }) => flex?.flexDirection ?? 'row'};
  justify-content: ${({ flex }) => flex?.justify ?? 'center'};
  align-items: ${({ flex }) => flex?.align ?? 'center'};
  gap: ${({ flex }) => flex?.gap};
  width: ${({ sizing }) => sizing?.width};
  min-width: ${({ sizing }) => sizing?.minWidth};
  max-width: ${({ sizing }) => sizing?.maxWidth};
  height: ${({ sizing }) => sizing?.height};
  min-height: ${({ sizing }) => sizing?.minHeight};
  max-height: ${({ sizing }) => sizing?.maxHeight};
`;

export default Box;
