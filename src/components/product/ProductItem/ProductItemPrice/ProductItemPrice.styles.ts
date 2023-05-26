import styled from 'styled-components';

import { Text } from '../../../common/Text/Text.styles';

const DiscountRate = styled(Text)`
  margin-right: ${({ theme }) => theme.spacer.spacing2};
  color: ${({ theme }) => theme.color.red};
`;

const DiscountedPrice = styled(Text)`
  margin-right: ${({ theme }) => theme.spacer.spacing2};
`;

const ItemPrice = styled(Text)`
  position: relative;
  top: 1px;
  color: #b1b3b5;
  font-weight: normal;
  text-decoration: line-through;
`;

export { DiscountRate, DiscountedPrice, ItemPrice };
