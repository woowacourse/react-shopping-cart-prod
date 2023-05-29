import styled from 'styled-components';

import { Heading } from '../../common/Heading/Heading.styles';
import { Text } from '../../common/Text/Text.styles';

const OrderDetailPurchaseInformationHeading = styled(Heading)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
  padding-bottom: ${({ theme }) => theme.spacer.spacing3};
  border-bottom: 2px solid ${({ theme }) => theme.color.gray6};
`;

const OrderDetailPurchaseInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing3};
`;

const PurchaseInformationData = styled.dl`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

const PurchaseInformationDataLabel = styled(Text)`
  color: ${({ theme }) => theme.color.gray4};
`;

const PurchaseInformationDataDescription = styled(Text)`
  letter-spacing: -0.2px;
`;

export {
  OrderDetailPurchaseInformationHeading,
  OrderDetailPurchaseInformationContainer,
  PurchaseInformationData,
  PurchaseInformationDataLabel,
  PurchaseInformationDataDescription,
};
