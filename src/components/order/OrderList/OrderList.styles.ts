import styled from 'styled-components';

import { SpinnerContainer } from '../../common/SpinnerContainer/SpinnerContainer.styles';
import { Text } from '../../common/Text/Text.styles';

const OrderListContainer = styled.ol`
  max-width: calc(100vw - 48px);
  width: 960px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing6};

  &.center {
    position: relative;
    top: calc(50% - 48px);
    margin: 0;
    padding: 72px 24px;
    justify-content: center;
    align-items: center;
    gap: initial;
    transform: translateY(-50%);

    & button {
      width: 200px;
    }
  }
`;

const OrderListEmptyImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
`;

const OrderListEmptyMessage = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};
  font-weight: 600;
  text-align: center;
`;

const OrderListFallbackSpinnerContainer = styled(SpinnerContainer)`
  top: calc(50% - 48px);
`;

export {
  OrderListContainer,
  OrderListEmptyImage,
  OrderListEmptyMessage,
  OrderListFallbackSpinnerContainer,
};
