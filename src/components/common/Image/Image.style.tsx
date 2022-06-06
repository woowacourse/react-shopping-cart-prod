import styled, { css, StyleProps } from 'styled-components';

export const ImageContainer = styled.div`
  ${({ width = '100%', height = '100%' }: Partial<Pick<StyleProps, 'width' | 'height'>>) => css`
    width: ${width};
    height: ${height};
  `};
  aspect-ratio: 1 / 1;

  overflow: hidden;
`;

export const Image = styled.img<{ isLoad: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;

  ${({ isLoad }) => css`
    display: ${isLoad ? 'block' : 'none'};
  `}
`;
