import styled, { css } from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  ${({ direction, gap, justifyContent, alignItems, wrap, width, height }) =>
    css`
      flex-direction: ${direction};
      gap: ${gap};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
      flex-wrap: ${wrap};
      width: ${width};
      height: ${height};
    `}
`;

export default FlexBox;
