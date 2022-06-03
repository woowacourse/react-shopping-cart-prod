import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const TextLink = styled(Link)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.gray_300};

  &:hover {
    text-decoration: underline;
  }
`;
