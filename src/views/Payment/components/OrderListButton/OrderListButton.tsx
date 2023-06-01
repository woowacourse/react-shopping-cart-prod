import { styled } from 'styled-components';
import { CgProfile } from 'react-icons/cg';

function OrderListButton() {
  return (
    <HeaderIconWrapper>
      <CgProfile />
    </HeaderIconWrapper>
  );
}

const HeaderIconWrapper = styled.button`
  color: ${({ theme }) => theme.lightColor};
  font-size: 24px;
  display: flex;
  align-items: center;
`;

export default OrderListButton;
