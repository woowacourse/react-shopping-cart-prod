import styled, { css } from 'styled-components';

const ArrowButton = styled.span`
  width: 8px;
  height: 8px;
  border: 1px;
  ${({ direction }) =>
    direction === 'right'
      ? css`
          border-style: solid solid none none;
        `
      : css`
          border-style: none none solid solid;
        `}

  transform: rotate(45deg);
  cursor: pointer;
  margin: 5px;
`;

export default ArrowButton;
