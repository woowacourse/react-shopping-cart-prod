import { styled } from 'styled-components';

import { Text } from '../../components/common/Text/Text.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(50%);
  width: 320px;
  gap: 14px;
`;

export const CheckedIconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const OrderSuccessTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OrderSuccessText = styled(Text).attrs({ size: 'xLarge' })``;

export const OrderPriceTextContainer = styled.div``;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
