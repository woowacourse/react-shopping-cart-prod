import styled from 'styled-components';

const Styled = {
  Image: styled.img<{ size: string }>`
    ${({ size }) => `
      width: ${size};
      height: ${size};
   `}
  `,
};

export default Styled;
