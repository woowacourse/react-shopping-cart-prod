import styled from 'styled-components';

import { Heading } from '../../components/common/Heading/Heading.styles';

const OrderPageHeading = styled(Heading)`
  text-align: center;
  padding-bottom: ${({ theme }) => theme.spacer.spacing5};
`;

const OrderInformationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 36px;
`;

export { OrderPageHeading, OrderInformationContainer };
