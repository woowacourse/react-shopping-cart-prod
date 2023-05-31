import { styled } from 'styled-components';

import { Heading } from '../../components/common/Heading/Heading.styles';

export const OrderPageHeading = styled(Heading)`
  text-align: center;
  padding-bottom: ${({ theme }) => theme.spacer.spacing5};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 36px;
`;
