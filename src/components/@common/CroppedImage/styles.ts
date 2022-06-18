import styled from 'styled-components';

export const Styled = {
  ImageWrapper: styled.div<{ width: string; height: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    overflow: hidden;
  `,

  Image: styled.img`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
  `,
};
