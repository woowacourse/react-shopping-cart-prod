import styled from 'styled-components';
import { Button } from 'components/@shared';

const LeaveButton = styled(Button)`
  width: 400px;
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.RED_500};
`;

export { LeaveButton };
