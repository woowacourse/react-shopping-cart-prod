import styled from 'styled-components';

import { SpinnerContainer } from '../../common/SpinnerContainer/SpinnerContainer.styles';

const OrderListContainer = styled.ol`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing6};
`;

const OrderListFallbackSpinnerContainer = styled(SpinnerContainer)`
  top: calc(50% - 48px);
`;

export { OrderListContainer, OrderListFallbackSpinnerContainer };
