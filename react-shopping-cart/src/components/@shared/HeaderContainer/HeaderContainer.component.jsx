import styled from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';

import { LAYER } from 'constants/index';
import { withOpacityValue } from 'utils';

const HeaderContainer = styled(FlexBox).attrs({
  justifyContent: 'space-between',
  alignItems: 'center',
})`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  padding: 0 120px;
  background-color: ${({ theme }) => theme.colors['MINT_001']};
  box-shadow: 0 4px 4px ${({ theme }) => withOpacityValue(theme.colors['BLACK_002'], 0.3)};
  z-index: ${LAYER.FOREGROUND};
`;

export default HeaderContainer;
