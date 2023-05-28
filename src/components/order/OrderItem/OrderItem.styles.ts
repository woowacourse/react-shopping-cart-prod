import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from '../../common/Text/Text.styles';

const OrderItemContainer = styled.li`
  width: 960px;
`;

const OrderItemHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};
`;

const OrderDate = styled(Text)`
  font-weight: 500;
`;

const OrderDetailLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacer.spacing1};
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.gray6};

  & > svg {
    position: relative;
    width: 14px;
  }
`;

const OrderItemContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacer.spacing4};
`;

const OrderItemImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: beige;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const OrderInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const OrderInformationData = styled.dl`
  display: flex;
  gap: ${({ theme }) => theme.spacer.spacing3};
`;

const OrderInformationDataLabel = styled(Text)`
  position: relative;
  top: 1px;
  width: 50px;
  color: ${({ theme }) => theme.color.gray4};
`;

const OrderInformationDataDescription = styled(Text)`
  font-weight: 500;
`;

export {
  OrderItemContainer,
  OrderItemHeader,
  OrderDate,
  OrderDetailLink,
  OrderItemContent,
  OrderItemImage,
  OrderInformation,
  OrderInformationData,
  OrderInformationDataLabel,
  OrderInformationDataDescription,
};
