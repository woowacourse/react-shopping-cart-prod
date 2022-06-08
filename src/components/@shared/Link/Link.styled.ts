import { Link as BasicLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Props } from './Link.type';

const Link = styled(BasicLink)`
  text-decoration: none;
  color: inherit;

  ${({ disabled }: Pick<Props, 'disabled'>) => css`
    ${disabled ? 'pointer-events: none;' : ''}
  `}

  &.disabled {
    pointer-events: none;
  }
`;

export { Link };
