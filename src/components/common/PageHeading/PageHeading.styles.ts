import styled from 'styled-components';

import { Heading } from '../Heading/Heading.styles';

const PageHeading = styled(Heading)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing5};
  text-align: center;
`;

export { PageHeading };
