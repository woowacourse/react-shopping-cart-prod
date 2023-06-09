import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from '../../common/Text/Text.styles';

const ItemContainer = styled.li`
  width: 100%;
`;

const ItemHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};
`;

const HeaderLink = styled(Link)`
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

const ItemContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacer.spacing4};
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.color.gray2};
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const ItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InformationData = styled.dl`
  display: flex;
  gap: ${({ theme }) => theme.spacer.spacing3};
`;

const DataLabel = styled(Text).attrs({ as: 'dt' })`
  position: relative;
  top: 1px;
  min-width: 50px;
  color: ${({ theme }) => theme.color.gray4};
`;

const DataDescription = styled(Text).attrs({ as: 'dd' })`
  font-weight: 500;
`;

export {
  ItemContainer,
  ItemHeader,
  HeaderLink,
  ItemContent,
  ItemImage,
  ItemInformation,
  InformationData,
  DataLabel,
  DataDescription,
};
