import styled, { css } from 'styled-components';

export default styled.div`
  display: flex;

  ${({ gap = '44px' }: { gap?: string }) =>
    css`
      gap: ${gap};
    `}

  a:hover {
    font-weight: 900;
  }
`;
