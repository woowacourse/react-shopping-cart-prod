import { styled } from 'styled-components';

import { Heading } from '../../common/Heading/Heading.styles';
import { SpinnerContainer } from '../../common/SpinnerContainer/SpinnerContainer.styles';

const OrderDetailListHeading = styled(Heading)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
  padding-bottom: ${({ theme }) => theme.spacer.spacing3};
  border-bottom: 2px solid ${({ theme }) => theme.color.gray6};
`;

const OrderDetailListContainer = styled.ol`
  max-width: calc(100vw - 48px);
  width: 960px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing6};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing4};
`;

const OrderDetailListFallbackSpinnerContainer = styled(SpinnerContainer)`
  top: calc(50% - 48px);
`;

export {
  OrderDetailListContainer,
  OrderDetailListHeading,
  OrderDetailListFallbackSpinnerContainer,
};
