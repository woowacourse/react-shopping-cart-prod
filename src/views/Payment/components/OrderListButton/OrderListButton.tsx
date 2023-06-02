import { styled } from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATH from '@router/constants/routerPath';

function OrderListButton() {
  const navigate = useNavigate();

  return (
    <HeaderIconWrapper
      onClick={() => {
        navigate(ROUTER_PATH.order);
      }}
    >
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
