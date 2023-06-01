import styled from 'styled-components';

import { Heading } from '../Heading/Heading.styles';

const PageHeading = styled(Heading).attrs({ as: 'h5' })`
  margin-bottom: ${({ theme }) => theme.spacer.spacing5};
  padding-top: ${({ theme }) => theme.spacer.spacing3};
  text-align: center;
`;

export { PageHeading };
