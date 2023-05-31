import { styled } from 'styled-components';

import { Text } from '../../common/Text/Text.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleWrapper = styled.div`
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.color.gray5};
`;

export const Title = styled(Text).attrs({ size: 'xLarge' })`
  font-weight: 600;
`;

export const ItemKeyValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ItemKey = styled(Text).attrs({ size: 'medium' })`
  color: ${({ theme }) => theme.color.gray4};
  font-weight: 500;
`;

export const ItemValue = styled(Text).attrs({ size: 'medium' })`
  font-weight: 500;
`;
