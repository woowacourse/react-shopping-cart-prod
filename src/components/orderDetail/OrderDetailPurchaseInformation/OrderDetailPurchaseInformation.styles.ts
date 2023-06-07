import styled, { css } from 'styled-components';

import { Text } from '../../common/Text/Text.styles';

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing3};
`;

const InformationData = styled.dl`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

const DataLabel = styled(Text).attrs({ as: 'dt' })`
  color: ${({ theme }) => theme.color.gray4};
`;

const DataDescription = styled(Text).attrs({ as: 'dd' })`
  letter-spacing: -0.2px;
`;

const headingStyle = css`
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
  padding-bottom: ${({ theme }) => theme.spacer.spacing3};
  border-bottom: 2px solid ${({ theme }) => theme.color.gray6};
`;

export { InformationContainer, InformationData, DataLabel, DataDescription, headingStyle };
